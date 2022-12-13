import axios from '../axios';
const handleLogin = (email, password) => {
    return axios.post('/api/login', { email:email, password:password });
};
const getAllUser = (userId) => {
    return axios.get(`/api/get-all-user?id=${userId}`,{id:userId})
}
const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`,data)
}
export default handleLogin;
export {getAllUser ,createNewUserService}