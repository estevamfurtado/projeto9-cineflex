import { Link } from "react-router-dom";
import SeatsMap from "./SeatsMap";


export default function Tickets () {
    return (
        <>
            <h1>Selecione os assentos</h1>
            <SeatsMap />

            <h2>Informe os dados dos clientes</h2>
            <div className="clientInputs">
                <div className="clientInput">
                    <label>Nome</label>
                    <input></input>
                </div>
                <div className="clientInput">
                    <label>CPF</label>
                    <input></input>
                </div>
            </div>

            <div className="clientInputs">
                <div className="clientInput">
                    <label>Nome</label>
                    <input></input>
                </div>
                <div className="clientInput">
                    <label>CPF</label>
                    <input></input>
                </div>
            </div>

            <Link to="/sucesso"><button>Reservar assento</button></Link>
        </>
    )
}