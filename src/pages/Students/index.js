import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEdit, FaWindowClose, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyled';
import {
StudentContainer,
ProfilePicture,
BoxConfirmDelete,
ButtonConfirm,
Modal,
BtnCreateStudent,
HeaderOptions
}
    from './styled';
import Loading from '../../components/Loading';

export default function Students() {
    const [students, setStudents] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [showBoxCofirm, setShowBoxConfirm] = useState(false);
    const [idStudent, setIdStudent] = useState('');
    const [index, setIndex] = useState('');

    const idUser = useSelector(state => state.auth.user.id);

    useEffect(() => {
        async function getStudents() {
            setIsLoading(true);
            const response = await axios.get('/alunos');
            setStudents(response.data);
            setIsLoading(false)
        }
        getStudents()
    }, [])

    function showBox(e, id, index) {
        e.preventDefault();
        if (!idUser) {
            toast.error('You must to be Logged.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        if (!showBoxCofirm) {
            setShowBoxConfirm(true);
            setIdStudent(id);
            setIndex(index);
        } else {
            setShowBoxConfirm(false)
        }
    }
    async function handleDelete() {
        try {
            await axios.delete(`/alunos/${idStudent}`);
            const newStudents = [...students];
            newStudents.splice(index, 1);
            setStudents(newStudents);
            setShowBoxConfirm(false);
            toast.success('Student deleted with success!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            const status = get(e, 'response.data.status', 0);
            if (status === 401) {
                toast.error('You must to be Logged.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }
    const BoxConfirm = () => (
        <BoxConfirmDelete>
            <div>
                <span>Do you really want to delete the student?</span>
                <Modal>
                    <ButtonConfirm onClick={handleDelete} delete>Delete</ButtonConfirm>
                    <ButtonConfirm onClick={showBox}>Close</ButtonConfirm>
                </Modal>
            </div>
        </BoxConfirmDelete>
    )

    return (
        <Container>
            <Loading isLoading={isLoading} />
            {showBoxCofirm ? <BoxConfirm /> : null}
            <HeaderOptions>
                <h1>Students</h1>
                {idUser ? 
                    <BtnCreateStudent to="/student" ><FaPlus size={24} /></BtnCreateStudent>
                    : null
                }
            </HeaderOptions>
            <StudentContainer>
                {students.map((student, index) => (
                    <div key={String(student.id)}>
                        <ProfilePicture>
                            {get(student, 'Fotos[0].url', false) ? (
                                <img src={student.Fotos[0].url} alt="" />
                            ) : (
                                <FaUserCircle size={36} />
                            )}
                        </ProfilePicture>
                        <span>{student.nome}</span>
                        <span>{student.email}</span>
                        <Link to={`/student/${student.id}/edit`}> <FaEdit size={16} /></Link>
                        <Link onClick={e => showBox(e, student.id, index)} to={`/alunos/${student.id}/delete`}> <FaWindowClose size={16} /></Link>
                    </div>
                ))}
            </StudentContainer>
        </Container>
    )
}