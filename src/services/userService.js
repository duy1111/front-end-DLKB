import axios from '../axios';
const handleLogin = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
};
const getAllUser = (userId, accessToken) => {
    return axios.get(`/api/get-all-user?id=${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
const handleRegister = (data) => {
    return axios.post('/api/register', data);
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

const getSearchDoctor = (name) => {
    return axios.get(`/api/get-doctor-search?name=${name}`)
}

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
const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId, date) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}&date=${date}`);
};

const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
};
const postResetPassword = (data) => {
    return axios.post(`/api/reset-password`, data);
};

const postVerifyResetPassword = (data) => {
    return axios.post(`/api/verify-reset-password`, data);
};

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
};

const getDetailSpecialtyById = (id, location) => {
    return axios.get(`/apt/get-detail-specialty-by-id?specialtyId=${id}&location=${location}`);
};

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
};

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`);
};

const getDetailClinicById = (id) => {
    return axios.get(`/apt/get-detail-clinic-by-id?clinicId=${id}`);
};

const getAllPatientForDoctor = (doctorId, date) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`);
};
const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
};
const deleteAClinic = (id) => {
    //return axios.delete(`/api/delete-user`,{id : userId })
    return axios.delete('/api/delete-clinic', {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        data: {
            id: id,
            //var2: "var2"
        },
    });
};
const putUpdateSpecialty = (data) => {
    return axios.put(`/api/update-specialty`, data);
};

const deleteASpecialty = (id) => {
    //return axios.delete(`/api/delete-user`,{id : userId })
    return axios.delete('/api/delete-specialty', {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        data: {
            id: id,
            //var2: "var2"
        },
    });
};
const putUpdateClinic = (data) => {
    return axios.put(`/api/update-clinic`, data);
};

const createNewHandbook = (data) => {
    return axios.post(`/api/create-new-handbook`, data);
};
const getAllHandbook = () => {
    return axios.get(`/api/get-all-handbook`);
};

const deleteHandbook = (id) => {
    //return axios.delete(`/api/delete-user`,{id : userId })
    return axios.delete('/api/delete-handbook', {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        data: {
            id: id,
            //var2: "var2"
        },
    });
};
const putUpdateHandbook = (data) => {
    return axios.put(`/api/update-handbook`, data);
};

const getHandbookNotApprovedYet = () => {
    return axios.get(`/api/get-handbook-not-approved-yet`);
};

const postHandbookApprovedYet = (data) => {
    return axios.post(`/api/post-handbook-approved-yet`, data);
};

const getAllDoneHandbook = () => {
    return axios.get(`/api/get-handbook-done-handbook`);
};

const getDetailHandbookById = (id) => {
    return axios.get(`/apt/get-detail-handbook-by-id?id=${id}`);
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
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getDetailClinicById,
    getAllPatientForDoctor,
    postSendRemedy,
    deleteAClinic,
    putUpdateClinic,
    putUpdateSpecialty,
    deleteASpecialty,
    createNewHandbook,
    getAllHandbook,
    deleteHandbook,
    putUpdateHandbook,
    getHandbookNotApprovedYet,
    postHandbookApprovedYet,
    getAllDoneHandbook,
    getDetailHandbookById,getSearchDoctor,
    handleRegister,
    postResetPassword,
    postVerifyResetPassword
};
