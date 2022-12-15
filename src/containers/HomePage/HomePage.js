import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import HomeHeader from './Header/HomeHeader';
class HomePage extends Component {
    render() {
        
        return (
            
            <Fragment>
                <HomeHeader/>
               
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
