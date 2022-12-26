import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import * as actions from '../../../store/actions'

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
        };
    }
    state = {};

    async componentDidMount() {
        this.props.getGenderStart();

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
    componentDidUpdate(prevProps, prevState, snapshot){
        //so sanh hien tai vs qua khu de render
        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }
    render() {
        let genders = this.state.genderArr;
        console.log('check gender',this.props.genderRedux);
        // let genderRedux  = this.props.genderRedux;
        let language  = this.props.language;
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
                                        <label for="inputCity">Position</label>
                                        <input type="text" className="form-control" id="inputCity" />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="inputState">Gender</label>
                                        <select id="inputState" className="form-control">
                                            <option selected>Choose...</option>
                                            {genders &&
                                                genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return <option key={index} >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>;
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="inputZip">RoleId</label>
                                        <input type="text" className="form-control" id="inputZip" />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="inputZip">Image</label>
                                        <input type="text" className="form-control" id="inputZip" />
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
