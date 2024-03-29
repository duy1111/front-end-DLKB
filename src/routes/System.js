import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

import UserRedux from '../containers/System/Admin/UserRedux';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import manageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManageHandbook from '../containers/System/Handbook/ManageHandbook';
import ConfirmHandbook from '../containers/System/Handbook/ConfirmHandbook';
class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        
                        <Route path="/system/user-redux" component={UserRedux} />
                        <Route path="/system/manage-doctor" component={ManageDoctor} />
                        <Route path="/system/manage-specialty" component={manageSpecialty} />
                        <Route path="/system/manage-clinic" component={ManageClinic} />
                        <Route path="/system/manage-handbook" component={ManageHandbook} />
                        <Route path="/system/confirm-handbook" component={ConfirmHandbook} />
                        

                        
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
