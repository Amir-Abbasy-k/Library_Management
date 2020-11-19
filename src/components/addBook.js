import React, {Component} from 'react';
import { blockStatement } from '@babel/types';
import './AddPatron.css';

import { UserAddOutlined, UsergroupAddOutlined, RetweetOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Card,
  Button,
  Radio
} from 'antd';
const { TextArea } = Input;

//forms =  https://programmingwithmosh.com/react/handling-form-react/

export default class AddBook extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fieldValidationErrors: '' ,
      bookBatch:'',
      allBookBatch: [],
      valid: false,
      catalogueTitle: 'User type'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleChecked = this.handleChecked.bind(this);
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

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
   

    switch(e.target.name) {
      case 'barcode':
       if(e.target.value){
        this.setState({fieldValidationErrors:'',  valid: true})
       }else{
        this.setState({fieldValidationErrors: ' Enter a Barcode', valid: false})
       }
       case 'barcode':

      default:
        break;
    }

     /* 
        break;
      case 'password':
        if(e.target.value.length >= 6){
          this.setState({fieldValidationErrors:'',  valid: true})
         }else{
          this.setState({fieldValidationErrors:' is too short', valid: false})
         }
        break;


        */
    

}

  handleChecked () {
      this.setState({isChecked: !this.state.isChecked});
      if (!this.state.isChecked) {
        this.setState({currentAddress: this.state.address})
      } else {
        this.setState({currentAddress: ''})
      }
  }

  handleSubmit(event) {
    alert('Adding Book: ' + this.state.username);
    event.preventDefault();
    const {barcode, author, title, catalogueTitle,  publisher, pub_place, pub_year, isbn, vol_no, bk_edition, bk_pages, bk_contact, bk_coast, bk_translation} = this.state;

  fetch(`http://localhost:4000/addBook?barcode=${barcode}&author=${author}&title=${title}&catalogueTitle=${catalogueTitle}&publisher=${publisher}&pub_place=${pub_place}&pub_year=${pub_year}&isbn=${isbn}&vol_no=${vol_no}&bk_edition=${bk_edition}&bk_pages=${bk_pages}&bk_contact=${bk_contact}&bk_coast=${bk_coast}&bk_translation=${bk_translation}`)
      
  }
  renderCatogaries = (index) => <option>{index}</option>

  render() {
    const {fieldValidationErrors, valid, allBookBatch, isChecked} = this.state;
    let catogaries = allBookBatch.toString().split(",");

    return (
      
      <div>
      
        <p>{fieldValidationErrors}</p>


        <Form className='formDetails_book'>
            <h3>Add a book</h3>
      <label>Book Barcode</label>
      <Input required value={this.state.barcode} name='barcode' placeholder="Book barcode number" onChange={this.handleChange} className='inpt' />
      <label>Book Title</label>
      <Input required value={this.state.title} name='title' placeholder="Book Title" onChange={this.handleChange} className='inpt' />
      <label>Book Author</label>
      <Input value={this.state.author} name='author' ref='author'  placeholder="Book Author" onChange={this.handleChange} className='inpt'/>
      <label>Book Publisher</label>
      <Input value={this.state.publisher} name='publisher' ref='publisher'  placeholder="Book Publisher" onChange={this.handleChange} className='inpt'/>
      <label>Book Published Place</label>
      <Input value={this.state.pub_place} name='pub_place' ref='pub_place' placeholder="Publisher Place"onChange={this.handleChange} className='inpt' />
      <label>Book Contatct</label>
          <TextArea  value={this.state.bk_contact} name='bk_contact' placeholder="Contact" onChange={this.handleChange} />
          <label>Book ISBN :</label>
          <Input value={this.state.isbn} name='isbn' placeholder="ISBN" onChange={this.handleChange} />
          <label>Book Published Year</label>
          <Input value={this.state.pub_year} name='pub_year' placeholder="Published Year" onChange={this.handleChange} className='inpt'/>
          <label>Book Vol no</label>
          <Input value={this.state.vol_no} name='vol_no'  placeholder="Vol Number" onChange={this.handleChange} className='inpt'/>
          <label>Book Edition</label>
          <Input value={this.state.bk_edition} name='bk_edition' placeholder="Edition"onChange={this.handleChange}  className='inpt'/>
          <label>Book Total Pages</label>
          <Input value={this.state.bk_pages} name='bk_pages' placeholder="Pages" onChange={this.handleChange}className='inpt' />
          <label>Book Cost</label>
          <Input value={this.state.bk_coast} name='bk_coast' placeholder="Coast" onChange={this.handleChange} className='inpt'/>
          <label>Book Translations</label>
          <Input value={this.state.bk_translation} name='bk_translation'  placeholder="Translated by" onChange={this.handleChange} className='inpt'/>
         
      <Button type="submit" onClick={this.handleSubmit}className="btn btn-primary" disabled={!this.state.valid}>Submit</Button>
      </Form>

      <div>
   </div>
      </div>
    );
  }
}