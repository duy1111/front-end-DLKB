import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageSpecialty.scss';
import * as actions from '../../../store/actions';
import { getAllSpecialty, deleteASpecialty } from '../../../services/userService';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

class TableManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSpecialty: [],
        };
    }
    async componentDidMount() {
        let data = await getAllSpecialty();
        if (data && data.errCode === 0) {
            this.setState({
                allSpecialty: data.data,
            });
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.allSpecialty !== this.state.allSpecialty) {
            this.setState({
                allSpecialty: this.state.allSpecialty,
            });
        }
        console.log('check action', this.props.action);
        if (prevProps.action !== this.props.action) {
            let data = await getAllSpecialty();
            if (data && data.errCode === 0) {
                this.setState({
                    allSpecialty: data.data,
                });
            }
        }
    }
    handleDeleteSpecialty = async (specialty) => {
        let res = await deleteASpecialty(specialty.id);
        if (res && res.errCode === 0) {
            toast.success('Delete a specialty succeed!');
            let data = await getAllSpecialty();
            if (data && data.errCode === 0) {
                this.setState({
                    allSpecialty: data.data,
                });
            }
        } else {
            toast.error('Created a new specialty failed!');
        }
    };
    handleUpdateSpecialty = (specialty) => {
        this.props.handleEditFromParent(specialty);
    };
    render() {
        let arrSpecialty = this.state.allSpecialty;
        console.log('check all user table', this.state);
        return (
            <>
                <table id="TableManageSpecialty">
                    <tr>
                        <th>STT</th>
                        <th>Name</th>

                        <th>Action</th>
                    </tr>
                    {arrSpecialty &&
                        arrSpecialty.length > 0 &&
                        arrSpecialty.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>

                                    <td>
                                        <button className="btn-edit" onClick={() => this.handleUpdateSpecialty(item)}>
                                            <FontAwesomeIcon icon={faPencil} />
                                        </button>
                                        <button className="btn-delete" onClick={() => this.handleDeleteSpecialty(item)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
