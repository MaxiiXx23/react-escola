import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import { Container } from '../../styles/GlobalStyled';
import { Form } from './styled';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        let formErrors = false;
        if (name.length < 3 || name.length > 250) {
            formErrors = true;
            toast('Name field must contain between 03 to 250 characters ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (!isEmail(email)) {
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
        if (password.length < 6 || password.length > 50) {
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
        if (formErrors) return;
        setIsLoading(true);
        try {
            await axios.post('/users/', {
                nome: name,
                password,
                email
            })
            toast.success('Account created with success! ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setIsLoading(false);
            history.push('/login');
        } catch (err) {
            setIsLoading(false);
            let errors = err.response.data.errors;
            errors.map(error => toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }))
        }
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>Create your account</h1>
            <Form onSubmit={handleSubmit}>
                <label htmlFor='name'>
                    Name:
                    <input type='text' placeholder='Your Name' value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label htmlFor='email'>
                    E-mail:
                    <input type='email' placeholder='Your Email' value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label htmlFor='password'>
                    Password:
                    <input type='password' placeholder='Your Password' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type='submit' >Create my account</button>
            </Form>
        </Container>
    )
}