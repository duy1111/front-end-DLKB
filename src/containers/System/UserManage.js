import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser } from '../../services/userService';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
        };
    }

    async componentDidMount() {
        let response = await getAllUser('');
        if (response && response.errCode === 0) {
            await this.setState({
                arrUser: response.users,
            });
            console.log('data get all user', this.state.arrUser);
        }
    }

    render() {
        let arrUsers = this.state.arrUser;
        console.log('check render', arrUsers);
        return (
            <div className="user-container">
                <div className="title text-center">Manage user with Duy</div>
                <div className="user-table mt-4 mx-3">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.LastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' ><FontAwesomeIcon icon={faPencil} /></button>
                                            <button className='btn-delete' ><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
