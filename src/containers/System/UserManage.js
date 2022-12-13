import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser,createNewUserService } from '../../services/userService';
import {  faPencil, faPlus,  faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalUser from './ModalUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        await this.getAllUsersFormReact()
    }
    getAllUsersFormReact = async() =>{
        let response = await getAllUser('');
        if (response && response.errCode === 0) {
            await this.setState({
                arrUser: response.users,
            });
            console.log('data get all user', this.state.arrUser);
        }
    }

    handleAddNewUser = ( ) =>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
      
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    };

    createNewUser = async(data) => {
        try{

            let response = await createNewUserService(data)
            if(response&&response.errCode!==0){
                alert(response.message)
            }else{
                await this.getAllUsersFormReact()
                this.setState({
                    isOpenModalUser :false
                })
            }
            
        }catch(e){
            console.log(e)
        }
        console.log('check data ',data)
    }
    render() {
        let arrUsers = this.state.arrUser;
        
        
        return (
            <div className="user-container">
                <ModalUser 
                    toggleFormParent = {this.toggleUserModal} 
                    isOpen={this.state.isOpenModalUser}
                    createNewUser = {this.createNewUser}
                />
                <div className="title text-center">Manage user with Duy</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()} ><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>Add new User</button>
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
