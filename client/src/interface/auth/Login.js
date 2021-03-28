import React, { Fragment, useState } from 'react';



const Login = () => {


    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    })
    
    const { email, password } = formData;

    const handleChange = (e) => {
        return setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <Fragment>
            <form>
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
export default Login;