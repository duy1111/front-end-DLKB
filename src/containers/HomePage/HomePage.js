import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import HomeHeader from './Header/HomeHeader';
import MedicalFacility from './Section/MedicalFacility';
import Specialty from './Section/Specialty';
import './HomePage.scss';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import OutStandingDoctor from './Section/OutStandingDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import HomeFooter from './HomeFooter/HomeFooter';

class HomePage extends Component {
    // handleAfterChange = (event,slick,currentSlide) =>{

    // }
    render() {
        let settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
            // afterChange:this.handleAfterChange
        };
        return (
            <Fragment>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutStandingDoctor settings={settings} />
                <Handbook settings={settings} />
                <About />
                <div style={{ height: '300px' }}></div>
                <HomeFooter />
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
