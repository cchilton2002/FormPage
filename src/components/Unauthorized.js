import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate;
    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>
                You are not authorized to be in this section.
            </p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized;