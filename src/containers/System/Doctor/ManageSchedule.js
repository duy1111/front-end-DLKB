import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import { DatePicker } from '../../../components/Input';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null,
            listDoctors: '',
            currentDate: '',
            rangeTime: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;

            if (data && data.length > 0) {
                data = data.map((item) => {
                    item.isSelected = false;
                    return item;
                });
            }

            this.setState({
                rangeTime: data,
            });
        }
    }
    handleChange = async (selectedOption) => {
        console.log('check sel', selectedOption);
        this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));
    };
    buildDataInputSelect = (inputData) => {
        let result = [];
        console.log('check inputData', inputData);
        let { userInfo } = this.props;
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                if (userInfo && userInfo.roleId === 'R2') {
                    if (item.id === userInfo.id) {
                        let object = {};
                        let labelVi = `${item.firstName} ${item.lastName} `;
                        let labelEn = `${item.lastName} ${item.firstName} `;
                        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                        object.value = item.id;
                        result.push(object);
                    }
                } else {
                    let object = {};
                    let labelVi = `${item.firstName} ${item.lastName} `;
                    let labelEn = `${item.lastName} ${item.firstName} `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                }
            });
        }

        return result;
    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            let data = rangeTime.map((item) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                    return item;
                }
            });
            this.setState({
                rangeTime: rangeTime,
            });
        }
    };
    handleSaveSchedule = async () => {
        let { rangeTime, selectedOption, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error('Invalid Date!');
            return;
        }
        if (!selectedOption) {
            toast.error('Invalid Doctor!');
            return;
        }

        //let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        //let formatedDate = moment(currentDate).unix();
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter((item) => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((item) => {
                    let object = {};
                    object.doctorId = selectedOption.value;
                    object.date = formatedDate;
                    object.timeType = item.keyMap;
                    result.push(object);
                });
            } else {
                toast.error('Invalid selected time!');
            }
        }
        let res = await this.props.saveBulkSchedules({
            arrSchedule: result,
            doctorId: selectedOption.value,
            date: '' + formatedDate,
        });
    };
    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        let { userInfo } = this.props;
        let min = new Date();
        min.setHours(0, 0, 0, 0);
        console.log('check props userInfo', userInfo);
        return (
            <>
                <div className="ManageSchedule-container">
                    <div className="ManageSchedule-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group ">
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-doctor" />
                                </label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="manage-schedule.choose-day" />
                                    </label>
                                    {/* {currentDate && (
                                        <DatePicker
                                            className="form-control"
                                            onChange={this.handleOnChangeDatePicker()}
                                            value={this.state.currentDate[0]}
                                            minDate={new Date()}
                                        />
                                    )} */}
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnChangeDatePicker}
                                        value={this.state.currentDate[0]}
                                        minDate={min}
                                    />
                                </div>
                            </div>
                            <div className="col-6 pick-hour-container form-group">
                                <div className="content-left">
                                    {rangeTime &&
                                        rangeTime.length > 0 &&
                                        rangeTime.map((item, index) => {
                                            return (
                                                <button
                                                    className={
                                                        item.isSelected === true
                                                            ? 'btn btn-schedule active'
                                                            : 'btn btn-schedule'
                                                    }
                                                    key={index}
                                                    onClick={() => this.handleClickBtnTime(item)}
                                                >
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </button>
                                            );
                                        })}
                                </div>
                            </div>
                            <div className="row">
                                <button className="btn btn-primary col-1" onClick={() => this.handleSaveSchedule()}>
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
        saveBulkSchedules: (data) => dispatch(actions.saveBulkSchedules(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
