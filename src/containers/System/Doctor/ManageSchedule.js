import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { DatePicker } from '../../../components/Input';
import moment from 'moment';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        // const currentDate = new Date();
        // currentDate.setHours(0,0,0,0);
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
            this.setState({
                rangeTime: this.props.allScheduleTime,
            });
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        //     this.setState({
        //         listDoctors: dataSelect,
        //     });
        // }
    }
    handleChange = async (selectedOption) => {
        console.log('check sel', selectedOption);
        this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));
    };
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName} `;
                let labelEn = `${item.lastName} ${item.firstName} `;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        console.log('check result', inputData);
        return result;
    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };
    render() {
        console.log('check state', this.state);
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="ManageSchedule-container">
                    <div className="ManageSchedule-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group ">
                                <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className='row'>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="manage-schedule.choose-day" /></label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnChangeDatePicker}
                                        value={this.state.currentDate[0]}
                                        minDate={new Date()}
                                    />
                                </div>
                            </div >
                            <div className="col-6 pick-hour-container form-group">
                                <div className='content-left'>
                                    {rangeTime &&
                                        rangeTime.length > 0 &&
                                        rangeTime.map((item, index) => {
                                            return (
                                                <button className="btn btn-schedule" key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </button>
                                            );
                                        })}
                                </div >
                            </div>
                            <div className='row'><button className="btn btn-primary col-1"><FormattedMessage id="manage-schedule.save" /></button></div >
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
