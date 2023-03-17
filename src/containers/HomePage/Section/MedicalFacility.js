import React, { Component } from 'react';

import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataClinics :[]
        }
    }

    async componentDidMount(){
        let res = await getAllClinic();
        if(res && res.errCode ===0){
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (clinic) => {
        this.props.history.push(`/detail-clinic/${clinic.id}`)
    }
    viewMoreInfo = () => {
        this.props.history.push(`/all-clinics`)
    }
    
    render() {
        console.log('check state clinic', this.state)
        let {dataClinics} = this.state
        return (
            <div className="section-share section-medical-facility">
                <div className="section-content">
                    <div className="section-header">
                        <span className="Popular-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section" 
                             onClick={() => this.viewMoreInfo()}>
                        Xem thêm</button>
                    </div>
                    <Slider {...this.props.settings}>
                    {dataClinics &&
                            dataClinics.length > 0 &&
                            dataClinics.map((item, index) => {
                                return (
                                    <div
                                        className="section-body"
                                        key={index}
                                      
                                    >
                                        <div
                                            className="img-custom"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className='clinic-name' >{item.name}</div>
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
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
