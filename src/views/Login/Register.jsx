import React, { useState } from 'react';
import './Form.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../Utils/API';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const [practiceName, setPracticeName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState("");
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        if(password !== confirmPass){
            toast.error("Passwords don't match")
            return
        }
        register(email, password, firstName, lastName, practiceName).then(res => {
            toast.success('Register Success')
            navigate('/login')
        }).catch(err => {
            toast.error('Register Unsuccessful')
        })
    }
    return(
        <>
            <section className="form-center-section">
            <ToastContainer/>

                <div className="form-container">
                <form name="signUpForm" className="form" onSubmit={handleRegister}>
                    <div className="form-header">
                        <h2>Sign Up</h2>
                    </div>
                    <div className="double-form-field-wrap">
                        <div className="form-field">
                            <label className="form-label" htmlFor="firstName">First name</label>
                            <input className="form-input" type="text" id="firstName" name="firstName" placeholder="Johnny" required
                                value={firstName} onChange={event => setFirstName(event.target.value)}/>
                        </div>
                        <div className="form-field">
                            <label className="form-label" htmlFor="lastName">Last name</label>
                            <input className="form-input" type="text" id="lastName" name="lastName" placeholder="Appleseed" required
                                value={lastName} onChange={event => setLastName(event.target.value)}/>
                        </div>
                    </div>
                    <div className="form-field">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-input" type="email" id="email" name="username" placeholder="jappleseed@yahoo.com" required autoComplete="email"
                            value={email} onChange={event => setEmail(event.target.value)}/> 
                    </div>
                    <div className="form-field">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-input" type="password" id="password" name="password" placeholder="···" required autoComplete="new-password"
                            value={password} onChange={event => setPassword(event.target.value)}/>
                    </div>
                    <div className="form-field">
                        <label className="form-label" htmlFor="confirmPass"> Confirm Password </label>
                        <input className="form-input" type="password" id="confirmPass" name="password" placeholder="···" required autoComplete="new-password"
                            value={confirmPass} onChange={event => setConfirmPass(event.target.value)}/>
                    </div>
                    <div className="form-field">
                            <label className="form-label" htmlFor="practiceName">Practice Name</label>
                            <input className="form-input" type="text" id="practiceName" name="practiceName" placeholder="" required
                                value={practiceName} onChange={event => setPracticeName(event.target.value)}/>
                        </div>
                    <button className="form-button" type="submit"> Submit </button>
                    <a href="/login"> Already have an account? Login here</a>
                </form>

                </div>
            </section>
        </>
    )
}
