import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import localization from 'moment/locale/vi';
import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../services/userService';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            arrDays: [],
            allAvailableTime: [],
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
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDays.push(object);
        }

        this.setState({
            arrDays: arrDays,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { language } = this.props;
        if (prevProps.language !== this.props.language) {
            let arrDays = [];
            for (let i = 0; i < 7; i++) {
                let object = {};
                if (language === LANGUAGES.VI) {
                    let label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(label);
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
                arrDays.push(object);
            }
            this.setState({
                arrDays: arrDays,
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
            console.log(res);
        }
        console.log('check sel', selectedOption);
        this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));
    };
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        let options = this.state.arrDays;
        let { allAvailableTime } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <Select
                        classNamePrefix="filter"
                        options={options}
                        onChange={this.handleChange}
                        styles={this.customStyle}
                        value={this.state.selectedOption}
                    />
                </div>
                <div className="all-available-time">
                    <div className="text-calender">
                        <span>
                            <FontAwesomeIcon className="text-calender-icon" icon={faCalendarAlt} />
                            Lịch khám
                        </span>
                    </div>
                    <div className="time-content">
                        {allAvailableTime && allAvailableTime.length > 0 ? (
                            allAvailableTime.map((item, index) => {
                                let timeDisplay =
                                    language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                //let timeTypeData
                                return <button key={index}>{timeDisplay}</button>;
                            })
                        ) : (
                            <div>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác</div>
                        )}
                    </div>
                </div>
            </div>
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
