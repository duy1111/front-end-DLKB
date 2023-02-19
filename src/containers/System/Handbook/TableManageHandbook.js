import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageHandbook.scss';
import * as actions from '../../../store/actions';
import { getAllHandbook, deleteHandbook } from '../../../services/userService';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

class TableManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allHandbook: [],
        };
    }
    async componentDidMount() {
        let data = await getAllHandbook();
        if (data && data.errCode === 0) {
            this.setState({
                allHandbook: data.data,
            });
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.allHandbook !== this.state.allHandbook) {
            this.setState({
                allHandbook: this.state.allHandbook,
            });
        }
        console.log('check action', this.props.action);
        if (prevProps.action !== this.props.action) {
            let data = await getAllHandbook();
            if (data && data.errCode === 0) {
                this.setState({
                    allHandbook: data.data,
                });
            }
        }
    }
    handleDeleteHandbook = async (handbook) => {
        console.log('check table handbook item',handbook)
        let res = await deleteHandbook(handbook.id);
        if (res && res.errCode === 0) {
            toast.success('Delete a handbook succeed!');
            let data = await getAllHandbook();
            if (data && data.errCode === 0) {
                this.setState({
                    allHandbook: data.data,
                });
            }
        } else {
            toast.error('Delete a new handbook failed!');
        }
    };
    handleUpdateHandbook = (handbook) => {
        console.log('check table handbook item',handbook)
        this.props.handleEditFromParent(handbook);
    };
    render() {
        let arrHandbook = this.state.allHandbook;
        console.log('check all user table', this.state);
        return (
            <>
                <table id="TableManageHandbook">
                    <tr>
                        <th>STT</th>
                        <th>Name</th>

                        <th>Action</th>
                    </tr>
                    {arrHandbook &&
                        arrHandbook.length > 0 &&
                        arrHandbook.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>

                                    <td>
                                        <button className="btn-edit" onClick={() => this.handleUpdateHandbook(item)}>
                                            <FontAwesomeIcon icon={faPencil} />
                                        </button>
                                        <button className="btn-delete" onClick={() => this.handleDeleteHandbook(item)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHandbook);
