import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            let topDoctors = this.props.topDoctorsRedux;
            this.setState({
                arrDoctors: topDoctors,
            });
        }
    }
    handleViewDetailDoctor = (doctor) => {
        console.log('check doctor detail',doctor)
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    };
    render() {
        let allDoctors = this.state.arrDoctors;
        console.log('check state outs',allDoctors)
        let language = this.props.language;
        // console.log('check language',this.props.language)
        return (
           
            <div className="section-share section-outstandingDoctor">
                <div className="section-content">
                    <div className="section-header">
                        <span className="Popular-section">
                            <FormattedMessage id="home-page.outstanding-doctor" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="home-page.more-info" />
                        </button>
                    </div>
                    <Slider {...this.props.settings}>
                        {allDoctors &&
                            allDoctors.length > 0 &&
                            allDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }

                                let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div
                                        className="section-body"
                                        key={index}
                                        onClick={() => this.handleViewDetailDoctor(item)}
                                    >
                                        <div className="outer-bg">
                                            <div
                                                className="img-custom"
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            ></div>
                                        </div>
                                        <div className="position text-center">
                                            <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            <div>chữa chó béo</div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,

        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: (limit) => dispatch(actions.fetchTopDoctor(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
