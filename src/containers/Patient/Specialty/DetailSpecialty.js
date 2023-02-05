import React, { Component } from 'react';
import { connect } from 'react-redux';
import DoctorSchedule from '../Doctor/DoctorSchedule';

import './DetailSpecialty.scss';
import HomeHeader from '../../../containers/HomePage/Header/HomeHeader';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyById(id, 'ALL');

            let resProvince = await getAllCodeService('PROVINCE');
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let dataProvince = resProvince.data;
                let result = [];
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        updatedAt: null,
                        valueEn: 'Nationwide',
                        valueVi: 'Toàn Quốc',
                    });
                    result = dataProvince;
                }
                let arrDoctorId = res.data.doctorSpecialty.map((item) => {
                    item.id = item.doctorId;
                    return item;
                });
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: res.data.doctorSpecialty,
                    listProvince: result,
                });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }
    createMarkup = (data) => {
        return {
            __html: data,
        };
    };

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getDetailSpecialtyById(id, location);

            if (res && res.errCode === 0) {
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: res.data.doctorSpecialty,
                });
            }
        }
    };

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        console.log('check arr doctor', arrDoctorId);
        let { language } = this.props;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="description-specialty">
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                        <div dangerouslySetInnerHTML={this.createMarkup(dataDetailSpecialty.descriptionHTML)} />
                    )}
                </div>
                <div className="search-sp-doctor">
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {listProvince &&
                            listProvince.length > 0 &&
                            listProvince.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                {arrDoctorId &&
                    arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, index) => {
                        return (
                            <div className="each-doctor-container" key={index}>
                                <div className="each-doctor">
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item.doctorId}
                                                isShowDescriptionDoctor={true}
                                                isShowPrince={false}
                                                isShowLinkDetail={true}
                                                //dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                detailDoctor={item}
                                                
                                            />
                                        </div>
                                        <div className="content-right-doctor-extra">
                                            <DoctorExtraInfor detailDoctor={item} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
