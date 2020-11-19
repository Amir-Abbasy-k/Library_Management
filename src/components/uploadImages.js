import React from 'react';
import axios from 'axios';


import { List, Input, Button, Popconfirm, Icon, Card, Upload, Modal, Progress } from 'antd';
import {  UploadOutlined, SelectOutlined} from '@ant-design/icons';

class App extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        loaded:0,
      }
   
  }

  //UPLOAD SPECIFIC NUMBE OF FILES 
maxSelectFile=(event)=>{
  let files = event.target.files // create file object
      if (files.length > 3) { 
         const msg = 'Only 3 images can be uploaded at a time'
         event.target.value = null // discard selected file
         console.log(msg)
         return false;
    }
  return true;
}


//handlePreview = async file => {
  


onChangeHandler = async event =>{
  var files = event.target.files
      if(this.maxSelectFile(event)){ 
      // if return true allow to setState
         this.setState({
         selectedFile: files
      })
     
   }
};


 

onClickHandler = () => {
  const data = new FormData() 
  for(var x= 0; x<this.state.selectedFile.length; x++){
  data.append('file', this.state.selectedFile[x])
  }
  axios.post("http://localhost:4000/uploadImages", data, { 

      onUploadProgress: ProgressEvent => {
         this.setState({
           loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
       })
   },
  })
  .then(res => { // then print response status
    console.log(res.statusText)
 })

}

  render(){

    const styles={
      prograss:{
        width: this.state.loaded+'%',
        backgroundColor: '#26a81a',
      }
    }

    

    
 
  return (
    
    
 <div>
    <Progress percent={this.state.loaded} status="active"  strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }} />
  <div>
  <SelectOutlined  style={{fontSize: '30px', color: '#108ee9'}} /> <input type="file" name="file" multiple onChange={this.onChangeHandler}/>
  <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}><UploadOutlined  style={{fontSize: '30px', color: '#108ee9'}} /></button> 
  </div>


    </div>
  );
}


}

export default App;
