import React, {Component} from "react"
import "./ImageUploader.scss"

class ImageUploader extends React.Component {
    constructor(props) {
       super(props);
       this.handleAddImage = this.handleAddImage.bind(this);
       this.handleUploadImage = this.handleUploadImage.bind(this);
       this.handleDragOver = this.handleDragOver.bind(this);
       this.handleDragEnter = this.handleDragEnter.bind(this);
       this.handleDragLeave = this.handleDragLeave.bind(this);
       this.handleDrop = this.handleDrop.bind(this);
       this.handleCancelUpload = this.handleCancelUpload.bind(this);
       this.state = {
          file: null,
          dragOver: false,
          errorNoficication: null,
          url:null, 
       };
    }

    handleDragEnter(e) {
       e.preventDefault();
    }
    handleDragOver(e) {
       e.preventDefault();
       if (!this.state.dragOver) {
          this.setState({
             dragOver: true
          });
       }
    }
    handleDragLeave(e) {
       e.preventDefault();
       this.setState({
          dragOver: false
       });
    }
    handleDrop(e) {
       e.preventDefault();
       let file = e.dataTransfer.files[0];
       let fileType = file.type.split("/")[0];
       if (fileType !== "image") {
         //  console.log("Not an image file");
          this.setState({
             file: null,
             errorNotification: "Not an image File",
             dragOver: false
          });
          return setTimeout(() => {
             this.setState({
                errorNotification: null
             });
          }, 3000);
       }
       // this.refs.image.files = e.dataTransfer.files;
       document.getElementById('upload-image-input').fileList =  e.dataTransfer.files[0];
       this.setState({
          file,
          dragOver: false
       });
    }
    
    
    /**
       Handle Manually (File Input) Added Files
    **/
    handleAddImage(e) {
       e.preventDefault();
       let file = this.refs.image.files[0];
       
       // Validate file is of type Image
       let fileType = this.refs.image.files[0].type.split('/')[0];
       if (fileType !== "image") {
         //  console.log("Not an image file");
          this.setState({
             file: null,
             errorNotification: "Not an image File",
             dragOverClass: ""
          });
          return setTimeout(() => {
             this.setState({
                errorNotification: null
             });
          }, 3000);
       }
          
       this.setState({
          file:file
       });
    }
    
    /**
       Handle Upload after Upload Button Clicked
    **/
    handleUploadImage(e) {
       e.preventDefault();
       if (this.refs.image.files[0]) {
         //  console.log("Uploading Image " + this.refs.image.files[0].name + "");
          this.props.onUpload(this.refs.image.files[0])
       }
    }
    handleCancelUpload (e) {
       e.preventDefault();
       this.setState({
          file: null
       });
       this.props.nullifyQuotes();
    }
    
    
    render() {
       
       // Match drag over css to hover css
       let dragOverClass = this.state.dragOver
          ? `display-box drag-over`
          : `display-box`;

      let iconTextBoxClass = (this.state.file)
         ?`icon-text-box file-selected`
         :`icon-text-box`
       
       // If file is set, change upload box text to file name
       let uploadText = this.state.file
          ? <div className="chosen-file-div">
               <h4>{this.state.file.name}</h4>
               <div className="button-div">
                  <button 
                     className="cancel-upload-button btn btn-warning"
                     onClick={this.handleCancelUpload}
                  >
                     Cancel
               </button>
                  <button
                     className="upload-button btn btn-primary"
                     onClick={this.handleUploadImage}
                  >
                     Upload
                  </button>
               </div>
            </div>
          : <div>
               <h4>Choose Files to Upload</h4>
            </div>;
       
       // Show Error message if file type is not an image
       let errorNotification = this.state.errorNotification
          ? <div className="error-notification">
               <p>{this.state.errorNotification}</p>
            </div>
          : null;
         // console.log((this.state.file)?URL.revokeObjectURL(this.state.file):null)
         //  style={(this.state.file)?{backgroundImage:`url(${URL.revokeObjectURL(this.state.file)})`}:{}}
      let objUrl = "";
      if(this.state.file){
      objUrl = URL.createObjectURL(this.state.file);
      // URL.revokeObjectURL(objUrl);
       }

         return (
          <div className="image-uploader-wrapper" >
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
             <div className={dragOverClass} >
                <div className={iconTextBoxClass} style = {{backgroundImage: `url('${objUrl}')`}}>
                   <div className="upload-icon">
                      {(!this.state.file)?<i className="fa fa-upload" aria-hidden="true"/>:null}
                   </div>
                   <div className="upload-text">
                      {uploadText}
                   </div>
                   {errorNotification}
                </div>
                <div>
                   <input
                      type="file"
                      ref="image"
                      id="upload-image-input"
                      className="upload-image-input"
                      accept="image/*"
                      onDrop={this.handleDrop}
                      onDragEnter={this.handleDragEnter}
                      onDragOver={this.handleDragOver}
                      onDragLeave={this.handleDragLeave}
                      onChange={this.handleAddImage}
                   />
                </div>
             </div>
          </div>
       );
    }
 }

 export default ImageUploader