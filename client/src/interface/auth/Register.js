import React, { Fragment, useState } from 'react';



const Register = () => {


    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const { name, email, password, passwordConfirm } = formData;


    const handleChange = (e) => {
        return setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <Fragment>
            <form>
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