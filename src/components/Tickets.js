import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import SeatsMap from "./SeatsMap";


export default function Tickets() {

    const { sessionId } = useParams();

    const [session, setSession] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [costumers, setCostumers] = useState([]);

    const link = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`;
    useEffect(() => {
        const promessa = axios.get(link);
        promessa.then(resposta => {
            console.log(resposta.data);
            setSession(resposta.data);
        }).catch(error => {
            console.log("error in ", error)
        })
    }, []);

    // escrever logica depois
    function validateCostumers () {
        return (costumers.length > 0);
    }


    const loading = (<p>Loading...</p>);
    const loadedContent = (session ?
        <>
            <h1>Selecione os assentos</h1>

            <SeatsMap />

            {selectedSeats.length > 0 ?
                (<>
                    <h2>Informe os dados dos clientes</h2>
                    {selectedSeats.map(() => {
                        return (
                            <div className="clientInputs">
                                <div className="clientInput">
                                    <label>Nome</label>
                                    <input></input>
                                </div>
                                <div className="clientInput">
                                    <label>CPF</label>
                                    <input></input>
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