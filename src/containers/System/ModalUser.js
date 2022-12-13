import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from '../../utils/emitter'
class ModalUser extends Component {
    
    constructor(props) {
        
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };
        this.listenToEmitter();
        
    }
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA',data =>{
            //console.log('listen emitter',data)
            this.setState = {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            };
        })
        //vue - bus event
    }
    toggle = () => {
        this.props.toggleFormParent();
    };
    handleOnChangeInput = (event, id) => {
        // console.log(event.target.value)
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
        console.log(copyState);
    };
    checkValideInput = () =>{
        var isValid = true;
        let arrInput = ['email','password','firstName','lastName','address'];
        for(let i =0; i< arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                alert('Missing parameter: '+ arrInput[i])
                isValid = false;
                break;

            }

        }
        return isValid;
    }
    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if(isValid){
            //call api
            this.props.createNewUser(this.state);
           
        }
        this.toggle()

    };
    componentDidMount() {
        
    }

    render() {
        //console.log('check render', this.props);

        return (
            <Modal className="modal-user-container" isOpen={this.props.isOpen} toggle={() => this.toggle()} size="xl">
                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-body-container">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="email"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e, 'email');
                                }}
                                value={this.state.email}
                            ></input>
                        </div>
                        <div className="input-container">
                            <label>password</label>
                            <input
                                type="password"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e, 'password');
                                }}
                                value={this.state.password}
                            ></input>
                        </div>
                        <div className="input-container">
                            <label>FirstName</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e, 'firstName');
                                }}
                                value={this.state.firstName}
                            ></input>
                        </div>
                        <div className="input-container">
                            <label>LastName</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e, 'lastName');
                                }}
                                value={this.state.lastName}
                            ></input>
                        </div>
                        <div className="input-container">
                            <label>address</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e, 'address');
                                }}
                                value={this.state.address}
                            ></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleAddNewUser()}>
                        Add new
                    </Button>{' '}
                    <Button color="secondary" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
