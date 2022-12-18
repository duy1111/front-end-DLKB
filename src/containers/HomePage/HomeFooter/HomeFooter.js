//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {} from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <div className="footer-content">
                    <div className="info-footer">
                        <span>&copy; 2022 maixuanduy0605@gmail.com</span>
                    </div>
                    <div className="icon-footer">
                        <i className="fab fa-facebook fb"></i>
                        <i className="fab fa-google gg"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        isLoggedIn: state.user.isLoggedIn,
        //language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
