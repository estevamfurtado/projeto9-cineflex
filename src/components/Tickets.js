import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import SeatsMap from "./SeatsMap";


export default function Tickets({setAppMovie, setAppSession, setAppOrder}) {

    const { sessionId } = useParams();

    const [session, setSession] = useState(null);
    const [seats, setSeatsData] = useState([]);
    const [costumersData, setCostumersData] = useState([]);

    const selectedSeats = seats.filter(seat => seat.status === 'selected');


    // FUNCTIONS TO BE PASSED

    function selectSeat(seatId) {
        const newSeats = [...seats];
        const newCostumersData = [...costumersData];

        newSeats.forEach((seat, idx) => {
            if (seat.id === seatId) {
                switch (seat.status) {
                    case "available":
                        seat.status = "selected";
                        newCostumersData.push({ name: "", cpf: "" })
                        break;
                    case "selected":
                        seat.status = "available";
                        newCostumersData.pop();
                        break;
                }
            }
        })
        setSeatsData(newSeats);
        setCostumersData(newCostumersData);
    }

    function editCostumerData(clientIndex, type, input) {
        const newCostumersData = [...costumersData];
        newCostumersData[clientIndex][type] = input;
        setCostumersData(newCostumersData);
    }


    // GET DATA

    const link = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`;
    useEffect(() => {
        const promessa = axios.get(link);
        promessa.then(resposta => {
            console.log("seats -> ", resposta.data);
            setSession(resposta.data);
            
            const session = {...resposta.data.day}
            session.name = resposta.data.name;
            setAppSession(session);
            setAppMovie(resposta.data.movie);

            const processedSeats = resposta.data.seats.map(seat => {
                const { id, name } = seat;
                let status = "unavailable";
                if (seat.isAvailable) { status = "available"; }
                return { id: id, name: name, status: status };
            });
            //console.log('processed seats', processedSeats);
            setSeatsData(processedSeats);
        }).catch(error => {
            console.log("error in ", error)
        })
    }, []);



    // INPUTS VALIDATION

    function validateInputs() {
        const invalid = costumersData.filter(cost => {
            return !(isValidName(cost.name) && isValidCPF(cost.cpf));
        });
        return (invalid.length === 0 && costumersData.length > 0);
    }

    function isValidName(name) {
        return (name !== "");
    }

    function isValidCPF(cpfStr) {
        return (cpfStr.length === 11);
    }

    const inputsAreValid = validateInputs();



    // POST DATA

    function postOrder() {

        const link = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";

        const data = {};
        data.ids = selectedSeats.map(seat => seat.id);
        data.compradores = costumersData.map((costumer, idx) => {
            return {idAssento: data.ids[idx], nome: costumer.name, cpf: costumer.cpf};
        })

        console.log("tentando postar", data);

        const promise = axios.post(link, data);
        promise.then(ans => {console.log(ans)})
        promise.catch(ans => {console.log(ans)})
    }



    const loading = (<p>Loading...</p>);
    const loadedContent = (session ?
        <>
            <h1>Selecione os assentos</h1>

            <SeatsMap seats={seats} selectSeat={selectSeat} />

            {costumersData.length > 0 ?
                (<>
                    <h2>Informe os dados dos clientes</h2>
                    {costumersData.map((costumer, idx) => {
                        return (
                            <div className="clientInputs" key={idx}>
                                <div className="clientInput">
                                    <label>Nome</label>
                                    <input
                                        className={isValidName(costumer.name) ? "validInput" : ""}
                                        placeholder="Digite o nome do ticket..."
                                        onChange={e => { editCostumerData(idx, "name", e.target.value); }}
                                        value={costumer.name}></input>
                                </div>
                                <div className="clientInput">
                                    <label>CPF</label>
                                    <input
                                        className={isValidCPF(costumer.cpf) ? "validInput" : ""}
                                        type="number"
                                        placeholder="Digite os números do cpf do ticket..."
                                        onChange={e => { editCostumerData(idx, "cpf", e.target.value); }}
                                        value={costumer.cpf}></input>
                                </div>
                            </div>)
                    })}
                </>) : <></>
            }

            {inputsAreValid
                ? (
                    <div className="centralizeContent">
                        <Link to="/sucesso" className="centralizeContent">
                            <button className="mainButton" onClick={() => {
                                postOrder();
                                const order = {};
                                order.costumers = [...costumersData];
                                order.selectedSeats = [...selectedSeats];
                                setAppOrder(order);
                            }}>Reservar assento</button>
                        </Link>
                    </div>)
                : <></>}

        </> : <></>
    )

    return (session ? loadedContent : loading);
}