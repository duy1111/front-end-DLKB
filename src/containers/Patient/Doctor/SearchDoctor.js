import { faArrowLeft, faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSearchDoctor } from '../../../services/userService';
import './SearchDoctor.scss';
import { withRouter } from 'react-router';

class SearchDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            searchResult: [],

            loading: false,
        };
    }

    async componentDidMount() {
        let res = await getSearchDoctor('');
        if (res && res.errCode === 0) {
            this.setState({
                searchResult: res.data,
            });
        }
    }

    handleSearchChange = async (e) => {
        let name = this.state.searchValue;
        let res = await getSearchDoctor(name);
        if (res && res.errCode === 0) {
            this.setState({
                searchResult: res.data,
            });
        }
    };
    handleClear = () => {
        this.setState({
            searchValue: '',
        });
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        console.log('check on change', copyState);
        this.setState({
            ...copyState,
        });
    };
    handleToBack = () => {
        this.props.history.push(`/HOME`);
    };
    handleFocusItem = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };
    render() {
        let { searchValue, loading, searchResult } = this.state;
        console.log('check search state', this.state);
        return (
            <div className="Search-doctor-container">
                <div className="Search-doctor-header">
                    <div className="icon-toBack" onClick={() => this.handleToBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className="Search-content-container">
                        <input
                            value={searchValue}
                            placeholder="Search doctor"
                            spellCheck={false}
                            onChange={(event) => this.onChangeInput(event, 'searchValue')}
                        />
                        {!!searchValue && (
                            <button className="clear" onClick={this.handleClear}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}

                        <button
                            className="search-btn"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => this.handleSearchChange()}
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
                <div className="doctor-item-container">
                    <div className="doctor-item-header">
                        <h3>Các bác sĩ nổi bật</h3>
                    </div>
                    <div className="doctor-item">
                        {searchResult &&
                            searchResult.length > 0 &&
                            searchResult.map((item, index) => {
                                let name = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div
                                        key={index}
                                        className="doctor-item-content"
                                        onClick={() => this.handleFocusItem(item)}
                                    >
                                        <div className="img-custom-container">
                                            <div
                                                className="img-custom"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                        </div>
                                        <div className="doctor-item-description">
                                            <div
                                                className="doctor-item-name"
                                                onClick={() => this.handleFocusItem(item)}
                                            >
                                                {name}
                                            </div>

                                            {item.Doctor_Infor && (
                                                <div className="doctor-item-specialty">
                                                    {item.Doctor_Infor.specialtyData.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchDoctor));
