import { Link } from "react-router-dom";

const Lounge = () => {
    return (
        <section>
            <h1>Lounge</h1>
            <br />
            <p>
                Only editors and admin allowed in the lounge.
            </p>
            <div className="flexGrow">
                <Link to='/'>Home</Link>
            </div>
        </section>
    )
}

export default Lounge;