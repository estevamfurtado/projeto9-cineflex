import { useNavigate } from "react-router-dom";

export default function Header({ showPreviousButton }) {

    let navigate = useNavigate();
    function goToPreviousPage() {
        navigate(-1);
    }

    return (
        <header>
            <div className="headerContainer">
                {showPreviousButton
                    ? <div className="previousButton" onClick={() => {
                        goToPreviousPage();
                    }}>{"< Voltar"}</div>
                    : <></>}
                <h1 className="headerTitle">CINEFLEX</h1>
            </div>
        </header>)
}