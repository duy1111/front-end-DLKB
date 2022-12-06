import axios from '../axios';
const handleLogin = (email, password) => {
    return axios.post('/api/login', { email:email, password:password });
};

export default handleLogin;
