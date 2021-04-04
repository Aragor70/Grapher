import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { login } from '../../actions/auth';



const Login = ({ client, history, isAuthenticated }) => {

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

    }, [])

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    })
    
    const { email, password } = formData;

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData)
        if (!email || !password) {
            return false
        }
        

        await login(formData, client, history)


    }

    const handleChange = (e) => {
        return setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <Fragment>
            <form onSubmit={e=> handleSubmit(e)}>
                <h1>Login</h1>

                <label className="auth-label">
                    <input type="text" className="auth-input" name='email' value={email} onChange={e=> handleChange(e)} />
                </label>
                <label className="auth-label">
                    <input type="text" className="auth-input" name='password' value={password} onChange={e=> handleChange(e)} />
                </label>
                <button type="submit">log in</button>


            </form>
        </Fragment>
    );
}
export default withRouter(Login);