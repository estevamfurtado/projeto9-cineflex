import { Link } from "react-router-dom";

export default function Sessions () {
    return (<>
        <h1>Selecione o horário</h1>
        <div className="day">
            <h2>Quinta-feira - 24/06/2021</h2>
            <div className="day__sessions">
                <Link to="/assentos"><button>15:00</button></Link>
                <Link to="/assentos"><button>15:00</button></Link>
            </div>
        </div>

        <div className="day">
            <h2>Quinta-feira - 24/06/2021</h2>
            <div className="day__sessions">
                <Link to="/assentos"><button>15:00</button></Link>
                <Link to="/assentos"><button>15:00</button></Link>
            </div>
        </div>
    </>)
}