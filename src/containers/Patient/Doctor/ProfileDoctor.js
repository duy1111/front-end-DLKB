import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { getProfileDoctorById } from '../../../services/userService';
import './ProfileDoctor.scss';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let id = this.props.doctorId;
        let data = await this.getInfoById(id);
        this.setState({
            dataProfile: data,
        });
    }

    getInfoById = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let id = this.props.doctorId;
            let data = await this.getInfoById(id);
            this.setState({
                dataProfile: data,
            });
        }
    }

    renderTimeBooking = (dataTime) => {
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
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.free-booking" />
                    </div>
                </>
            );
        }
        return <></>;
    };

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime, isShowPrince, isShowLinkDetail, doctorId } = this.props;
        let nameVi = '',
            nameEn = '';

        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        console.log(this.state);
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-left">
                        <div
                            className="avatar"
                            style={{
                                backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
                            }}
                        ></div>
                    </div>
                    <div className="content-right">
                        <div className="doctor-title">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div className="doctor-content">
                            {isShowDescriptionDoctor ? (
                                <React.Fragment>
                                    {dataProfile.Markdown && dataProfile.Markdown.description && (
                                        <span>{dataProfile.Markdown.description}</span>
                                    )}
                                </React.Fragment>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true && (
                    <div className="view-detail-doctor">
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                )}
                {isShowPrince === true && (
                    <div className="price">
                        <FormattedMessage id="patient.booking-modal.price" />
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ? (
                            <NumberFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            />
                        ) : (
                            ''
                        )}
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN ? (
                            <NumberFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
