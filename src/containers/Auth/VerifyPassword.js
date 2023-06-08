import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postVerifyResetPassword } from '../../services/userService';
import './VerifyPassword.scss';
import HomeHeader from '../../containers/HomePage/Header/HomeHeader';

class VerifyPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let email = urlParams.get('email');
            let password = urlParams.get('password');
            let res = await postVerifyResetPassword({
                email: email,
                password: password,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <div className="email-container">
                    <HomeHeader isShowBanner={false} />
                    {statusVerify === false ? (
                        <div className="content-email">Loading data...</div>
                    ) : (
                        <div>
                            {+errCode === 0 ? (
                                <div className="content-email">Đổi password thành công!</div>
                            ) : (
                                <div className="content-email">Tài khoản không tồn tại!</div>
                            )}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPassword);
