import React, { Fragment, useState } from 'react';

import { gql } from '@apollo/client';


const Register = ({ client }) => {


    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const { name, email, password, passwordConfirm } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        if (!name || !email || !password) {
            return false
        }
        if (password !== passwordConfirm) {
            return false
        }

        client
        .mutate({
            mutation: gql`
            mutation {
            addUser(name: "${name}", email: "${email}", password: "${password}") {
                name,
                email,
                password
              }
            }
          `
        })
        .then(result => console.log(result));


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
export default Register;