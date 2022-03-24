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
            console.log(resposta.data);
            setSession(resposta.data);
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
        // {
        //     ids: [1, 2, 3], // ids dos assentos
        //     compradores: [
        //         { idAssento: 1, nome: "Fulano", cpf: "12345678900" },
        //         { idAssento: 2, nome: "Fulano 2", cpf: "12345678901" },
        //         { idAssento: 3, nome: "Fulano 3", cpf: "12345678902" },
        //     ]
        // }

        console.log("tentando postar");
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
                            <button className="mainButton" onClick={() => {postOrder();}}>Reservar assento</button>
                        </Link>
                    </div>)
                : <></>}

        </> : <></>
    )

    return (session ? loadedContent : loading);
}