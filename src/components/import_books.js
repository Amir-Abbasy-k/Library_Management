import React, {Component} from 'react';
import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

import {  FileExcelOutlined, UploadOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Card,
  Button,
  Radio,
  upload,
  Divider
} from 'antd';



class Excel_json extends Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      fileName: '',
      catalogueTitle:'',
      allBookBatch: [],
      isLoading:  false
    };
  }


  componentDidMount(){
    this.GetBookArrays();
  }

  GetBookArrays = _ => {
    const {member} = this.state;
    fetch(`http://localhost:4000/GetBookArrays`)
    .then(response => response.json())
    .then(response => this.setState({allBookBatch: response.data[0].bookCatogary}))
    .catch(err => console.error(err))
  }

  onChangeTitle = (e) =>{
      this.setState({catalogueTitle: e.target.value})
      
  }
  onChangeCatogary = (e) =>{
    this.setState({catalogueTitle: e.target.value})
    
}

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      fileName: event.target.files[0].name,
      loaded: 0,
    })
   
    const data = new FormData() 
    data.append('file', event.target.files[0])
    axios.post(`http://localhost:4000/upload`, data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
  }

  onClickHandler = () => {
    const { fileName, catalogueTitle, allBookBatch, isLoading } = this.state;
    this.setState({isLoading: true});
    let batch = allBookBatch+','+catalogueTitle;
       fetch(`http://localhost:4000/excel?fileName=${fileName}&catalogueTitle=${catalogueTitle}`)
       fetch(`http://localhost:4000/bookArrays?bookCatogary=${batch}`)
       .then(response => this.setState({isLoading: false}))
       .catch(err => console.error(err))
      }

      
        //.then(response => response.json())
        //.then(this.getProducts)
        //.then(response => this.setState({excel: response.data}))
        //.catch(err => console.error(err))

        renderCatogaries = (index) => <option>{index}</option>


  render(){
    const { fileName, catalogueTitle, allBookBatch} = this.state;
    let catogaries = allBookBatch.toString().split(",");
      return(
        <div>
        <Divider>- 1 -</Divider>
           <a style={{color: '#096', border: '2px solid #096', padding: 10}} href='/demo_catalogue.xlsx' className='btn_excel' type="primary" size={'large'}>
             <FileExcelOutlined style={{fontSize: '25px'}}/>download model excel data file</a>
             <p  style={{marginTop: 10 }}>Download this Excel file for a model. after completing Books Catalogues go to upload</p>
             <Divider>- 2 -</Divider>
            <h1>Upload Patron Batch</h1>
              <h5>Title is : {catalogueTitle}</h5>
              <span>file name is : {fileName} </span>
              <input placeholder="Enter a title" onChange={this.onChangeTitle} />  <span>or </span>
              <select onChange={this.onChangeCatogary}>  
              {catogaries.map(this.renderCatogaries)}
              </select>
              <span>import your Excel file</span>
              <Input type="file" name="file" onChange={this.onChangeHandler}/><br/>
              {this.state.isLoading && <h1></h1>}   
              <Button onClick={this.onClickHandler} style={{backgroundColor: '#096', color: '#fff', width: '100%'}} ><UploadOutlined />Upload</Button>
        </div>
      );
    }
}

export default withRouter(Excel_json);