import React, {Component} from 'react';
import { BrowserRouter as Router, withRouter, Route, Link, useParams} from 'react-router-dom';
import History from  '../components/history'
import AddPatron from '../components/addPatron';
import './form.css';
import moment from 'moment';

import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Switch,
  Icon,
  Cascader,
  Select,
  Card,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Avatar,
  Radio 
} from 'antd';

const { TextArea } = Input;


class ViewPatron extends Component{
  constructor(props) {
    super(props)
    this.state = {
      _barcode: this.props.match.params.id,
      book: [],
      valid: false
    };
  
}

  componentDidMount(){
    this.getBook();
  }

  getBook = _ => {
    const {_barcode} = this.state;
    fetch(`http://localhost:4000/getBook?id=${_barcode}`)
    .then(response => response.json())
    .then(response => this.setState({book: response.data[0]}))
    .catch(err => console.error(err))
  }
  handleChange =(e)=>{
    if(this.state.valid){

   
    const{book} = this.state
    this.setState({ [e.target.name] : e.target.value});
    let sql = ''
    
    switch(e.target.name){
      case 'barcode':
      book.barcode = e.target.value; 
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`)
          break;

      case 'title':
      book.title = e.target.value; 
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`)
          break;

      case 'author':
      book.author = e.target.value; 
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`)
          break;

      case 'publisher':
      book.publisher = e.target.value; 
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`)
          break;
       
      case 'pub_place':
      book.pub_place = e.target.value; 
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`)
          break;

      case 'pub_year':
      book.pub_year = e.target.value; 
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`)
          break;

      case 'isbn':
      book.isbn = e.target.value;
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`) 
          break;

      case 'vol_no':
      book.vol_nou = e.target.value;
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`) 
          break; 
          
      case 'bk_edition':
      book.bk_edition = e.target.value; 
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`)
          break;

      case 'bk_pages':
      book.bk_pages = e.target.value; 
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`)
          break;

      case 'bk_contact':
      book.bk_contact = e.target.value;
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`) 
          break;

      case 'bk_coast':
      book.bk_coast = e.target.value; 
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`)
          break; 

      case 'bk_translation':
      book.bk_translation = e.target.value;
      sql = `UPDATE books SET title='${e.target.value}' WHERE barcode='${this.state._barcode}'`;  
      fetch(`http://localhost:4000/bookUpdate?Q=${sql}`) 
          break; 


      default:
        break;

      }
    }

  }



enableEdit=()=>{
    const book = this.state;
if(this.state.valid){
this.setState({valid: false})
}else{
  this.setState({valid: true})
}
}



  render(){

    const { barcode, author, title, catalogueTitle,  publisher, pub_place, pub_year, isbn, vol_no, bk_edition, bk_pages, bk_contact, bk_coast, bk_translation} = this.state;
    const {fieldValidationErrors, valid, book} = this.state;
     


    return (

  <div classNamea='App'>

  <div className='Side'>Sider</div>

  <div className='Content'>



<main className='main' style={{overflow: 'scroll'}}> 

        <Card className='top'>
        <img src={"/mem_photos/"+book.barcode+".jpg"} alt={book.barcode+".jpg"}/>

        <h3>Patron id : {this.state.patron} and name {book.title} Author: {book.author}</h3>
        <label for=''>Enable editing</label>
        <Switch
      checkedChildren={<Icon type="check" />}
      unCheckedChildren={<Icon type="close" />}
      checked={valid}
      onChange={this.enableEdit} />

    


        <p>{fieldValidationErrors}</p>
        </Card>

        <Card className='left'>
      <Form   className='formDetails_book'>
      <label>Book Barcode</label>
      <Input required value={book.barcode} name='barcode' placeholder="Book barcode number" onChange={this.handleChange} className='inpt' />
      <label>Book Title</label>
      <Input required value={book.title} name='title' placeholder="Book Title" onChange={this.handleChange} className='inpt' />
      <label>Book Author</label>
      <Input value={book.author} name='author' ref='author'  placeholder="Book Author" onChange={this.handleChange} className='inpt'/>
      <label>Book Publisher</label>
      <Input value={book.publisher} name='publisher' ref='publisher'  placeholder="Book Publisher" onChange={this.handleChange} className='inpt'/>
      <label>Book Published Place</label>
      <Input value={book.pub_place} name='pub_place' ref='pub_place' placeholder="Publisher Place"onChange={this.handleChange} className='inpt' />
      <label>Book Contatct</label>
          <TextArea  value={book.bk_contact} name='bk_contact' placeholder="Contact" onChange={this.handleChange} />
          <label>Book ISBN :</label>
          <Input value={book.isbn} name='isbn' placeholder="ISBN" onChange={this.handleChange} />
          <label>Book Published Year</label>
          <Input value={book.pub_year} name='pub_year' placeholder="Published Year" onChange={this.handleChange} className='inpt'/>
          <label>Book Vol no</label>
          <Input value={book.vol_no} name='vol_no'  placeholder="Vol Number" onChange={this.handleChange} className='inpt'/>
          <label>Book Edition</label>
          <Input value={book.bk_edition} name='bk_edition' placeholder="Edition"onChange={this.handleChange}  className='inpt'/>
          <label>Book Total Pages</label>
          <Input value={book.bk_pages} name='bk_pages' placeholder="Pages" onChange={this.handleChange}className='inpt' />
          <label>Book Cost</label>
          <Input value={book.bk_coast} name='bk_coast' placeholder="Coast" onChange={this.handleChange} className='inpt'/>
          <label>Book Translations</label>
          <Input value={book.bk_translation} name='bk_translation'  placeholder="Translated by" onChange={this.handleChange} className='inpt'/>
         
      </Form>

   
     </Card>

      <Card className='right'>

      <div>
        
      </div>
         
    
      </Card>

      </main>


    <footer className='footer'>Footer</footer>
  </div>
</div>


    );
    }
}

export default withRouter(ViewPatron);