export default function Footer({ movie, session }) {

    console.log("sesh", session);

    return (<footer>
        <div>
            <img className="movies__movieThumb" src={movie.posterURL} alt={movie.title}></img>
            <div>
                <p>{movie.title}</p>
                {session ? <p>{`${session.weekday} - ${session.name}`}</p> : <></>}
            </div>
        </div>
    </footer>)
}