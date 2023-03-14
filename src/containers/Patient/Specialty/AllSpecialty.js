import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AllSpecialty.scss';
import { getAllSpecialty } from '../../../services/userService';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';

class AllSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data,
            });
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeSelect = async (event) => {};
    handleToBack = () => {
        this.props.history.push(`/HOME`)

    };
    handleFocusItem = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`);
    };
    render() {
        let { dataSpecialty } = this.state;
        console.log('check specialty', dataSpecialty[0]);
        return (
            <div className="all-specialty-container">
                <div className="all-specialty-header">
                    <div className="icon-toBack" onClick={() => this.handleToBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className="title-specialty">Chuyên khoa</div>
                </div>
                <div className="content-container">
                    {dataSpecialty &&
                        dataSpecialty.length > 0 &&
                        dataSpecialty.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="all-specialty-content"
                                    onClick={() => this.handleFocusItem(item)}
                                >
                                    <div className="img-custom" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className="title-specialty-item">{item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllSpecialty));
