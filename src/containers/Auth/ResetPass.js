import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {postResetPassword} from '../../services/userService';

import axios from 'axios';
import './Login.scss';

import LoadingOverlay from 'react-loading-overlay';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            isShowLoading: false,
            jwtToken: '',
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
    componentDidMount(){
      
    }
    handleResetPass = async () => {
        this.setState({
            errMessage: '',
            isShowLoading: true,
        });
        try {
            let data = await postResetPassword({email:this.state.username, password:this.state.password});
            console.log(data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
                  
                

            }
            if(data && data.errCode === 0){
                this.props.history.push(`/`)
                toast.success('Vui lòng kiểm tra email')
            }
            
            this.setState({
                isShowLoading: false,
            });
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
            
        }
    };

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleResetPass();
        }
    };
    render() {
        return (
            <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading...">
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row">
                            <div className="col-12 text-center text-login">reset password</div>
                            <div className="col-12 form-group login-input">
                                <label>Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={this.state.username}
                                    onChange={(e) => {
                                        this.handleOnChangeInput(e);
                                    }}
                                />
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>New Password</label>
                                <div className="custom-input-password">
                                    <input
                                        className="form-control"
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        placeholder="Enter your new password"
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
                                        this.handleResetPass();
                                    }}
                                >
                                    ResetPass
                                </button>
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
        jwtToken: state.user.jwtToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPass));
