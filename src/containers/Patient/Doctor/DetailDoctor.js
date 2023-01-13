import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../../containers/HomePage/Header/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInfoDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInfoDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                });
            }
            console.log(res);
        }
    }

    createMarkup = (data) => {
        return {
            __html: data,
        };
    };
    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { detailDoctor } = this.state;
        let nameVi = '',
            nameEn = '';
        let { language } = this.props;
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        console.log('check state', this.state);
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor-container">
                        <div className="intro-doctor">
                            <div className="content-left">
                                <div
                                    className="avatar"
                                    style={{
                                        backgroundImage: `url(${
                                            detailDoctor && detailDoctor.image ? detailDoctor.image : ''
                                        })`,
                                    }}
                                ></div>
                            </div>
                            <div className="content-right">
                                <div className="doctor-title">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                <div className="doctor-content">
                                    {detailDoctor.Markdown && detailDoctor.Markdown.description && (
                                        <span>{detailDoctor.Markdown.description}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule
                                detailDoctor={detailDoctor}
                            />
                        </div>
                        <div className="content-right"></div>
                    </div>
                    <div className="detail-info-doctor-container">
                        <div className="detail-info-doctor">
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
                                <div dangerouslySetInnerHTML={this.createMarkup(detailDoctor.Markdown.contentHTML)} />
                            )}
                        </div>
                    </div>
                    <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
