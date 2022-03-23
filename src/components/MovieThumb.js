import { Link } from "react-router-dom";

export default function MovieThumb ({title, id, posterURL, overview, releaseDate}) {
    return (<>
        <Link to="/sessoes">
            <img className="movies__movieThumb" src={posterURL} alt={title}></img>
        </Link>
    </>)
}