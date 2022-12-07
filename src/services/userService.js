import axios from '../axios';
const handleLogin = (email, password) => {
    return axios.post('/api/login', { email:email, password:password });
};
const getAllUser = (userId) => {
    return axios.get(`/api/get-all-user?id=${userId}`,{id:userId})
}
export default handleLogin;
export {getAllUser}