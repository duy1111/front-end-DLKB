import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllDoneHandbook } from '../../../services/userService';
import Slider from 'react-slick';
import { withRouter } from 'react-router';
import { LANGUAGES, formatVietnameseToEnglish } from '../../../utils';

class Handbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: [],
        };
    }

    async componentDidMount() {
        let res = await getAllDoneHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data ? res.data : [],
            });
        }
    }
    handleViewDetailHandbook = (handbook) => {
        this.props.history.push(`/detail-handbook/${handbook.id}`);
    };
    render() {
        let { dataHandbook } = this.state;
        const language = this.props.language
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        };
        return (
            <div className="section-share section-Handbook">
                <div className="section-content">
                    <div className="section-header">
                        <span className="Popular-section">{language ===LANGUAGES.VI ? 'Cẩm Nang' : 'Handbook'}</span>
                        <button className="btn-section">{language ===LANGUAGES.VI ? 'Xem thêm' : 'More Info'}</button>
                    </div>
                    <Slider {...settings}>
                        {dataHandbook &&
                            dataHandbook.length > 0 &&
                            dataHandbook.map((item, index) => {
                                return (
                                    <div
                                        className="section-body"
                                        key={index}
                                        onClick={() => this.handleViewDetailHandbook(item)}
                                    >
                                        <div
                                            className="img-custom"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className="clinic-name">{language === LANGUAGES.VI ? item.name : formatVietnameseToEnglish(item.name)}</div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
