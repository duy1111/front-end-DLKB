import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

class ModalEditUser extends Component {
    
    constructor(props) {
        
        super(props);
        this.state = {
            id:'',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
        };
        
        
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
        
    };
    checkValideInput = () =>{
        var isValid = true;
        let arrInput = ['email','firstName','lastName','address'];
        for(let i =0; i< arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                alert('Missing parameter: '+ arrInput[i])
                isValid = false;
                break;

            }

        }
        return isValid;
    }
    handleConfirmUser = () => {
        let isValid = this.checkValideInput();
        if(isValid){
            //call api
            this.props.editUser(this.state);
           
        }
        this.toggle()

    };
    async componentDidMount() {
        let user = await this.props.currentUser;
        console.log(user)
        if(user && !_.isEmpty(user)){
            this.setState({
                id:user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }

    render() {
        console.log('check render', this.props);

        return (
            <Modal className="modal-user-container" isOpen={this.props.isOpen} toggle={() => this.toggle()} size="xl">
                <ModalHeader toggle={() => this.toggle()}>Edit a user</ModalHeader>
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
                                disabled
                            ></input>
                        </div>
                        {/* <div className="input-container">
                            <label>password</label>
                            <input
                                type="password"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e, 'password');
                                }}
                                value={this.state.password}
                                disabled
                            ></input>
                        </div> */}
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
                    <Button color="primary" onClick={() => this.handleConfirmUser()}>
                        Confirm
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
