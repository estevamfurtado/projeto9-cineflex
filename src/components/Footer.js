export default function Footer({ movie, session }) {

    return (<footer>
        <div>
            {movie ? <img className="movies__movieThumb" src={movie.posterURL} alt={movie.title}></img> : <></>}
            <div>
                {movie ? <p>{movie.title}</p> : <></>}
                {session ? <p>{`${session.weekday} - ${session.name}`}</p> : <></>}
            </div>
        </div>
    </footer>)
}