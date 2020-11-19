import React, {Component} from 'react';
import { BrowserRouter as Router, withRouter, Route, Link, useParams} from 'react-router-dom';
import History from  '../components/history'
import './form.css';
import moment from 'moment';

import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Card,
  Button,
  Radio,
  Tabs,
  Icon
} from 'antd';

const { TabPane } = Tabs;
const { Meta } = Card;
const { TextArea } = Input;


class ViewPatron extends Component{
  constructor(props) {
    super(props)
    this.state = {
      patron: this.props.match.params.id,
      allPatronBatch: [],
      member: []
    };
  
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  componentDidMount(){
    this.GetPatronArrays();
    this.getMember();

  }

  getMember = _ => {
    const {patron} = this.state;
    fetch(`http://localhost:4000/getPatron?id=${patron}`)
    .then(response => response.json())
    .then(response => this.setState({member: response.data[0]}))
    .catch(err => console.error(err))
  }

  GetPatronArrays = _ => {
    fetch(`http://localhost:4000/GetPatronArrays`)
    .then(response => response.json())
    .then(response => this.setState({allPatronBatch: response.data[0].PatronCatogary}))
    .catch(err => console.error(err))
  }

  
 

  handleChange(e) {
    const{member} = this.state
    this.setState({ [e.target.name] : e.target.value});
  

    switch(e.target.name){
      case 'regno':
          member.regno = e.target.value; 
          break;

      case 'username':
          member.username = e.target.value; 
          break;

      case 'firstname':
          member.firstname = e.target.value; 
          break;

      case 'address':
          member.address = e.target.value; 
          break;
            
      case 'currentAddress':
          member.currentAddress = e.target.value; 
          break;

      case 'city':
          member.city = e.target.value; 
          break;

      case 'state':
          member.state = e.target.value; 
          break;

      case 'zipcode':
          member.zipcode = e.target.value; 
          break;

      case 'country':
          member.country = e.target.value; 
          break;

      case 'email':
      if(e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
        this.setState({fieldValidationErrors:'',  valid: true})
        member.email = e.target.value; 
      }else{
        this.setState({fieldValidationErrors: ' is invalid', valid: false})
      }
        break;

      case 'phone':
          member.phone = e.target.value; 
          break;

      case 'dateofbirth':
          member.dateofbirth = e.target.value; 
          break;

      case 'dateexpiry':
          member.dateexpiry = e.target.value; 
          break;    

      case 'categorycode':
          member.categorycode = e.target.value; 
          break;

      case 'password':
        if(e.target.value.length >= 6){
          this.setState({fieldValidationErrors:'',  valid: true})
          member.password = e.target.value; 
        }else{
          this.setState({fieldValidationErrors:' is too short', valid: false})
        }
        break;

      default:
        break;
    }

  }

  enableEdit=()=>{
    const {member} = this.state;
       this.setState({username: member.username, firstname: member.firstname, address: member.address, currentAddress: member.currentAddress, city: member.city, state: member.state, zipcode: member.zipcode, country: member.country, email: member.email, phone: member.phone, 
        dateofbirth: member.dateofbirth, categorycode: member.categorycode, dateexpiry: member.dateexpiry, accountLevel: member.accountLevel, sex: member.sex, password: member.password, opacnote: member.opacnote})
        this.setState({valid: true});
  }

  handleSubmit=(event)=>{
    event.preventDefault();

    const {patron, username, firstname, address, currentAddress, city, state, zipcode, country, email, phone, 
      dateofbirth, categorycode, dateexpiry, accountLevel, sex, password, opacnote} = this.state;
      alert(patron + 'Updating Member: ' + this.state.username);

  fetch(`http://localhost:4000/patronUpdate?Regno=${patron}&Username=${username}&Firstname=${firstname}&Address=${address}&CurrentAddress=${currentAddress}&City=${city}&State=${state}&Zipcode=${zipcode}&Country=${country}&Email=${email}&Phone=${phone}&Dateofbirth=${dateofbirth}&Categorycode=${categorycode}&Dateexpiry=${dateexpiry}&AccountLevel=${accountLevel}&Sex=${sex}&Password=${password}&Opacnote=${opacnote}`)
  
  this.getMember();

  }
  renderCatogaries = (index) => <option>{index}</option>
  

  render(){

    const {regno, username, firstname, address, currentAddress, city, state, zipcode, country, email, phone, 
      dateofbirth, categorycode, dateexpiry, accountLevel, sex, password, opacnote} = this.state;
      const {fieldValidationErrors, valid, allPatronBatch, member} = this.state;
      let catogaries = allPatronBatch.toString().split(",");
     


    return (

  <div classNamea='App'>

  <div className='Side'>Sider</div>

  <div className='Content'>



<main className='main' style={{overflow: 'scroll'}}> 
<Tabs defaultActiveKey="1" className='Tabs'>
<TabPane tab={<span><Icon type="apple" />Check Out</span>}key="1">
        <Card className='top'>
          
        <img src={"/mem_photos/"+member.regno+".jpg"} alt={member.regno+".jpg"}/>

        <h3>Patron id : {this.state.patron} and name {member.username}</h3>
        <label for=''>Enable editing </label>
        <Input type="checkbox" onChange={ this.enableEdit}/>
        </Card>

        <Card className='left'>
      <Form className='formDetails'>
      <Input required value={member.regno} name='regno' placeholder="Patron Serial Number" onChange={this.handleChange} className='inpt' />


          <Input value={member.username} name='username' ref='username'  placeholder="Username" onChange={this.handleChange} className='inpt'/>
          <Input value={member.firstname} name='firstname' ref='firstname' placeholder="Full Name"onChange={this.handleChange} className='inpt' />

          <TextArea  value={member.address} name='address' placeholder="Address" onChange={this.handleChange} />
          <TextArea  value={member.currentAddress} name='currentAddress' placeholder="Current Address" onChange={this.handleChange} />

          <Input value={member.city} name='city' placeholder="city" onChange={this.handleChange} className='inpt'/>
          <Input value={member.state} name='state'  placeholder="state" onChange={this.handleChange} className='inpt'/>
          <Input value={member.zipcode} name='zipcode' placeholder="zipcode"onChange={this.handleChange}  className='inpt'/>
          <Input value={member.country} name='country' placeholder="country" onChange={this.handleChange}className='inpt' />
          <Input value={member.email} name='email' placeholder="email" onChange={this.handleChange} className='inpt'/>
          <Input value={member.phone} name='phone'  placeholder="phone" onChange={this.handleChange} className='inpt'/>
          <label>Date of birth:</label>
          <Input value={member.dateofbirth} name='dateofbirth' type="date" placeholder="dateofbirth"onChange={this.handleChange}  className='inpt'/>
          <label>Category Code:</label>
          <select value={member.categorycode} name='categorycode' onChange={this.handleChange}>
            <option></option>
            {catogaries.map(this.renderCatogaries)}
          </select>
          <label>Date Expiry account :</label>
          <Input value={member.dateexpiry} name='dateexpiry' type="date" placeholder="Expiry Date" onChange={this.handleChange} className='inpt'/>
          <Input value={member.accountLevel} name='accountLevel'  placeholder="accountLevel" onChange={this.handleChange} className='inpt'/>

          <p>Gender: </p>

              <Radio checked='true' type="radio" name="sex" value="mail"  onChange={this.handleChange} className='inpt' ></Radio>
              <label for="contactChoice1">Mail</label>
              <Radio type="radio" id="contactChoice2" name="sex" value="femail"  onChange={this.handleChange} className='inpt'> </Radio>
              <label for="contactChoice2">Femail</label>
              <Radio  id="contactChoice3" name="sex" value="other"  onChange={this.handleChange}className='inpt'> </Radio>
              <label for="contactChoice3">Other</label>

          <Input value={member.password} name='password' placeholder="password" onChange={this.handleChange} className='inpt'/>
          <TextArea value={member.opacnote} name='opacnote' placeholder='Message: ' onChange={this.handleChange}></TextArea>

      <Button type="submit"  onClick={this.handleSubmit} className="btn btn-primary" disabled={!this.state.valid}>Submit</Button>
      </Form>

   
     </Card>

      <Card className='right'>

      <div>
        
        <p>Resualts:{regno},{username} , {firstname} , {address} , {currentAddress} , {city} , {state} , {zipcode} , {country} , {email} , {phone} , {
        dateofbirth} , {categorycode} , {dateexpiry} , {accountLevel} , {sex} , {password}  , {opacnote}
         </p></div>
         
      <History id={this.state.patron} />
      </Card>
  
      </TabPane>  
    </Tabs>
 </main>


    <footer className='footer'>Footer</footer>
  </div>
</div>


    );
    }
}

export default withRouter(ViewPatron);