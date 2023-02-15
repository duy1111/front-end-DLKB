import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageSpecialty.scss';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import { createNewSpecialty, putUpdateSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import TableManageSpecialty from './TableManageSpecialty';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            specialtyId: '',
            action: CRUD_ACTIONS.CREATE,
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
    handleEditFromParent = (specialty) => {
        console.log('check specialty', specialty);

        this.setState({
            name: specialty.name,

            imageBase64: specialty.image,
            descriptionHTML: specialty.descriptionHTML,

            descriptionMarkdown: specialty.descriptionMarkdown,
            action: CRUD_ACTIONS.EDIT,
            specialtyId: specialty.id,
        });
    };
    handleSaveNewSpecialty = async () => {
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            let res = await createNewSpecialty(this.state);
            if (res && res.errCode === 0) {
                toast.success('Created a new specialty succeed!');
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',

                    descriptionMarkdown: '',
                });
            } else {
                toast.error('Created a new specialty failed!');
            }
        }

        if (action === CRUD_ACTIONS.EDIT) {
            console.log('check EDIT', this.state);
            let res = await putUpdateSpecialty(this.state);
            if (res && res.errCode === 0) {
                toast.success('Update a new specialty succeed!');
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',

                    descriptionMarkdown: '',
                    specialtyId: '',
                    action: CRUD_ACTIONS.CREATE,
                });
            } else {
                toast.error('Update a new specialty failed!');
            }
        }
    };
    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý chuyên khoa</div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input
                            className="form-control"
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className="col-2 form-group mb-3">
                        <label>Ảnh chuyên khoa</label>
                        <input
                            className="form-control"
                            id="customFile"
                            type="file"
                            onChange={(event) => this.handleOnChangeImage(event)}
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
                    <button
                        className={
                            this.state.action === CRUD_ACTIONS.EDIT
                                ? 'btn btn-warning col-md-1'
                                : 'btn btn-primary col-md-1'
                        }
                        onClick={() => this.handleSaveNewSpecialty()}
                    >
                        {this.state.action === CRUD_ACTIONS.EDIT ? (
                            <FormattedMessage id="manage-user.edit" />
                        ) : (
                            <FormattedMessage id="manage-user.save" />
                        )}
                    </button>
                </div>
                <TableManageSpecialty
                    col-md-12
                    handleEditFromParent={this.handleEditFromParent}
                    action={this.state.action}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
