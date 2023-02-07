import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ManagePatient.scss';
import { DatePicker } from '../../../components/Input';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }

    async componentDidMount() {
        await this.getDataPatient();
    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor(user.id, formattedDate);
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }

    handleOnChangeDatePicker = async (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            },
        );
    };

    handleBtnConfirm = (item) => {
        console.log('check item confirm', item);
        let data = {};
        if (item.patientData && item.patientData.lastName) {
            data = {
                doctorId: item.doctorId,
                patientId: item.patientId,
                email: item.patientData.email,
                dayBooking: item.dayBooking,
                timeType: item.timeType,
                patientName: `${item.patientData.firstName} ${item.patientData.lastName}`,
            };
        }
        data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            dayBooking: item.dayBooking,
            timeType: item.timeType,
            patientName: `${item.patientData.firstName}`,
        };

        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
        console.log('check data ne', data);
    };

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
        });
    };

    sendRemedy = async (dataForChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading:true
        })
        let res = await postSendRemedy({
            email: dataForChild.email,
            imgBase64: dataForChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            dayBooking: dataModal.dayBooking,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        console.log('parent check modal', dataForChild);

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading:false
            })
            toast.success('Send memory succeeds');
            await this.getDataPatient();
            this.closeRemedyModal();
        } else {
            this.setState({
                isShowLoading:false
            })
            toast.error('Send memory failed');
        }
    };
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, closeRemedyModal } = this.state;
        let { language } = this.props;
        console.log('check state', this.state);
        return (
            <LoadingOverlay active={this.state.isShowLoading} spinner text='Loading...' >
                <>
                    <div className="manage-patient-container">
                        <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12 table-manage-patient">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Actions</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let time =
                                                    LANGUAGES.VI === language
                                                        ? item.timeTypeDataPatient.valueVi
                                                        : item.timeTypeDataPatient.valueEn;

                                                let gender =
                                                    LANGUAGES.VI === language
                                                        ? item.patientData.genderData.valueVi
                                                        : item.patientData.genderData.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>
                                                            {item.patientData.firstName} {item.patientData.lastName}
                                                        </td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className="mp-btn-confirm"
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={6} style={{ textAlign: 'center' }}>
                                                    no data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
