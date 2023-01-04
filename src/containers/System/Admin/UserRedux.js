import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: [],
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        };
    }

    async componentDidMount() {
        //used connect to react-redux
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        //this.props.dispatch(actions.fetchGenderStart())
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        //     console.log('check res', res);
        // } catch (e) {
        //     console(e);
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //so sanh hien tai vs qua khu de render
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
            });
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
            });
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
            });
        }
    }
    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: file,
            });
        }
    };
    openPreImage = () => {
        if (this.state.previewImgURL.length === 0) {
            console.log('check length image', this.state.previewImgURL.length);
            return;
        }
        this.setState({
            isOpen: true,
        });
    };
    handleSaveUser = () => {
        let isValid = this.checkValueInput();
        if (isValid === true) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                phoneNumber: this.state.phoneNumber,
            });
        } else {
        }

        //fire redux action
    };
    checkValueInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState,
        });
    };
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let isOpen = this.state.isOpen;
        let language = this.props.language;
        let isLoadingGender = this.state.isLoadingGender;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;

        return (
            <div className="user-redux-container">
                <div className="title">User Redux with MXD</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <FormattedMessage id="manage-user.add-new-user" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputEmail4">
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputPassword4">
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label for="">
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="">
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-8">
                                <label for="inputAddress">
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label for="">
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-3">
                                <label for="inputPosition">
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    id="inputPosition"
                                    className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'position')}
                                >
                                    <option selected>Choose...</option>
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="inputGender">
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    id="inputGender"
                                    className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'gender')}
                                >
                                    <option selected>Choose...</option>
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="inputRole">
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    id="inputRole"
                                    className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'role')}
                                >
                                    <option selected>Choose...</option>
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="inputZip">
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="previewImg-container">
                                    <input
                                        id="previewImg"
                                        type="file"
                                        hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <label className="label-upload" htmlFor="previewImg">
                                        <FormattedMessage id="manage-user.upload-image" />{' '}
                                        <FontAwesomeIcon icon={faUpload} />
                                    </label>
                                    <div
                                        className="preview-img"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreImage()}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary col-md-1" onClick={() => this.handleSaveUser()}>
                            <FormattedMessage id="manage-user.save" />
                        </button>

                        <TableManageUser col-md-12 mt-6 />
                    </div>
                </div>

                {isOpen && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
