import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { get } from 'lodash';
import { FaEdit, FaUserCircle } from 'react-icons/fa';

import { loginFailure } from '../../store/slices/auth';
import history from '../../services/history';
import axios from '../../services/axios';

import { ProfilePhoto } from './styled';
import { Container, Form } from '../../styles/GlobalStyled';

export default function Student() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [photo, setPhoto] = useState('');
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        async function getData() {
            try {
                const { data } = await axios.get(`/alunos/${id}`);
                const getPhoto = get(data, 'Fotos.[0].url', '');
                setName(data.nome);
                setLastName(data.sobrenome);
                setEmail(data.email);
                setAge(data.idade);
                setWeight(data.peso);
                setHeight(data.altura);
                setPhoto(getPhoto);
            } catch (err) {
                const errors = get(err, 'response.data.errors', [])
                const status = get(err, 'response.status', 0)
                if (status === 400) errors.map(error =>
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                );
                history.push('/');
            }
        }
        getData()
    }, [id])

    async function handleSubmit(e) {
        e.preventDefault();
        let formErrors = false;
        if (name.length < 2 || name.length > 200) {
            formErrors = true;
            toast.error('Name field must contain between 02 to 200 characters. 🙁', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (lastName.length < 2 || lastName.length > 200) {
            formErrors = true;
            toast.error('Last Name field must contain between 02 to 200 characters. 🙁', {
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
            toast.error('Email field is invalid. 🙁', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (!isInt(String(age))) {
            formErrors = true;
            toast.error('Age field is invalid. 🙁', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (!isFloat(String(weight))) {
            formErrors = true;
            toast.error('Weight field is invalid. 🙁', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (!isFloat(String(height))) {
            formErrors = true;
            toast.error('Height field is invalid. 🙁', {
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
        try {
            if (id) {
                await axios.put(`/alunos/${id}`,
                    {
                        nome: name,
                        sobrenome: lastName,
                        email,
                        idade: age,
                        peso: weight,
                        altura: height,
                    })

                toast.success('Student edited with success! 🤓', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                history.push('/')

            } else {
                await axios.post('/alunos',
                    {
                        nome: name,
                        sobrenome: lastName,
                        email,
                        idade: age,
                        peso: weight,
                        altura: height,
                    })
                setName('');
                setLastName('');
                setEmail('');
                setAge('');
                setWeight('');
                setHeight('');
                toast.success('Student create with success! 🤓', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (err) {
            const errors = get(err, 'response.data.errors', []);
            const status = get(err, ' response.status', 0);

            if (errors.length > 0) {
                errors.map(error =>
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }))
            } else {
                toast.error('unknown error', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
            if (status === 401) {
                dispatch(loginFailure())
                history('/')
            }

        }
    }

    return (
        <Container>
            {id ?
                <h1>Edit the Student. 🤓</h1>
                : <h1>Create a Student to School. 🤓</h1>
            }
            {id && (
                <ProfilePhoto>
                    {
                        photo ?
                            <img src={photo} alt={name} />
                            : <FaUserCircle size={120} />
                    }
                    <Link to={`/photos/${id}`}>
                        <FaEdit size={24}/>
                    </Link>
                </ProfilePhoto>
            )}
            <Form onSubmit={handleSubmit}>
                <label htmlFor='name'>
                    Name:
                    <input
                        type="text"
                        placeholder='Name of student'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label htmlFor='lastName'>
                    Last Name:
                    <input
                        type="text"
                        placeholder='Last Name of student'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </label>
                <label htmlFor='email'>
                    E-mail:
                    <input
                        type="email"
                        placeholder='E-mail of student'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor='age'>
                    Age:
                    <input
                        type='number'
                        placeholder='Age of student'
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                </label>
                <label htmlFor='weight'>
                    Weight:
                    <input
                        type='text'
                        placeholder='Weight of student. Example: 43.50'
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                    />
                </label>
                <label htmlFor='height'>
                    Height:
                    <input
                        type='text'
                        placeholder='Height of student. Example: 1.60'
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                    />
                </label>
                <button type='submit'>Create Student</button>
            </Form>
        </Container>
    )
}

Student.propTypes = {
    match: PropTypes.shape({})
}