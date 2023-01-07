import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Slider from 'react-slick';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">Truyền thông nói gì về BookingCare.vn</div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="600px"
                            height="400px"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="content-right">
                        <div><h2>CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN</h2></div>
                        <div>
                            CÀ PHÊ KHỞI NGHIỆP VTV1 Chương trình được phát sóng lúc 6h55 ngày 14/11/2018 trên VTV1
                            ------------------------------------------------------------------ Hãy cùng đón xem: 📺
                            Chương trình Quốc gia khởi nghiệp 🎬 Phát sóng vào 20:10 tối thứ 6 hàng tuần 📺 Chương trình
                            Cà phê khởi nghiệp 🎬 Phát sóng vào lúc 06:55 sáng thứ 2 đến thứ 6 hàng tuần trên kênh VTV1,
                            Đài truyền hình Việt Nam
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        isLoggedIn: state.user.isLoggedIn,
        //language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
