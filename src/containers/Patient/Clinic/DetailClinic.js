import React, { Component } from 'react';
import { connect } from 'react-redux';
import DoctorSchedule from '../Doctor/DoctorSchedule';

import './DetailClinic.scss';
import HomeHeader from '../../HomePage/Header/HomeHeader';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            listProvince: [],
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            console.log('check iddddd', id);
            let res = await getDetailClinicById(id);

            console.log('check res clinic', res);
            if (res && res.errCode === 0) {
                let result = [];

                let arrDoctorId = res.data.doctorClinic.map((item) => {
                    item.id = item.doctorId;
                    return item;
                });

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: res.data.doctorClinic,
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

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        console.log('check arr dataDetailClinic image', dataDetailClinic.image);
        let { language } = this.props;
        return (
            <div className="detail-clinic-container">
                <HomeHeader />

                <div className="intro-clinic-container">
                    <div className="intro-clinic">
                        <div className="content-left-clinic">
                            <div
                                className="avatar"
                                style={{
                                    backgroundImage: `url(${
                                        dataDetailClinic && dataDetailClinic.image ? dataDetailClinic.image : ''
                                    })`,
                                }}
                            ></div>
                        </div>
                        <div className="content-right-clinic">
                            <div className="clinic-title">{dataDetailClinic.name}</div>
                            <div className="clinic-content"></div>
                        </div>
                    </div>
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
                                            <DoctorSchedule detailDoctor={item} />
                                        </div>
                                        <div className="content-right-doctor-extra">
                                            <DoctorExtraInfor detailDoctor={item} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                <div className="description-clinic">
                    {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                        <div dangerouslySetInnerHTML={this.createMarkup(dataDetailClinic.descriptionHTML)} />
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
