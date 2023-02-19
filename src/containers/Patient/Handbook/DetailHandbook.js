import React, { Component } from 'react';
import { connect } from 'react-redux';
import DoctorSchedule from '../Doctor/DoctorSchedule';

import './DetailHandbook.scss';
import HomeHeader from '../../HomePage/Header/HomeHeader';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailHandbookById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
class DetailHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandbook: {},
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            console.log('check iddddd', id);
            let res = await getDetailHandbookById(id);

            console.log('check res handbook', res);
            if (res && res.errCode === 0) {
                let result = [];

                this.setState({
                    dataDetailHandbook: res.data,
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
        let { dataDetailHandbook } = this.state;
        console.log('check arr dataDetailHandbook image', dataDetailHandbook.image);
        let { language } = this.props;
        let nameVi = '',
            nameEn = '';

        if (dataDetailHandbook && dataDetailHandbook.adminHandbook) {
            nameVi = `${dataDetailHandbook.adminHandbook.firstName} ${dataDetailHandbook.adminHandbook.lastName}`;
            nameEn = `${dataDetailHandbook.adminHandbook.firstName} ${dataDetailHandbook.adminHandbook.lastName}`;
        }
        let nameDoctorVi = '',
            nameDoctorEn = '';
        if (dataDetailHandbook && dataDetailHandbook.doctorHandbook) {
            nameDoctorVi = `${dataDetailHandbook.doctorHandbook.positionData.valueVi}, ${dataDetailHandbook.doctorHandbook.firstName} ${dataDetailHandbook.doctorHandbook.lastName}`;
            nameDoctorEn = `${dataDetailHandbook.doctorHandbook.positionData.valueEn}, ${dataDetailHandbook.doctorHandbook.firstName} ${dataDetailHandbook.doctorHandbook.lastName}`;
        }
        return (
            <div className="detail-handbook-container">
                <HomeHeader />

                <div className="intro-handbook-container">
                    <div className="intro-handbook">
                        <div className="content-left-handbook">
                            <div
                                className="avatar"
                                style={{
                                    backgroundImage: `url(${
                                        dataDetailHandbook && dataDetailHandbook.image ? dataDetailHandbook.image : ''
                                    })`,
                                }}
                            ></div>
                        </div>
                        <div className="content-right-handbook">
                            <div className="handbook-title">{dataDetailHandbook.name}</div>
                            <div className="handbook-content container">
                                <div className="row">
                                    <div className="col-12 handbook-content-item">
                                        <span>
                                            Sản phẩm của <a>BookingCare</a>
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 handbook-content-item">Ngày xuất bản: {dataDetailHandbook.createdAt}</div>
                                    <div className="col-4 handbook-content-item">Cập nhật lần cuối: {dataDetailHandbook.updatedAt}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4 handbook-content-item">
                                        Người kiểm duyệt: {language === LANGUAGES.VI ? nameVi : nameEn}
                                    </div>
                                    <div className="col-4 handbook-content-item">
                                        Bác sĩ đăng bài: {language === LANGUAGES.VI ? nameDoctorVi : nameDoctorEn}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="description-handbook">
                    {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) && (
                        <div dangerouslySetInnerHTML={this.createMarkup(dataDetailHandbook.contentHTML)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
