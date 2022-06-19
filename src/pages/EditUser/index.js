import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import Loading from '../../components/Loading';
import { editRequest } from '../../store/slices/auth';
import { Container } from '../../styles/GlobalStyled';
import { Form } from './styled';

export default function EditUser () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //const id = useSelector(state => state.auth.user.id);
    const dispatch = useDispatch()
    const nameUser = useSelector(state => state.auth.user.nome);
    const emailUser = useSelector(state => state.auth.user.email);

    useEffect(() => {
        setName(nameUser);
        setEmail(emailUser);
    }, [nameUser, emailUser])

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
        if (formErrors) return;
        setIsLoading(true);
        dispatch(editRequest({name, email, password}))
    }
    return (
        <Container>
        <h1>Edit your informations.</h1>
        <Loading isLoading={isLoading} />
        <Form onSubmit={handleSubmit}>
            <label htmlFor='name'>
                Name:
                <input 
                    type="text" 
                    placeholder='Your new name' 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    />
            </label>
            <label htmlFor='email'>
                E-mail:
                <input 
                    type="email" 
                    placeholder='Your new e-mail' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    />
            </label>
            <label htmlFor='password'>
               Password:
                <input 
                    type="password" 
                    placeholder='Your new password' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    />
            </label>
            <button>Save</button>
        </Form>
        </Container>
    )
}