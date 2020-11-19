import React, {Component} from 'react';
import './login.css';
import { BrowserRouter as Redirect, withRouter, Router, Route, Link } from 'react-router-dom';

import logo from '../logo.svg';


import 'antd/dist/antd.css';
import { Slider, Switch, Layout, Alert, Button, Row, Col, Avatar,Input} from 'antd';

//import Import_books from './pages/import_books';
//amir react full stack based on this app
// https://www.youtube.com/watch?v=HPIjjFGYSJ4&t=1021s
// for run the node server post:4000 must be run....


class Login extends Component{
  state = {
    members:[],
    member: {
      inUsername: 'sample product',
      inPassword: 20
    },
    user: false,
    err: false
  }

  componentDidMount(){
    this.getMembers();
  }


  getMembers = _ =>{
      const {member} = this.state;
       fetch(`http://localhost:4000/getMembers`)
        .then(response => response.json())
        .then(response => this.setState({members: response.data}))
        .catch(err => console.error(err))
    }

    renderMembers = ({id, username, password}) => <div key={id}>{username +'______________'+ password}<button>X</button></div>

   checkAdmin = _ => {
    const { members, member } = this.state;

    members.map(items =>
      {
        if(items.username == member.inUsername && items.password == member.inPassword){
          this.setState({user: true})
          sessionStorage.setItem('user', member.inUsername)
          this.props.history.push("/home")
        }else{
          this.setState({err: true})
        }
      })
    
   }

    render(){
      const { members, member } = this.state;

      const thisStyles = {
        App:{
          height: window.height,
        }
      }

      return (
        <div>
        <Row>

          
          <Col span={6} push={18} className='login'>
           <form>
           <Avatar  size="large" icon="user" ></Avatar> 
          <h1 style={{color: '#ffd35a'}}>Log in</h1> 

         
          <Input placeholder='Username' allowClear
          onChange={e => this.setState({member: {...member, inUsername:e.target.value}})} />

          <Input.Password placeholder="password" 
          onChange={e => this.setState({member: {...member, inPassword:e.target.value}})}/>

           { this.state.err && <Alert message="Error" type="error" showIcon className='err' /> }

          <Button type="primary" icon="login" className={this.state.user ? 'yes' : 'no'} onClick={this.checkAdmin}>
            Login
          </Button>
          <hr/>
          </form>
          </Col>


          <Col span={18} pull={6} className='library'>
          <div className='college'>
            <img className='logo' src={logo} />
            <h1 className='name'>NNMIL</h1>
            <strong className='h1'>NANADIYIL MUHAMMED MUSLIYAR MEMMORIA ISLAMIC LIBRARY</strong>
            <p >TAG Ltd - 2019 </p>
          </div>
          </Col>


        </Row>
      </div>

      
        );
    }
}

export default withRouter(Login);
