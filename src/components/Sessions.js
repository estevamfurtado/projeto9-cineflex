import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';


export default function Sessions({setAppMovie, setAppSession}) {


    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);

    const link = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`;
    useEffect(() => {
        const promessa = axios.get(link);
        promessa.then(resposta => {
            console.log("showtimes -> ", resposta.data);
            setMovie(resposta.data);
            setAppMovie(resposta.data);
        }).catch(error => {
            console.log("error in ", error)
        })
    }, []);

    const loading = (<p>Loading...</p>);
    const loadedContent = (
        <>
            <h1>Selecione o horário</h1>
            {movie ? movie.days.map((day) => {
                const {id, date, weekday, showtimes} = day;
                return (
                    <div key={id} className="day">
                        <h2>{`${weekday} - ${date}`}</h2>
                        <div className="day__sessions">
                            {showtimes.map(session => {
                                const {name, id} = session;
                                return (<Link key={id} to={`/assentos/${id}`} onClick={() => {
                                    const sessionData = {...session};
                                    sessionData.weekday = weekday;
                                    sessionData.date = date;
                                    setAppSession(sessionData);
                                }}>
                                    <button>{name}</button>
                                    </Link>);
                            }
                            )}
                        </div>
                    </div>
                )
            }) : <></>}
        </>
    );

    return (movie ? loadedContent : loading);
}