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
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: [],
            isOpen: false,
        };
    }
    state = {};

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
            });
        }
    };
    openPreImage = () => {

        if (this.state.previewImgURL.length === 0){
            console.log('check length image',this.state.previewImgURL.length)
            return ;
        }
        this.setState({
            isOpen: true,
        });
        
    };
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let isOpen = this.state.isOpen;
        let language = this.props.language;
        let isLoadingGender = this.state.isLoadingGender;
        console.log('check state compoment', this.state);
        return (
            <div className="user-redux-container">
                <div className="title">User Redux with MXD</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <form>
                                <div className="row">
                                    <div className="col-md-12">Thêm mới người dùng</div>
                                    <div className="form-group col-md-6">
                                        <label for="inputEmail4">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="inputEmail4"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="inputPassword4">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="inputPassword4"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label for="">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputEmail4"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="">Last Name</label>
                                        <input type="text" className="form-control" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-8">
                                        <label for="inputAddress">Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputAddress"
                                            placeholder="1234 Main St"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label for="">Phone Number</label>
                                        <input type="number" className="form-control" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-3">
                                        <label for="inputPosition">Position</label>
                                        <select id="inputPosition" className="form-control">
                                            <option selected>Choose...</option>
                                            {positions &&
                                                positions.length > 0 &&
                                                positions.map((item, index) => {
                                                    return (
                                                        <option key={index}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="inputState">Gender</label>
                                        <select id="inputState" className="form-control">
                                            <option selected>Choose...</option>
                                            {genders &&
                                                genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option key={index}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="inputRole">RoleId</label>
                                        <select id="inputRole" className="form-control">
                                            <option selected>Choose...</option>
                                            {roles &&
                                                roles.length > 0 &&
                                                roles.map((item, index) => {
                                                    return (
                                                        <option key={index}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="inputZip">Image</label>
                                        <div className="previewImg-container">
                                            <input
                                                id="previewImg"
                                                type="file"
                                                hidden
                                                onChange={(event) => this.handleOnChangeImage(event)}
                                            />
                                            <label className="label-upload" htmlFor="previewImg">
                                                Tải ảnh <FontAwesomeIcon icon={faUpload} />
                                            </label>
                                            <div
                                                className="preview-img"
                                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                onClick={() => this.openPreImage()}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        <label className="form-check-label" for="gridCheck">
                                            Check me out
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Sign in
                                </button>
                            </form>
                        </div>
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
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
