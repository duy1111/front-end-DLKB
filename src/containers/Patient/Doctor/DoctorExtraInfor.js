import React, { Component } from 'react';
import { connect } from 'react-redux';

import './DoctorExtraInfor.scss';
import { getExtraInfoDoctorById } from '../../../services/userService';

import { LANGUAGES } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {},
        };
    }

    async componentDidMount() {
        let { detailDoctor } = this.props;
        let id = detailDoctor.id;
        if (detailDoctor) {
            let res = await getExtraInfoDoctorById(id);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let { language } = this.props;
        let { detailDoctor } = this.props;
        if (detailDoctor && prevProps.detailDoctor.id !== this.props.detailDoctor.id) {
            let id = detailDoctor.id ? detailDoctor.id :detailDoctor.doctorId;

            let res = await getExtraInfoDoctorById(id);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data,
                });
            }
        }
    }

    showHideDetailInfo = (id) => {
        this.setState({
            isShowDetailInfo: !this.state.isShowDetailInfo,
        });
    };

    render() {
        let { isShowDetailInfo, extraInfo } = this.state;
        let { language } = this.props;

        return (
            <div className="doctor-extraInfo-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-info-doctor.text-address" />
                    </div>
                    <div className="name-clinic">
                        <b>{extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}</b>
                    </div>
                    <div className="detail-address">
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfo === false ? (
                        <div>
                            <FormattedMessage id="patient.extra-info-doctor.price" />{' '}
                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI && (
                                <NumberFormat
                                    value={extraInfo.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            )}
                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN && (
                                <NumberFormat
                                    value={extraInfo.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            )}
                            .
                            <span className="click-show" onClick={() => this.showHideDetailInfo()}>
                                <FormattedMessage id="patient.extra-info-doctor.detail" />
                            </span>
                        </div>
                    ) : (
                        <>
                            <div className="title-price">
                                <FormattedMessage id="patient.extra-info-doctor.price" />.
                            </div>
                            <div className="detail-price">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="patient.extra-info-doctor.price" />
                                    </span>
                                    <span className="right">
                                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI && (
                                            <NumberFormat
                                                value={extraInfo.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        )}
                                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN && (
                                            <NumberFormat
                                                value={extraInfo.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        )}
                                    </span>
                                </div>
                                <div className="note">{extraInfo && extraInfo.note ? extraInfo.note : ''}</div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id="patient.extra-info-doctor.payment" />{' '}
                                {extraInfo &&
                                    extraInfo.paymentTypeData &&
                                    language === LANGUAGES.VI &&
                                    extraInfo.paymentTypeData.valueVi}
                                {extraInfo &&
                                    extraInfo.paymentTypeData &&
                                    language === LANGUAGES.EN &&
                                    extraInfo.paymentTypeData.valueEn}
                            </div>

                            <div className="click-show">
                                <span onClick={() => this.showHideDetailInfo()}>
                                    <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
