import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import SeatsMap from "./SeatsMap";


export default function Tickets() {

    const { sessionId } = useParams();

    const [session, setSession] = useState(null);
    const [seats, setSeatsData] = useState([]);
    const [costumersData, setCostumersData] = useState([]);

    const selectedSeats = seats.filter(seat => seat.status === 'selected');

    function selectSeat (seatId) {
        const newSeats = [...seats];
        const newCostumersData = [...costumersData];

        newSeats.forEach((seat, id) => {
            if (seat.id === seatId) {
                switch(seat.status){
                    case "available":
                        seat.status = "selected";
                        newCostumersData.push({name: null, cpf: null})
                        break;
                    case "selected":
                        seat.status = "available";
                        newCostumersData.splice(id, 1);
                        break;
                }
            }
        })
        setSeatsData(newSeats);
        setCostumersData(newCostumersData);
    }

    const link = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`;
    useEffect(() => {
        const promessa = axios.get(link);
        promessa.then(resposta => {
            console.log(resposta.data);
            setSession(resposta.data);
            const processedSeats = resposta.data.seats.map(seat => {
                const {id, name} = seat;
                let status = "unavailable";
                if (seat.isAvailable) {status = "available";}
                return {id: id, name: name, status: status};
            });
            //console.log('processed seats', processedSeats);
            setSeatsData(processedSeats);
        }).catch(error => {
            console.log("error in ", error)
        })
    }, []);

    // escrever logica depois
    function validateCostumers () {
        return (costumersData.length > 0);
    }


    const loading = (<p>Loading...</p>);
    const loadedContent = (session ?
        <>
            <h1>Selecione os assentos</h1>

            <SeatsMap seats={seats} selectSeat={selectSeat}/>

            {costumersData.length > 0 ?
                (<>
                    <h2>Informe os dados dos clientes</h2>
                    {costumersData.map((costumer, idx) => {
                        return (
                            <div className="clientInputs" key={idx}>
                                <div className="clientInput">
                                    <label>Nome</label>
                                    <input placeholder="Digite o nome do ticket..."></input>
                                </div>
                                <div className="clientInput">
                                    <label>CPF</label>
                                    <input type="number" placeholder="Digite os números do cpf do ticket..."></input>
                                </div>
                            </div>)
                    })}
                </>) : <></>
            }

            {validateCostumers()
            ? (
            <Link to="/sucesso">
                <button>Reservar assento</button>
            </Link>)
            : <></>}

        </> : <></>
    )

    return (session ? loadedContent : loading);
}