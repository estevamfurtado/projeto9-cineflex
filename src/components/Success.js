import { Link } from "react-router-dom";

export default function Success() {
    return (
        <>
            <h1 className="sucessHeadline">Pedido feito com sucesso!</h1>

            <h3>Filmes e sessão</h3>
            <p>Enola Holmes</p>
            <p>24/06/2021 15:00</p>

            <h3>Ingressos</h3>
            <p>Assento 15</p>

            <h3>Comprador</h3>
            <p>Nome: João</p>
            <p>CPF: 20.550.160</p>

            <div className="centralizeContent">
                <Link to="/">
                    <button className="mainButton">Voltar para Home</button>
                </Link>
            </div>
        </>
    )
}