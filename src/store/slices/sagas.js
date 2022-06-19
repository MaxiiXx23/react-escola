import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { loginSuccess, loginFailure, editSuccess, editFailure } from '../slices/auth';
import axios from '../../services/axios';
import history from '../../services/history';
function* workGetLoginFetch({ payload }) {
    try {
        const response = yield call(axios.post, '/token', payload);
        yield put(loginSuccess(response.data));
        toast.error('Login successfully.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        axios.defaults.headers.authorization = `Bearer ${response.data.token}`;
        history.push('/')

    } catch (e) {
        toast.error('User or Password is invalid. ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        yield put(loginFailure())
    }
}
function* workUpdateFetch({payload}) {
    const {name, email, password} = payload;
    try {
        yield call(axios.put, '/users', {
            nome: name,
            email,
            password: password || undefined
        });
        yield put(editSuccess());
        toast.error('Information successfully updated!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
       
        history.push('/login')

    } catch (e) {
        const errors = get(e, 'response.data.errors', []);
            if(errors.length > 0) {
                errors.map( err =>             
                    toast.error(err, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }))
            }else {
                toast.error('Unknown error.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        yield put(editFailure())
    }
}

function* authSaga() {
    yield takeEvery('auth/loginRequest', workGetLoginFetch);
    yield takeEvery('auth/editRequest', workUpdateFetch);
}

export default authSaga;