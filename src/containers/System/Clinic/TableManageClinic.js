import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageClinic.scss';
import * as actions from '../../../store/actions';
import { getAllClinic, deleteAClinic } from '../../../services/userService';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

class TableManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allClinics: [],
        };
    }
    async componentDidMount() {
        let data = await getAllClinic();
        if (data && data.errCode === 0) {
            this.setState({
                allClinics: data.data,
            });
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.allClinics !== this.state.allClinics) {
            this.setState({
                allClinics: this.state.allClinics,
            });
        }
        console.log('check action', this.props.action);
        if (prevProps.action !== this.props.action) {
            let data = await getAllClinic();
            if (data && data.errCode === 0) {
                this.setState({
                    allClinics: data.data,
                });
            }
        }
    }
    handleDeleteUser = async (clinic) => {
        let res = await deleteAClinic(clinic.id);
        if (res && res.errCode === 0) {
            toast.success('Delete a clinic succeed!');
            let data = await getAllClinic();
            if (data && data.errCode === 0) {
                this.setState({
                    allClinics: data.data,
                });
            }
        } else {
            toast.error('Created a new clinic failed!');
        }
    };
    handleUpdateUser = (clinic) => {
        this.props.handleEditFromParent(clinic);
    };
    render() {
        let arrClinics = this.state.allClinics;
        console.log('check all user table', this.state);
        return (
            <>
                <table id="TableManageClinic">
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {arrClinics &&
                        arrClinics.length > 0 &&
                        arrClinics.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => this.handleUpdateUser(item)}>
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
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
