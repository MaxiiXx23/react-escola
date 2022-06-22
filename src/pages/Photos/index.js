import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import history from '../../services/history';

import Loading from '../../components/Loading'; 
import { FormPhoto } from './styled'
import { Container,Title } from '../../styles/GlobalStyled';



export default function Photos() {
    const [isLoading, setIsLoading] = useState(false);
    const [photo, setPhoto] = useState('');
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

    return (
        <Container>
            <Loading isLoading={isLoading}/>
            <Title>Photos</Title>
            <FormPhoto>
                <label htmlFor='photo'>
                    { photo ? <img src={photo} alt="Profile" /> : 'Select Photo'}
                    <input type="file" id='photo'/>
                </label>
            </FormPhoto>
        </Container>
    )
}