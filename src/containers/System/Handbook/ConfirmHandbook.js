import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ConfirmHandbook.scss';
import * as actions from '../../../store/actions';
import { getHandbookNotApprovedYet, postHandbookApprovedYet,deleteHandbook } from '../../../services/userService';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

class confirmHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHandbook: '',
        };
    }
    async componentDidMount() {
        let res = await getHandbookNotApprovedYet();
        if (res && res.errCode === 0) {
            this.setState({
                listHandbook: res.data,
            });
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {}
    confirmHandbook = async (item) => {
        let { user } = this.props;
        console.log('check item handbook', item);
        console.log('check item user', user);

        let res = await postHandbookApprovedYet({
            adminId: user.id,
            roleId: user.roleId,
            handbookId: item.id,
        });
        if (res && res.errCode === 0) {
            toast.success('confirm handbook succeed!');
            let FETCH = await getHandbookNotApprovedYet();
            if (FETCH && FETCH.errCode === 0) {
                this.setState({
                    listHandbook: FETCH.data,
                });
            }
        } else {
            toast.error('confirm handbook failed!');
        }
    };
    handleDeleteHandbook = async (handbook) => {
        console.log('check table handbook item',handbook)
        let res = await deleteHandbook(handbook.id);
        if (res && res.errCode === 0) {
            toast.success('Delete a handbook succeed!');
            let data = await getHandbookNotApprovedYet();
            if (data && data.errCode === 0) {
                this.setState({
                    listHandbook: data.data,
                });
            }
        } else {
            toast.error('Delete a new handbook failed!');
        }
    };
    render() {
        let arrHandbook = this.state.listHandbook;
        return (
            <>
                <table id="confirmHandbook">
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
                                        <button className="btn-handbook-edit" onClick={() => this.confirmHandbook(item)}>
                                            Xác nhận
                                        </button>
                                        <button className="btn-handbook-delete" onClick={() => this.handleDeleteHandbook(item)}>
                                            Hủy
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
    return {
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(confirmHandbook);
