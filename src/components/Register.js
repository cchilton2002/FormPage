import { useRef, useState, useEffect } from "react"
import React from 'react'
import { faCheck,faTimes,faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "../api/axios";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus,setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMessage, setErrMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result)
    },[user])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = matchPassword === password;
        setValidMatch(match);
    }, [password,matchPassword])

    useEffect(() => {
        setErrMessage('');
    }, [user, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2){
            setErrMessage("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify({ user,password }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(JSON.stringify(response));
            setSuccess(true);
            // clear input fields
        } catch (err) {
            if (!err?.response) {
                setErrMessage('No server response');
            } else if (err.response?.status === 409) {
                setErrMessage('Username taken');
            } else {
                setErrMessage('Registration Failed');
            }
            errRef.current.focus();
        }
    }


  return (
    <>
    {success ? (
        <section>
            <h1>Success!!</h1>
            <p>
                <a href="#">Sign In</a>
            </p>
        </section>
    ) : (
    <section>
        <p ref={errRef} className={errMessage ? "errMessage" : "offscreen"} aria-live="assertive">{errMessage}</p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">
                Username:
                <span className={validName ? "valid" : "hide"}> 
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={e => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter. <br />
                Letters, numbers, underscores and hyphens allowed.
            </p>
            <label htmlFor="password">
                Password:
                <span className={validPassword ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPassword || !password ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
                type="password"
                id="password" 
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
            />
            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters long.<br />
                Must include an uppercase, number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span><span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
            </p>
            <label htmlFor="confirm_pwd">
                Confirm Password:
                <span className={validMatch && matchPassword ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPassword(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"} />
                Must match the first password input field.
            </p>
            <button disabled={!validName || !validPassword || !validMatch ? true : false}>
                Sign Up
            </button>
        </form>
        <p>
            Already registered?<br />
            <span className="line">
                <a href="#">Sign in</a>
            </span>
        </p>
    </section>
    )}
    </>
  )
}

export default Register


