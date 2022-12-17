import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';


class Specialty extends Component {
    render() {
       
        return (
            <div className="section-share section-specialty">
                <div className="section-content">
                    <div className='section-header' >
                        <span className='Popular-section' >Chuyên khoa phổ biến</span>
                        <button className='btn-section' >Xem thêm</button>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className="section-body">
                            <div className='img-custom'></div> 
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="section-body">
                            <div className='img-custom'/>
                            <div>Cơ xương khớp2</div>
                        </div>
                        <div className="section-body">
                            <div className='img-custom'/>
                            <div>Cơ xương khớp3</div>
                        </div>
                        <div className="section-body">
                            <div className='img-custom'/>
                            <div>Cơ xương khớp4</div>
                        </div>
                        <div className="section-body">
                            <div className='img-custom'/>
                            <div>Cơ xương khớp5</div>
                        </div>
                        <div className="section-body">
                            <div className='img-custom'/>
                            <div>Cơ xương khớp6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
