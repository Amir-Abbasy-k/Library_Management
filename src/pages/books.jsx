import React, {Component} from 'react';
import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import  AddBook from '../components/addBook'
import Import_books from '../components/import_books'
import SideNav from  '../components/sideNav'

import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Card,
  Button,
  Radio,
  upload
} from 'antd';

class Patrons extends Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      fileName: '',
      patronBatch:'',
      allPatronBatch: [],
      isLoading:  false
    };
  }

  componentDidMount(){
    this.GetPatronArrays();
  }

  GetPatronArrays = _ => {
    const {member} = this.state;
    fetch(`http://localhost:4000/GetPatronArrays`)
    .then(response => response.json())
    .then(response => this.setState({allPatronBatch: response.data[0].PatronCatogary}))
    .catch(err => console.error(err))
  }

  onChangeCatogary = (e) =>{
      this.setState({patronBatch: e.target.value})
      
  }
  onChangeTitle = (e) => {
    this.setState({patronBatch: e.target.value})
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
    const { fileName, patronBatch, allPatronBatch, isLoading } = this.state;
    this.setState({isLoading: true});
    let batch = allPatronBatch+','+patronBatch;
       fetch(`http://localhost:4000/importPatrons?fileName=${fileName}&patronCatogary=${patronBatch}`)
       fetch(`http://localhost:4000/patronArrays?patronCatogary=${batch}`)
       .then(response => this.setState({isLoading: false}))
       .catch(err => console.error(err))

      }

      
        //.then(response => response.json())
        //.then(this.getProducts)
        //.then(response => this.setState({excel: response.data}))
        //.catch(err => console.error(err))

     renderCatogaries = (index) => <option>{index}</option>





  render(){
    const { fileName, patronBatch, allPatronBatch} = this.state;
    let catogaries = allPatronBatch.toString().split(",");

      return(
        <div classNamea='App'>

        <SideNav/>
      
        <div className='Content'>
      
      
      
      <main className='main' style={{overflow: 'scroll'}}> 
      <Card className='left'>
        <AddBook/>
       </Card>
     
      <Card className='right' style={{marginTop: 72}}>
              <Import_books/>
        </Card>
        </main>

    <footer className='footer'>Footer</footer>
  </div>
</div>
      );
    }
}

export default withRouter(Patrons);