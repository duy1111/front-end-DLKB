import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';
import { LANGUAGES, formatVietnameseToEnglish } from '../../../utils';
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data,
            });
        }
    }
    handleViewDetailSpecialty = (specialty) => {
        
        this.props.history.push(`/detail-specialty/${specialty.id}`)
    };
    viewMoreInfo = () => {
        this.props.history.push(`/all-specialty`)
    }
    render() {
        let { dataSpecialty } = this.state;
        let language = this.props.language
        return (
            <div className="section-share section-specialty">
                <div className="section-content">
                    <div className="section-header">
                        <span className="Popular-section">
                            <FormattedMessage id="home-page.speciality-poplular" />
                        </span>
                        <button className="btn-section" onClick={() => this.viewMoreInfo()}>
                            <FormattedMessage id="home-page.more-info" />
                        </button>
                    </div>
                    <Slider {...this.props.settings}>
                        {dataSpecialty &&
                            dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div
                                        className="section-body"
                                        key={index}
                                        onClick={() => this.handleViewDetailSpecialty(item)}
                                    >
                                        <div
                                            className="img-custom"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div>{language === LANGUAGES.VI ? item.name : formatVietnameseToEnglish(item.name)}</div>
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
    //console.log(state)
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
