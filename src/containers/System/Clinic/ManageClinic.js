import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageClinic.scss';
import { CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            address:'',
            descriptionMarkdown: '',
        };
    }

    componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {}
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                imageBase64: base64,
            });
        }
    };
    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success('Created a new clinic succeed!');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                address:'',
                descriptionMarkdown: '',
            });
        } else {
            toast.error('Created a new clinic failed!');
        }
    };
    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý phòng khám</div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên phòng khám</label>
                        <input
                            className="form-control"
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className="col-2 form-group mb-3">
                        <label>Ảnh phòng khám</label>
                        <input
                            className="form-control"
                            id="customFile"
                            type="file"
                            onChange={(event) => this.handleOnChangeImage(event)}
                           
                        ></input>
                    </div>
                    <div className='col-12 from-group' >
                    <label>Địa chỉ phòng khám</label>
                        <input
                            className="form-control"
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                           
                        ></input>
                    </div>
                    <div className="col-12 form-group">
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn-save-specialty" onClick={() => this.handleSaveNewClinic()}>
                        Save
                    </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
