import { useState } from "react";

const Authenticate = ({ token }) => {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    
    const [successMessage, setSuccessMessage] = useState(null);

    const handleClick = async () => {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message);
                setSuccessMessage(result.message);
            } else {
                setError(result.message);
                console.error("Authentication failed:", result.message);
            }
        } catch (error) {
            setError(error.message);
            console.error("Authentication failed:", error.message);
        }
    };

    return (
        <div>
            <h2>Authenticate</h2>

            {error && <p>{error}</p>}

            {successMessage && <p>{successMessage}</p>}

            <button onClick={handleClick}>Authenticate Token</button>
        </div>
    );
};

export default Authenticate;
