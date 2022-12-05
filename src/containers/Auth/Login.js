import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';

import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'duymai',
            password: '123456',
            isShowPassword: false,
        };
    }
    handleOnChangeInput = (e) => {
        this.setState({
            username: e.target.value,
        });
    };
    handleOnChangePass = (e) => {
        this.setState({
            password: e.target.value,
        });
    };
    handleLogin = () => {};

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(e) => {
                                    this.handleOnChangeInput(e);
                                }}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className="custom-input-password">
                                <input
                                    className="form-control"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangePass(e)}
                                />
                                <span onClick={() => this.handleShowPassword()}>
                                    {this.state.isShowPassword ? (
                                        <i class="fas fa-eye-slash icon-eye"></i>
                                    ) : (
                                        <i class="fas fa-eye icon-eye "></i>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="col-12 ">
                            <button
                                className="btn-login"
                                onClick={() => {
                                    this.handleLogin();
                                }}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span>Forgot your password</span>
                        </div>
                        <div className="col-12 text-center mt-2">
                            <span className="login-with">of login with:</span>
                        </div>
                        <div className="col-12 social-login text-center">
                            <i className="fab fa-facebook gg-login"></i>
                            <i className="fab fa-google fb-login"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
