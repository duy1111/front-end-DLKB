import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import './BookingModal.scss';
import { DatePicker } from '../../../../components/Input';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            doctorId: '',
            timeType: '',
            genderArr: [],
        };
    }

    componentDidMount() {
        this.props.fetchGender();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                this.setState({
                    doctorId: doctorId,
                    timeType: this.props.dataTime.timeType,
                });
            }
        }
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        });
    };
    handleOnChangeEvent = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        });
    };
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        console.log('render time booking', dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date =
                language === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('ddd - MM/DD/YYYY');

            return `${time} - ${date}`;
        }
        return ``;
    };
    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        console.log('render time booking', dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGES.VI
                    ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
                    : `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;

            return name;
        }
        return ``;
    };
    handleConfirmBooking = async () => {
        console.log('confirm booking', this.state);
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime)
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.doctorId,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            gender: this.state.gender,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName:doctorName,
            dateBooking: this.props.dateBooking.toString(),
            
        });
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!');
            this.props.closeBookingClose();
        } else {
            toast.error('Booking a new appointment error!');
        }
    };
    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let genders = this.state.genderArr;
        let { language } = this.props;
        console.log('check props dayBooking' , this.props.dateBooking.toString() )
        return (
            // toggle={}
            <Modal isOpen={isOpenModal} className={'booking-modal-container'} size="lg" centered>
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className="right" onClick={closeBookingClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-info">
                            <ProfileDoctor
                                doctorId={dataTime && dataTime.doctorId ? dataTime.doctorId : ''}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>

                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeEvent(event, 'fullName')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeEvent(event, 'phoneNumber')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeEvent(event, 'email')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeEvent(event, 'address')}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeEvent(event, 'reason')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birthday" />
                                </label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.birthday[0]}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <select
                                    id="inputGender"
                                    className="form-control"
                                    onChange={(event) => this.handleOnChangeEvent(event, 'gender')}
                                    value={this.state.gender}
                                >
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                        <div className="row"></div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm" onClick={this.handleConfirmBooking}>
                            <FormattedMessage id="patient.booking-modal.confirm" />
                        </button>
                        <button className="btn-booking-cancel" onClick={closeBookingClose}>
                            <FormattedMessage id="patient.booking-modal.cancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
