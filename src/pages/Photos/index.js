import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import axios from '../../services/axios';
import history from '../../services/history';
import { loginFailure } from '../../store/slices/auth';

import Loading from '../../components/Loading'; 
import { FormPhoto, ContainerBtnConfirm } from './styled'
import { Container,Title } from '../../styles/GlobalStyled';



export default function Photos() {
    const [isLoading, setIsLoading] = useState(false);
    const [photo, setPhoto] = useState('');
    const [photoFile, setPhotoFile] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const dispatch = useDispatch();

    const {id} = useParams();
    
    useEffect(() => {
        async function getData(){
            try{
               setIsLoading(true);
               const { data } =  await axios.get(`/alunos/${id}`)
               const photoStudent = get(data, 'Fotos.[0].url', '');
               setPhoto(photoStudent);
               setIsLoading(false);
            }catch(e){
                toast.error('Image is not found. 🙁', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    setIsLoading(false);
                    history.push('/');
            }
        }
        getData()
    },[id])

    function handleChange(e) {
        e.preventDefault();
        const photoFile = e.target.files[0];
        const photoUrl = URL.createObjectURL(photoFile);
        setPhoto(photoUrl);
        setPhotoFile(photoFile);
        setShowConfirm(true);
    }

    async function handlePhoto(){
        const formData = new FormData();
        formData.append('aluno_id', id);
        formData.append('photo', photoFile);
        try{
            setIsLoading(true);
            await axios.post('/photo', formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            })
            toast.success('Yeaah! Your photo changed! 🤩', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            setIsLoading(false);
            history.push(`/student/${id}/edit`);
        }catch(e){
            const status = get(e, 'response.status', '');
            setIsLoading(false);
            if(status === 401) dispatch(loginFailure());
            history.push('/')

        }
    }

    const  ShowBtnConfirm = () => (
        <ContainerBtnConfirm>
            <button onClick={handlePhoto}>Save Photo</button>
        </ContainerBtnConfirm>
    )

    return (
        <Container>
            <Loading isLoading={isLoading}/>
            <Title>Photo</Title>
            <FormPhoto>
                <label htmlFor='photo'>
                    { photo ? <img src={photo} alt="Profile" /> : 'Select Photo'}
                    <input type="file" id='photo' onChange={handleChange}/>
                </label>
            </FormPhoto>
            { showConfirm ? <ShowBtnConfirm /> : null}
        </Container>
    )
}