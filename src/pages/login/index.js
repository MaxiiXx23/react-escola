import React, { useState } from 'react';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { loginRequest } from '../../store/slices/auth'; 
import { Container } from '../../styles/GlobalStyled';
import { Form } from './styled';
import Loading from '../../components/Loading';

export default function Login() {
    const dispacth = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        let formErrors = false;

        if(!isEmail(email)){
            formErrors = true;
            toast('Email field is invalid.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        if(password.length < 6 || password.length > 50){
            formErrors = true;
            toast('Password field must contain between 06 to 50 characters ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        if(formErrors) return;
        dispacth( loginRequest({email, password}))
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <label htmlFor='email'>
                    E-mail
                    <input
                        type='text'
                        placeholder='Your E-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor='password'>
                    Password
                    <input
                        type='password'
                        placeholder='Your Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <button type='submit'>Log in</button>
            </Form>
        </Container>
    )
}