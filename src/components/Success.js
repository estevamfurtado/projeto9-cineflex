import { Link } from "react-router-dom";

export default function Success({order, movie, session}) {

    console.log("order -> ", order);

    return (
        <>
            <h1 className="sucessHeadline">Pedido feito com sucesso!</h1>

            <h3>Filmes e sessão</h3>
            <p>{movie.title}</p>
            <p>{`${session.date} ${session.name}`}</p>

            <h3>Ingressos</h3>
            {order.selectedSeats.map(seat => {
                return <p>{`Assento ${seat.name}`}</p>
            })}

            <h3>Costumers</h3>
            {order.costumers.map(costumer => {
                return <p>{`${costumer.name} - ${costumer.cpf}`}</p>
            })}

            <div className="centralizeContent">
                <Link to="/">
                    <button className="mainButton">Voltar para Home</button>
                </Link>
            </div>
        </>
    )
}