
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';

import './RemedyModal.scss';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
       
    }

    render() {
        
        
        
        return (
            // toggle={}
            <Modal isOpen={true} className={'booking-modal-container'} size="md" centered>
                <div>hello world</div>
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
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
