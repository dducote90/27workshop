import { useState } from "react";

const SignUpForm = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        // Simple form validation
        if (username.trim() === "") {
            setError("Username cannot be empty.");
            return;
            
        
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        // Make API call to sign up
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const result = await response.json();

            if (result.success) {
                // If signup is successful, set the token
                setToken(result.token);
                console.log(result.message);
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError("Error occurred while signing up.");
        }
    }

    return (
        <div>
            <h2>Sign Up!</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:{" "}
                    <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:{" "}
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit" disabled={username.length < 7 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
