import React, { Component } from 'react';
import { connect } from 'react-redux';
import DoctorSchedule from '../Doctor/DoctorSchedule';

import './DetailSpecialty.scss';
import HomeHeader from '../../../containers/HomePage/Header/HomeHeader';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [{ id: 6 }, { id: 1 }, { id: 2 }, { id: 3 }],
        };
    }

    componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }

    render() {
        let { arrDoctorId } = this.state;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="description-specialty">hello</div>

                {arrDoctorId &&
                    arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, index) => {
                        return (
                            <div className="each-doctor-container" key={index}>
                                <div className="each-doctor">
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item.id}
                                                isShowDescriptionDoctor={true}
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
