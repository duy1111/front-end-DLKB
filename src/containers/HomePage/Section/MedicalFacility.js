import React, { Component } from 'react';

import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from 'react-slick';

class MedicalFacility extends Component {
    render() {
        
        return (
            <div className="section-share section-medical-facility">
                <div className="section-content">
                    <div className="section-header">
                        <span className="Popular-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className="section-body">
                            <div className="img-custom"></div>
                            <div>Bệnh viện Chợ Rẫy</div>
                        </div>
                        <div className="section-body">
                            <div className="img-custom" />
                            <div>Bệnh viện Chợ Rẫy 2</div>
                        </div>
                        <div className="section-body">
                            <div className="img-custom" />
                            <div>Bệnh viện Chợ Rẫy 3</div>
                        </div>
                        <div className="section-body">
                            <div className="img-custom" />
                            <div>Bệnh viện Chợ Rẫy 4</div>
                        </div>
                        <div className="section-body">
                            <div className="img-custom" />
                            <div>Bệnh viện Chợ Rẫy 5</div>
                        </div>
                        <div className="section-body">
                            <div className="img-custom" />
                            <div>Bệnh viện Chợ Rẫy 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
