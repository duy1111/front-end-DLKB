import React, { Component } from 'react';
import { connect } from 'react-redux';

import './DefaultClass.scss';


class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }
  
    
    render() {
        

        return (
            
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
