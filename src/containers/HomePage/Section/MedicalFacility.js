import React, { Component } from 'react';

import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
import { LANGUAGES, formatVietnameseToEnglish } from '../../../utils';

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
        let language = this.props.language;

        return (
            <div className="section-share section-medical-facility">
                <div className="section-content">
                    <div className="section-header">
                        <span className="Popular-section"> {language === LANGUAGES.VI ? 'Cơ sở y tế nổi bật': 'Outstanding medical facility'}</span>
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
                                        onClick={() => this.handleViewDetailClinic(item)}
                                    >
                                        <div
                                            className="img-custom"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className='clinic-name' >{language === LANGUAGES.VI ? item.name : formatVietnameseToEnglish(item.name)}</div>
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
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
