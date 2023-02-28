import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser, createNewUserService, deleteNewUserService,editUserService } from '../../services/userService';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        await this.getAllUsersFormReact();
    }
    getAllUsersFormReact = async () => {
        let response = await getAllUser('',this.props.jwtToken);
        if (response && response.errCode === 0) {
            await this.setState({
                arrUser: response.users,
            });
            console.log('data get all user', this.state.arrUser);
        }
    };

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUsersFormReact();
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { id: 'your id' });
            }
        } catch (e) {
            console.log(e);
        }
        //console.log('check data ',data)
    };
    handleDeleteUser = async (item) => {
        try {
            console.log('check', item);
            let response = await deleteNewUserService(item.id);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUsersFormReact();
            }
        } catch (e) {
            console.log(e);
        }
    };
    handleEditUser = (item) => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
            userEdit: item,
        });
    };

    doEditUser = async(user) =>{
        try {
            console.log('check', user);
            let response = await editUserService(user);
            console.log(response)
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUsersFormReact();
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrUsers = this.state.arrUser;

        return (
            <div className="user-container">
                <ModalUser
                    toggleFormParent={this.toggleUserModal}
                    isOpen={this.state.isOpenModalUser}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser && (
                    <ModalEditUser
                        toggleFormParent={this.toggleUserEditModal}
                        isOpen={this.state.isOpenModalEditUser}
                        currentUser={this.state.userEdit}
                        editUser = {this.doEditUser}
                    />
                )}
                <div className="title text-center">Manage user with Duy</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}>
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Add new User
                    </button>
                </div>
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
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                                                <FontAwesomeIcon icon={faPencil} />
                                            </button>
                                            <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
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
    return {
        jwtToken: state.user.jwtToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
