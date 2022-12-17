import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import HomeHeader from './Header/HomeHeader';
import MedicalFacility from './Section/MedicalFacility';
import Specialty from './Section/Specialty';
import './HomePage.scss'
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import OutStandingDoctor from './Section/OutStandingDoctor';
import Handbook from './Section/Handbook';

class HomePage extends Component {
    render() {
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            
            <Fragment>
                <HomeHeader/>
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutStandingDoctor settings={settings} />
                <Handbook settings={settings} />
                <div style={{height:'300px'}} ></div>
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
