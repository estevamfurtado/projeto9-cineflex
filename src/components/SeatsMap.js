import { useEffect, useState } from "react";


export default function SeatsMap ({seats, selectSeat}) {

    const seatsElements = (
        <div className="seatsmap__elements">
            {seats.map(seat => {
                const {id, name, status} = seat;
                let color = "gray";
                switch (status) {
                    case 'selected':
                        color = "green";
                        break;
                    case 'unavailable':
                        color = "yellow";
                        break;
                    default:
                        break;
                }
                return <div key={id} id={id} className={`seatsmap__seat ${color}`} onClick={() => {
                    selectSeat(id);
                }}>{name}</div>
            })}
        </div>
    )

    const legenda = (
        <div className="seatsmap__legenda">
            <div><div className="seatsmap__seat green"></div><p>Selecionado</p></div>
            <div><div className="seatsmap__seat gray"></div><p>Disponível</p></div>
            <div><div className="seatsmap__seat yellow"></div><p>Indisponível</p></div>
        </div>
    );

    return (
    <div className="seatsmap">
        {seatsElements}
        {legenda}
    </div>
    )
}