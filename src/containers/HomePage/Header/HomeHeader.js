import {
    faBars,
    faBedPulse,
    faBriefcaseMedical,
    faGlobeEurope,
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
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import Tippy from '@tippyjs/react/headless';
import {LANGUAGES} from '../../../utils';
import { changeLanguageApp } from '../../../store/actions/appActions'
class HomeHeader extends Component {

    changeLanguage = (language) => {
        
        //fire redux event : actions
        this.props.changeLanguageAppRedux(language)

    }
    render() {
        let language = this.props.language
        console.log('check props', this.props);
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
                                    <b>
                                        <FormattedMessage id="homeHeader.speciality" />
                                    </b>
                                </div>
                                <div className="center-content-item__content">
                                    <FormattedMessage id="homeHeader.search-doctor" />
                                </div>
                            </div>
                            <div className="center-content-item">
                                <div className="center-content-item__title">
                                    <b>
                                        <FormattedMessage id="homeHeader.Health-facility" />
                                    </b>
                                </div>
                                <div className="center-content-item__content">
                                    <FormattedMessage id="homeHeader.select-room" />
                                </div>
                            </div>
                            <div className="center-content-item">
                                <div className="center-content-item__title">
                                    <b>
                                        <FormattedMessage id="homeHeader.doctor" />
                                    </b>
                                </div>
                                <div className="center-content-item__content">
                                    <FormattedMessage id="homeHeader.select-doctor" />
                                </div>
                            </div>
                            <div className="center-content-item">
                                <div className="center-content-item__title">
                                    <b>
                                        <FormattedMessage id="homeHeader.fee" />
                                    </b>
                                </div>
                                <div className="center-content-item__content">
                                    <FormattedMessage id="homeHeader.check-healthy" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="right-content-support">
                                <FontAwesomeIcon className="icon" icon={faQuestionCircle} />
                                <FormattedMessage className="text" id="homeHeader.support" />
                            </div>

                            <Tippy
                                interactive 
                                delay={[600, 800]}
                                offset={[12, 0]}
                                hideOnClick= 'true'
                                placement="bottom"
                                render={(attrs) => (
                                    <div className="box-Tippy"  {...attrs}>
                                        <div className='item1' onClick={() => this.changeLanguage(LANGUAGES.VI)} >Việt Nam</div>
                                        <div className='item2' onClick={() => this.changeLanguage(LANGUAGES.EN)} >England</div>
                                    </div>
                                )}
                            >
                                <div className="language">
                                    <FontAwesomeIcon className="icon-global" icon={faGlobeEurope} />
                                    <span className="split"></span>
                                    <div className='text' >{language}</div>
                                </div>
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="search-home">
                        <div className="title1">
                            <FormattedMessage id="banner.title1" />
                        </div>
                        <div className="title2">
                            <FormattedMessage id="banner.title2" />
                        </div>
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
                            <div className="text-child">
                                <FormattedMessage id="banner.Specialized-examination" />
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faMobileAlt} className="icon" />
                            </div>
                            <div className="text-child">
                                <FormattedMessage id="banner.Remote-examination" />
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faHospitalUser} className="icon" />
                            </div>
                            <div className="text-child">
                                <FormattedMessage id="banner.General-examination" />
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faMicroscope} className="icon" />
                            </div>
                            <div className="text-child">
                                <FormattedMessage id="banner.Medical-test" />
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faUserNurse} className="icon" />
                            </div>
                            <div className="text-child">
                                <FormattedMessage id="banner.Mental-health" />
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faTooth} className="icon" />
                            </div>
                            <div className="text-child">
                                <FormattedMessage id="banner.Dental-examination" />
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faBriefcaseMedical} className="icon" />
                            </div>
                            <div className="text-child">
                                <FormattedMessage id="banner.Surgery-pack" />
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faBedPulse} className="icon" />
                            </div>
                            <div className="text-child">
                                <FormattedMessage id="banner.Medical-products" />
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faSquarePlus} className="icon" />
                            </div>
                            <div className="text-child">
                                <FormattedMessage id="banner.Corporate-health" />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
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
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
