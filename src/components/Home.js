import { useNavigate,Link } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth} = useContext(AuthContext);
    const navitgate = useNavigate();

    const logout = async () => {
        setAuth({});
        navitgate('/linkpage');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}


export default Home;