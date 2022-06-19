import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { loginFailure } from '../../store/slices/auth';
import { useSelector, useDispatch } from 'react-redux';

import history from '../../services/history';
import { FaHome, FaSignInAlt, FaUserAlt, FaSignOutAlt, FaPencilAlt } from 'react-icons/fa';


import { Nav, Name } from './styled';
function Header() {
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const id = useSelector(state => state.auth.user.id);
    const nameUser = useSelector(state => state.auth.user.nome);
    useEffect(() => {
        if (!id) return;
        setName(nameUser)
    }, [id, nameUser])

    function logout(e){
        e.preventDefault();
        toast.info('Logout with success! Bye Bye. 👏', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        dispatch(loginFailure());
        history.push('/');
    }

    return (
        <Nav>
            {id ? <Name>{name}</Name> : null}
            <Link to='/'>
                <FaHome size={24} />
            </Link>
            {id ?
                <Link to='/editUser'>
                    <FaPencilAlt size={24} />
                </Link>
                : 
                <Link to='/register'>
                    <FaUserAlt size={24} />
                </Link>
            }
            {id ?
                <Link to='/logout' onClick={logout}>
                    <FaSignOutAlt size={24} />
                </Link> : <Link to='/login'>
                    <FaSignInAlt size={24} />
                </Link>}

        </Nav>
    )
}

export { Header }