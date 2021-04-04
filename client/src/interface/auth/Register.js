import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { register } from '../../actions/auth';


const Register = ({ client, history, isAuthenticated }) => {

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

    }, [])

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const { name, email, password, passwordConfirm } = formData;

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData)
        if (!name || !email || !password) {
            return false
        }
        if (password !== passwordConfirm) {
            return false
        }

        await register(formData, client, history)


    }

    const handleChange = (e) => {
        return setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <Fragment>
            <form onSubmit={e=> handleSubmit(e)}> 
                <h1>Register</h1>

                <label className="auth-label">
                    <input type="text" className="auth-input" name='name' value={name} onChange={e=> handleChange(e)} />
                </label>
                <label className="auth-label">
                    <input type="text" className="auth-input" name='email' value={email} onChange={e=> handleChange(e)} />
                </label>
                <label className="auth-label">
                    <input type="text" className="auth-input" name='password' value={password} onChange={e=> handleChange(e)} />
                </label>
                <label className="auth-label">
                    <input type="text" className="auth-input" name='passwordConfirm' value={passwordConfirm} onChange={e=> handleChange(e)} />
                </label>
                <button type="submit">log in</button>

            </form>
        </Fragment>
    );
}
export default withRouter(Register);