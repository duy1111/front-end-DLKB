import {
    faBars,
    faBedPulse,
    faBriefcaseMedical,
    faHospital,
    faHospitalUser,
    faMagnifyingGlass,
    faMicroscope,
    faMobileAlt,
    faQuestionCircle,
    faSquarePlus,
    faTooth,
    faUserNurse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomeHeader.scss';
class HomeHeader extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className="icon-container">
                                <FontAwesomeIcon className="icon-menu" icon={faBars} />
                            </div>
                            <div className="logo-container">
                                <div className="header-logo"></div>
                            </div>
                        </div>
                        <div className="center-content">
                            <div className="center-content-item">
                                <div className="center-content-item__title">
                                    <b>Chuyên khoa</b>
                                </div>
                                <div className="center-content-item__content">Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className="center-content-item">
                                <div className="center-content-item__title">
                                    <b>Cơ sở y tế</b>
                                </div>
                                <div className="center-content-item__content">Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className="center-content-item">
                                <div className="center-content-item__title">
                                    <b>Bác sĩ</b>
                                </div>
                                <div className="center-content-item__content">Chọn bác sĩ giỏi</div>
                            </div>
                            <div className="center-content-item">
                                <div className="center-content-item__title">
                                    <b>Gói khám</b>
                                </div>
                                <div className="center-content-item__content">Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div>
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                Hỗ trợ
                            </div>
                            <div className="flag">VN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="search-home">
                        <div className="title1">NỀN TẢNG Y TẾ</div>
                        <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className="search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                            <input type="text" placeholder="Tìm chuyên khoa" />
                        </div>
                    </div>
                    <div className="options">
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faHospital} className="icon" />
                            </div>
                            <div className="text-child">Khám chuyên khoa</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faMobileAlt} className="icon" />
                            </div>
                            <div className="text-child">Khám từ xa</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faHospitalUser} className="icon" />
                            </div>
                            <div className="text-child">Khám tổng quát</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faMicroscope} className="icon" />
                            </div>
                            <div className="text-child">Xét nghiệm y học</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faUserNurse} className="icon" />
                            </div>
                            <div className="text-child">Sức khỏe tinh thần</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faTooth} className="icon" />
                            </div>
                            <div className="text-child">Khám nha khoa</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faBriefcaseMedical} className="icon" />
                            </div>
                            <div className="text-child">Gói phẫu thuật</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faBedPulse} className="icon" />
                            </div>
                            <div className="text-child">Sản phẩm y tế</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faSquarePlus} className="icon" />
                            </div>
                            <div className="text-child">Sức khỏe doanh nghiệp</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
