import React, { Component } from 'react';

import { connect } from 'react-redux';

import Slider from 'react-slick';

class OutStandingDoctor extends Component {
    render() {
        return (
            <div className="section-share section-outstandingDoctor">
                <div className="section-content">
                    <div className="section-header">
                        <span className="Popular-section">Bác sĩ nổi bật tuần qua</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className="section-body">
                            <div className="outer-bg">
                                <div className="img-custom"></div>
                            </div>
                            <div className="position text-center">
                                <div>Bác sĩ Nguyễn Việt Hưng</div>
                                <div>chữa chó béo</div>
                            </div>
                        </div>
                        <div className="section-body">
                            <div className="outer-bg">
                                <div className="img-custom"></div>
                            </div>
                            <div className="position text-center">
                                <div>Bác sĩ Nguyễn Việt Hưng</div>
                                <div>chữa chó béo</div>
                            </div>
                        </div>
                        <div className="section-body">
                            <div className="outer-bg">
                                <div className="img-custom"></div>
                            </div>
                            <div className="position text-center">
                                <div>Bác sĩ Nguyễn Việt Hưng</div>
                                <div>chữa chó béo</div>
                            </div>
                        </div>
                        <div className="section-body">
                            <div className="outer-bg">
                                <div className="img-custom"></div>
                            </div>
                            <div className="position text-center">
                                <div>Bác sĩ Nguyễn Việt Hưng</div>
                                <div>chữa chó béo</div>
                            </div>
                        </div>
                        <div className="section-body">
                            <div className="outer-bg">
                                <div className="img-custom"></div>
                            </div>
                            <div className="position text-center">
                                <div>Bác sĩ Nguyễn Việt Hưng</div>
                                <div>chữa chó béo</div>
                            </div>
                        </div>
                        <div className="section-body">
                            <div className="outer-bg">
                                <div className="img-custom"></div>
                            </div>
                            <div className="position text-center">
                                <div>Bác sĩ Nguyễn Việt Hưng</div>
                                <div>chữa chó béo</div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
