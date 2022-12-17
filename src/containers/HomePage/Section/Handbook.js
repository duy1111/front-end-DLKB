import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Slider from 'react-slick';


class Handbook extends Component {
    render() {
       
        return (
            <div className="section-share section-Handbook">
                <div className="section-content">
                    <div className='section-header' >
                        <span className='Popular-section' >Chuyên khoa phổ biến</span>
                        <button className='btn-section' >Xem thêm</button>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className="section-body">
                            <div className='img-custom'></div> 
                            <div>6 Bác sĩ khám Cơ Xương Khớp giỏi tại TPHCM (phần 3)</div>
                        </div>
                        <div className="section-body">
                            <div className='img-custom'/>
                            <div>6 Bác sĩ khám Cơ Xương Khớp giỏi tại TPHCM (phần 3)2</div>
                        </div>
                        <div className="section-body">
                            <div className='img-custom'/>
                            <div>6 Bác sĩ khám Cơ Xương Khớp giỏi tại TPHCM (phần 3)3</div>
                        </div>
                        <div className="section-body">
                            <div className='img-custom'/>
                            <div>6 Bác sĩ khám Cơ Xương Khớp giỏi tại TPHCM (phần 3)4</div>
                        </div>
                        <div className="section-body">
                            <div className='img-custom'/>
                            <div>6 Bác sĩ khám Cơ Xương Khớp giỏi tại TPHCM (phần 3)5</div>
                        </div>
                        <div className="section-body">
                            <div className='img-custom'/>
                            <div>6 Bác sĩ khám Cơ Xương Khớp giỏi tại TPHCM (phần 3)6</div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
