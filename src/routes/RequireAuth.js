import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
export default function RequireAuth({ isClosed, children }) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    if (isClosed && !isLoggedIn) {
        return <Navigate to='/login/' />
    }
    return children;
}

RequireAuth.defaultProps = {
    isClosed: false
}

RequireAuth.propTypes = {
    //children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    isClosed: PropTypes.bool,
}
