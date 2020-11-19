import React, {Component} from 'react';
import { blockStatement } from '@babel/types';
import './AddPatron.css';

import { UserAddOutlined } from '@ant-design/icons';
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
export default class AddPatron extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fieldValidationErrors: '' ,
      patronBatch:'',
      allPatronBatch: [],
      valid: false,
      //regno: '', username: '', firstname: '', address: '', currentAddress: '', city: '', state: '', zipcode: '', country: '', email: '', phone: '',
      //dateofbirth: '', categorycode: '', dateexpiry: '', accountLevel: '', sex: '', password: '', opacnote:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
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

  handleChange(e) {
    const{email, fieldValidationErrors, emailValid, address, currentAddress} = this.state
    this.setState({ [e.target.name] : e.target.value });
   

    switch(e.target.name) {
      case 'email':
       if(e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
        alert(e.target.value)
        this.setState({fieldValidationErrors:'',  valid: true})
       }else{
        this.setState({fieldValidationErrors: ' is invalid', valid: false})
       }
       
        break;
      case 'password':
        if(e.target.value.length >= 6){
          this.setState({fieldValidationErrors:'',  valid: true})
         }else{
          this.setState({fieldValidationErrors:' is too short', valid: false})
         }
        break;



      default:
        break;
    }

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
    alert('Adding Member: ' + this.state.username);
    event.preventDefault();

    const {regno, username, firstname, address, currentAddress, city, state, zipcode, country, email, phone, 
      dateofbirth, categorycode, dateexpiry, accountLevel, sex, password, opacnote} = this.state;

   fetch(`http://localhost:4000/addPatron?Regno=${regno}&Username=${username}&Firstname=${firstname}&Address=${address}&CurrentAddress=${currentAddress}&City=${city}&State=${state}&Zipcode=${zipcode}&Country=${country}&Email=${email}&Phone=${phone}&Dateofbirth=${dateofbirth}&Categorycode=${categorycode}&Dateexpiry=${dateexpiry}&AccountLevel=${accountLevel}&Sex=${sex}&Password=${password}&Opacnote=${opacnote}`)
      
  }
  renderCatogaries = (index) => <option>{index}</option>

  render() {
    //regno, username, firstname, address, currentAddress, city, state, zipcode, country, email, phone,
    // dateofbirth, categorycode, dateenrolled, dateexpiry, accountLevel, sex, password, opacnote
   const {regno, username, firstname, address, currentAddress, city, state, zipcode, country, email, phone, 
    dateofbirth, categorycode, dateexpiry, accountLevel, sex, password, opacnote} = this.state;
    const {fieldValidationErrors, valid, allPatronBatch, isChecked} = this.state;
    let catogaries = allPatronBatch.toString().split(",");

    return (
      
      <div>
      
        <p>{fieldValidationErrors}</p>
      <Form onSubmit={this.handleSubmit} className='form'>
      <h1 style={{textAlign: 'left'}}><UserAddOutlined />Upload a patron</h1>
      <Input value={this.state.regno} name='regno' placeholder="Patron Serial Number" onChange={this.handleChange} />
          <Input value={this.state.username} name='username'  placeholder="Username" onChange={this.handleChange} />
          <Input value={this.state.firstname} name='firstname' placeholder="Full Name"onChange={this.handleChange}  />

  
          <TextArea value={this.state.address} name='address' placeholder="Address" onChange={this.handleChange} />
          <label for="">Same Address</label>

          <Input type="checkbox" onChange={ this.handleChecked }/>

          <TextArea value={this.state.currentAddress} name='currentAddress' placeholder="Current Address" onChange={this.handleChange} />

          <Input value={this.state.city} name='city' placeholder="city" onChange={this.handleChange} />
          <Input value={this.state.state} name='state'  placeholder="state" onChange={this.handleChange} />
          <Input value={this.state.zipcode} name='zipcode' placeholder="zipcode"onChange={this.handleChange}  />
          <Input value={this.state.country} name='country' placeholder="country" onChange={this.handleChange} />
          <Input value={this.state.email} name='email' placeholder="email" onChange={this.handleChange} />
          <Input value={this.state.phone} name='phone'  placeholder="phone" onChange={this.handleChange} />
          <label>Date of birth:</label>
          <Input value={this.state.dateofbirth} name='dateofbirth' type="date" placeholder="dateofbirth"onChange={this.handleChange}  />
          <label>Category Code:</label>
          <select value={this.state.categorycode} name='categorycode' onChange={this.handleChange}>
            <option></option>
            {catogaries.map(this.renderCatogaries)}
          </select>
          <label>Date Expiry account :</label>
          <Input value={this.state.dateexpiry} name='dateexpiry' type="date"placeholder="Expiry Date" onChange={this.handleChange} />
          <Input value={this.state.accountLevel} name='accountLevel'  placeholder="accountLevel" onChange={this.handleChange} />

          <p>Gender: </p>

              <Input type="radio" name="sex" value="mail"  onChange={this.handleChange} />
              <label for="contactChoice1">Mail</label>
              <Input type="radio" id="contactChoice2" name="sex" value="femail"  onChange={this.handleChange} />
              <label for="contactChoice2">Femail</label>
              <Input type="radio" id="contactChoice3" name="sex" value="other"  onChange={this.handleChange} />
              <label for="contactChoice3">Other</label>

          <Input value={this.state.password} name='password' placeholder="password" onChange={this.handleChange} />

      <button type="submit" className="btn btn-primary" disabled={!this.state.valid}>Submit</button>
      </Form>

      <div>
        Resualts:
         <p>  {regno} {username} , {firstname} , {address} , {currentAddress} , {city} , {state} , {zipcode} , {country} , {email} , {phone} , {
  dateofbirth} , {categorycode} , {dateexpiry} , {accountLevel} , {sex} , {password}  , {opacnote}, 
  {"this is allPatronBatch  = "+ allPatronBatch}
      </p></div>
      </div>
    );
  }
}