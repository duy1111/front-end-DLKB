import axios from '../axios';
const handleLogin = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
};
const getAllUser = (userId) => {
    return axios.get(`/api/get-all-user?id=${userId}`, { id: userId });
};
const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data);
};
const editUserService = (data) => {
    return axios.put(`/api/update-user`, data);
};
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allCode?type=${inputType}`);
};
const deleteNewUserService = (userId) => {
    
    //return axios.delete(`/api/delete-user`,{id : userId })
    return axios.delete('/api/delete-user', {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        data: {
            id: userId,
            //var2: "var2"
        },
    });
};
const getTopDoctorHomeServices = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`, { limit: limit });
};

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctor`);
};

const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-info-doctor`, data);
};
const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`, { id: id });
};
const saveBulkSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};
const getExtraInfoDoctorById = (doctorId, date) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}&date=${date}`);
};
const getProfileDoctorById = (doctorId, date) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}&date=${date}`);
};

const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
};
export default handleLogin;
export {
    getAllUser,
    createNewUserService,
    deleteNewUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeServices,
    getAllDoctors,
    saveDetailDoctor,
    getDetailInfoDoctor,
    saveBulkSchedule,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
};
