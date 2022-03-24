import { Link } from "react-router-dom";

export default function Success({ order, movie, session, controlShowPreviousButton }) {

    controlShowPreviousButton(true);

    const isDefined = (order && movie && session);

    const notLoaded = (<h1>Você ainda não fez um pedido</h1>);
    const loadedContent = (
        <>
            <h1 className="sucessHeadline">Pedido feito com sucesso!</h1>

            <h3>Filmes e sessão</h3>
            {movie && session
                ? <>
                    <p>{movie.title}</p>
                    <p>{`${session.date} ${session.name}`}</p>
                </>
                : <></>}

            <h3>Ingressos</h3>
            {order
                ? <>
                    {order.selectedSeats.map((seat, index) => {
                        return <p key={index}>{`Assento ${seat.name}`}</p>
                    })}
                </>
                : <></>}

            <h3>Costumers</h3>
            {order
                ? <>
                    {order.costumers.map((costumer, index) => {
                        let cpfText = costumer.cpf;
                        cpfText = cpfText.slice(0, 9) + "-" + cpfText.slice(9);
                        cpfText = cpfText.slice(0, 6) + "." + cpfText.slice(6);
                        cpfText = cpfText.slice(0, 3) + "." + cpfText.slice(3);
                        return (<div key={index}>
                            <p>{`Nome: ${costumer.name}`}</p>
                            <p>{`CPF: ${cpfText}`}</p></div>)
                    })}
                </>
                : <></>}

            <div className="centralizeContent">
                <Link to="/">
                    <button className="mainButton">Voltar para Home</button>
                </Link>
            </div>
        </>
    )

    return (isDefined ? loadedContent : notLoaded)
}