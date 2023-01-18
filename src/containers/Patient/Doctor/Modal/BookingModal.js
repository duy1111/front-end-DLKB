import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import './BookingModal.scss';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        
        return (
            // toggle={}
            <Modal isOpen={isOpenModal} className={'booking-modal-container'} size="lg" centered>
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">Thông tin đặt lịch khám bệnh</span>
                        <span className="right" onClick={closeBookingClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={dataTime && dataTime.doctorId ? dataTime.doctorId : ''}
                            />
                        </div>
                        
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ email</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Đặt cho ai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <input className='form-control' />
                            </div>
                        </div>
                        <div className='row'>
                            
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm">Xác nhận</button>
                        <button className="btn-booking-cancel" onClick={closeBookingClose}>
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
