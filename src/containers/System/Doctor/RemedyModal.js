import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { CommonUtils } from '../../../utils';
import './RemedyModal.scss';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            imgBase64:''
        };
    }

    componentDidMount() {
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email,

            })
        }
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            
            this.setState({
                imgBase64:base64
            });
        }
    };
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
        let { isOpenModal, dataModal, closeRemedyModal } = this.props;

        return (
            // toggle={}
            <Modal isOpen={isOpenModal} className={'booking-modal-container'} size="md" centered>
                <ModalHeader toggle={closeRemedyModal}>Gửi hóa đơn khám bệnh thành công</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Email bệnh nhân</label>
                            <input className="form-control" onChange={(event) => this.handleOnChangeEmail(event)}  type="email" value={ this.state.email} />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn hóa đơn</label>
                            <input className="form-control-file" onChange={(event) => this.handleOnChangeImage(event)} type="file" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>
                        Send
                    </Button>{' '}
                    <Button color="secondary" onClick={closeRemedyModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
