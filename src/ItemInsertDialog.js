import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {post} from 'axios';
import './ItemInsertDialog.css';
import { DialogTitle } from '@material-ui/core';

class ItemInsertDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            location:'',
            photo:null,
            photoName:'',
            description:'',
            open:false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.insertItem = this.insertItem.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFormSubmit(e){
        e.preventDefault()
        this.insertItem()
        .then((response)=>{
            console.log(response.data);
            //this.props.stateRefresh();
        })
        this.setState({
            name:'',
            location:'',
            photo:null,
            description:'',
            open:false
        })
    }

    handleFileChange(e) {
        this.setState({
            photo: e.target.files[0],
            //photoName: e.target.files[0].name
        })
        //console.log(e.target.files[0]);
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClickOpen() {
        this.setState({
            open:true
        });
    }

    handleClose() {
        this.setState({
            name:'',
            location:'',
            photo:null,
            description:'',
            open:false
        });
    }

    insertItem(name, location, photo, description) {
        const url = 'api/insertItem';
        const formData = new FormData();
        let blob = new Blob([this.state.photo],{type : "image/*"})
        formData.append('photo',blob)
        formData.append('name',this.state.name)
        formData.append('location',this.state.location)
        formData.append('description',this.state.description)
        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }
        return post(url,formData,config)
    }

    render() {
        const {classes} = this.props;
        return(
            <div className="InsertButton">
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    맛집 추가하기
                </Button>
                <Dialog onClose={this.handleClose} open={this.state.open}>
                    <DialogTitle>맛집 추가</DialogTitle>
                    <DialogContent>
                        <input accept="image/*" name="photo" type="file" file={this.state.photo} value={this.state.photoName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.photoName != '' ? this.state.photoName : "맛집 사진 선택"}
                            </Button>
                        </label><br/>
                        <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br/>
                        <TextField label="장소" type="text" name="location" value={this.state.location} onChange={this.handleValueChange} /><br/>
                        <TextField label="설명" type="text" name="description" value={this.state.description} onChange={this.handleValueChange} /><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default ItemInsertDialog;