import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import handleLogin from '../../services/userService';
import * as actions from '../../store/actions';

import './Login.scss';
import { userLoginSuccess } from '../../store/actions';
import LoadingOverlay from 'react-loading-overlay';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            isShowLoading: false,
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
    handleLogin = async () => {
        this.setState({
            errMessage: '',
            isShowLoading: true,
        });
        try {
            let data = await handleLogin(this.state.username, this.state.password);
            console.log(data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                //todo
                this.props.userLoginSuccess(data.user);
                console.log('login success');
                this.setState({
                    isShowLoading: false,
                });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
            this.setState({
                isShowLoading: false,
            });
            console.log('loi', error);
        }
    };

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    };
    render() {
        return (
            <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading...">
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
                                        onKeyDown={(e) => this.handleKeyDown(e)}
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
                            <div className="col-12" style={{ color: 'red' }}>
                                {this.state.errMessage}
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
            </LoadingOverlay>
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

        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
