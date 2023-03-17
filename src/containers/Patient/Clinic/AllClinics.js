import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AllClinics.scss';
import { getAllClinic } from '../../../services/userService';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';

class AllClinics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
        };
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data,
            });
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeSelect = async (event) => {};
    handleToBack = () => {
        this.props.history.push(`/HOME`)

    };
    handleFocusItem = (clinic) => {
        this.props.history.push(`/detail-clinic/${clinic.id}`);
    };
    render() {
        let { dataClinics } = this.state;
        console.log('check clinic', dataClinics[0]);
        return (
            <div className="all-clinic-container">
                <div className="all-clinic-header">
                    <div className="icon-toBack" onClick={() => this.handleToBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className="title-clinic">Phòng khám</div>
                </div>
                <div className="content-container">
                    {dataClinics &&
                        dataClinics.length > 0 &&
                        dataClinics.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="all-clinic-content"
                                    onClick={() => this.handleFocusItem(item)}
                                >
                                    <div className="img-custom" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className="title-clinic-item">{item.name}</div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllClinics));
