import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import localization from 'moment/locale/vi';
import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../services/userService';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            arrDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
            dayBooking:0,
        };
    }

    componentDidMount() {
        let { language } = this.props;
        console.log('moment vi: ', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'));
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    let label = today;
                    object.label = this.capitalizeFirstLetter(label);
                } else {
                    let label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(label);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `To day - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDays.push(object);
        }
        this.setState({
            arrDays: arrDays,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let { language } = this.props;
        let { detailDoctor } = this.props;
        console.log(detailDoctor);
        if (detailDoctor && prevProps.detailDoctor.id !== this.props.detailDoctor.id) {
            let id = detailDoctor.id;
            let res = await getScheduleDoctorByDate(id, moment(new Date()).startOf('day').valueOf());
            let allTime = [];
            if (res && res.errCode === 0) {
                allTime = res.data;
                this.setState({
                    allAvailableTime: allTime,
                    dayBooking: +this.state.arrDays[0].value,
                });
            }
            console.log(res);
        }

        if (prevProps.language !== this.props.language) {
            let arrDays = [];
            for (let i = 0; i < 7; i++) {
                let object = {};
                if (language === LANGUAGES.VI) {
                    if (i === 0) {
                        let ddMM = moment(new Date()).format('DD/MM');
                        let today = `Hôm nay - ${ddMM}`;
                        let label = today;
                        object.label = this.capitalizeFirstLetter(label);
                    } else {
                        let label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                        object.label = this.capitalizeFirstLetter(label);
                    }
                } else {
                    if (i === 0) {
                        let ddMM = moment(new Date()).format('DD/MM');
                        let today = `To day - ${ddMM}`;
                        object.label = today;
                    } else {
                        object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                    }
                }

                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
                arrDays.push(object);
            }
            this.setState({
                arrDays: arrDays,
                dayBooking: +this.state.arrDays[0].value,
            });
        }
    }
    customStyle = {
        control: (base) => ({
            ...base,
            width: '200px',
            color: '#45c3d2',
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            // const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled ? 'red' : 'white',
                color: '#45c3d2',
                width: '200px',
                cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
    };
    handleChange = async (selectedOption) => {
        if (this.props.detailDoctor.id) {
            let id = this.props.detailDoctor.id;
            let res = await getScheduleDoctorByDate(id, selectedOption.value);
            let allTime = [];
            if (res && res.errCode === 0) {
                allTime = res.data;
                this.setState({
                    allAvailableTime: allTime,
                });
            }
        }
        this.setState({ selectedOption }, () => console.log(`Option selected:`, typeof(this.state.selectedOption.value) ));
        this.setState({
            dayBooking: this.state.selectedOption.value
        })
    };
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        });
        console.log('check btn time', time);
    };
    closeBookingClose = () => {
        this.setState({
            isOpenModalBooking: false,
        });
    };
    render() {
        let options = this.state.arrDays;
        let { allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props;
        console.log('check data schedule time', this.state.dayBooking);
        console.log('check data of DayBooking',typeof(this.state.dayBooking))
        return (
            <>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingClose={this.closeBookingClose}
                    dataTime={dataScheduleTimeModal}
                    dateBooking={this.state.dayBooking}
                />
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <Select
                            classNamePrefix="filter"
                            options={options}
                            onChange={this.handleChange}
                            styles={this.customStyle}
                            value={this.state.selectedOption || this.state.arrDays[0]}
                        />
                    </div>
                    <div className="all-available-time">
                        <div className="text-calender">
                            <span>
                                <FontAwesomeIcon className="text-calender-icon" icon={faCalendarAlt} />
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ? (
                                <React.Fragment>
                                    {allAvailableTime.map((item, index) => {
                                        let timeDisplay =
                                            language === LANGUAGES.VI
                                                ? item.timeTypeData.valueVi
                                                : item.timeTypeData.valueEn;
                                        //let timeTypeData
                                        return (
                                            <button key={index} onClick={() => this.handleClickScheduleTime(item)}>
                                                {timeDisplay}
                                            </button>
                                        );
                                    })}

                                    <div className="book-free">
                                        <div>
                                            <FormattedMessage id="patient.detail-doctor.choose" />{' '}
                                            <FontAwesomeIcon icon={faHandPointUp} />{' '}
                                            <FormattedMessage id="patient.detail-doctor.book-free" />{' '}
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <div className="no-schedule">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
