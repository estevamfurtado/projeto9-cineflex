import { Link } from "react-router-dom";

export default function MovieThumb ({title, id, posterURL, overview, releaseDate, setAppMovie}) {

    const movie = {title: title, id: id, posterURL: posterURL};

    return (<>
        <Link to={"/sessoes/"+id} onClick={() => {
            setAppMovie(movie);
        }}>
            <img className="movies__movieThumb" src={posterURL} alt={title}></img>
        </Link>
    </>)
}