import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageHandbook.scss';
import { CommonUtils, CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { createNewHandbook, putUpdateHandbook } from '../../../services/userService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import TableManageHandbook from './TableManageHandbook';
import Select from 'react-select';

import * as actions from '../../../store/actions';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            contentHTML: '',
            contentMarkdown: '',
            specialtyId: '',
            doctorId: '',
            adminId: '',
            action: CRUD_ACTIONS.CREATE,
            handbookId: '',
            listSpecialty: [],
            listDoctors: [],
            selectedSpecialty: '',
            selectedOption: '',
        };
    }

    async componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getRequiredDoctorInfo();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER');
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resSpecialty } = this.props.allRequiredDoctorInfo;
            let dataSelectedSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            this.setState({
                listSpecialty: dataSelectedSpecialty,
            });
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
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
    handleEditFromParent = (handbook) => {
        console.log('check handbook', handbook);
        let { listSpecialty ,listDoctors } = this.state;
        let selectedSpecialty = '',selectedDoctor;
        selectedSpecialty = listSpecialty.find((item) => {
            return item && item.value === handbook.specialtyId;
        });
        selectedDoctor = listDoctors.find((item)=>{
            return item && item.value === handbook.doctorId;
        })
        this.setState({
            name: handbook.name,
            adminId: handbook.adminId,
            doctorId: handbook.doctorId,
            specialtyId: handbook.specialtyId,
            imageBase64: handbook.image,
            contentHTML: handbook.contentHTML,
            contentMarkdown: handbook.contentMarkdown,
            action: CRUD_ACTIONS.EDIT,
            handbookId: handbook.id,
            selectedSpecialty: selectedSpecialty,
            selectedOption:selectedDoctor,
        });
    };
    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    };
    handleSaveNewHandbook = async () => {
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            let res = await createNewHandbook({
                name: this.state.name,
                specialtyId:
                    this.state.selectedSpecialty && this.state.selectedSpecialty.value
                        ? this.state.selectedSpecialty.value
                        : '',
                doctorId: this.state.selectedOption.value,
                adminId: 0,
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                imageBase64: this.state.imageBase64,
            });
            if (res && res.errCode === 0) {
                toast.success('Created a new specialty succeed!');
                this.setState({
                    name: '',
                    specialtyId: '',
                    doctorId: '',

                    imageBase64: '',
                    contentHTML: '',

                    contentMarkdown: '',
                });
            } else {
                toast.error('Created a new specialty failed!');
            }
        }

        if (action === CRUD_ACTIONS.EDIT) {
            console.log('check EDIT', this.state);
            let res = await putUpdateHandbook({
                name: this.state.name,
                specialtyId:
                    this.state.selectedSpecialty && this.state.selectedSpecialty.value
                        ? this.state.selectedSpecialty.value
                        : '',
                doctorId: this.state.selectedOption.value,
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                imageBase64: this.state.imageBase64,
                id:this.state.handbookId,
            });
            if (res && res.errCode === 0) {
                toast.success('Update a new specialty succeed!');
                this.setState({
                    name: '',
                    imageBase64: '',
                    contentHTML: '',
                    id:'',
                    contentMarkdown: '',
                    specialtyId: '',
                    action: CRUD_ACTIONS.CREATE,

                    doctorId: '',
                });
            } else {
                toast.error('Update a new specialty failed!');
            }
        }
    };
    handleChange = async (selectedOption) => {
        console.log('check sel', selectedOption);
        this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));
    };
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USER') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = type === 'USER' ? `${item.firstName} ${item.lastName} ` : item.valueVi;
                    let labelEn = type === 'USER' ? `${item.lastName} ${item.firstName} ` : item.valueEn;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            } else if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VNĐ`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            } else if (type === 'PAYMENT') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = type === 'USER' ? `${item.firstName} ${item.lastName} ` : item.valueVi;
                    let labelEn = type === 'USER' ? `${item.lastName} ${item.firstName} ` : item.valueEn;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            } else if (type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = type === 'USER' ? `${item.firstName} ${item.lastName} ` : item.valueVi;
                    let labelEn = type === 'USER' ? `${item.lastName} ${item.firstName} ` : item.valueEn;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            } else if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            } else if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            }
        }

        return result;
    };
    render() {
        // name: '',
        //     imageBase64: '',
        //     contentHTML: '',
        //     contentMarkdown: '',
        //     specialtyId: '',
        //     doctorId:'',
        //     adminId:'',
        console.log('check state handbook', this.state);
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý cẩm nang</div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên cẩm nang</label>
                        <input
                            className="form-control"
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className="col-2 form-group mb-3">
                        <label>Ảnh cẩm nang</label>
                        <input
                            className="form-control"
                            id="customFile"
                            type="file"
                            onChange={(event) => this.handleOnChangeImage(event)}
                        ></input>
                    </div>
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.specialty" />
                        </label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
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
                        onClick={() => this.handleSaveNewHandbook()}
                    >
                        {this.state.action === CRUD_ACTIONS.EDIT ? (
                            <FormattedMessage id="manage-user.edit" />
                        ) : (
                            <FormattedMessage id="manage-user.save" />
                        )}
                    </button>
                </div>
                <TableManageHandbook
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
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
