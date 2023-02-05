import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ManagePatient.scss';
import { DatePicker } from '../../../components/Input';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
        };
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        await this.getDataPatient(user.id, formattedDate);
    }
    getDataPatient = async (id, date) => {
        let res = await getAllPatientForDoctor(id, date);
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
            () => {
                let { user } = this.props;
                let { currentDate } = this.state;
                let formattedDate = new Date(currentDate).getTime();
                this.getDataPatient(user.id, formattedDate);
            },
        );
    };

    handleBtnConfirm = (item) => {
        console.log('check item confirm', item);
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
        };
        this.setState({
            isOpenRemedyModal:true,
        })
        console.log('check data ne', data);
    };

    render() {
        let { dataPatient } = this.state;
        let { language } = this.props;
        console.log('check state', this.state);
        return (
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
                                        <td>no data</td>
                                        <td>no data</td>
                                        <td>no data</td>
                                        <td>no data</td>
                                        <td>no data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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
