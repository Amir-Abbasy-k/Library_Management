import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, withRouter, Route, Link, Switch } from "react-router-dom";

import { PoweroffOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import {Button,Avatar} from 'antd';

import Home from './pages/home';
import Test from './pages/test';
import Books from './pages/books';
import Login from './pages/login';
import Search from './pages/search';
import Patrons from './pages/patrons';
import ViewPatron from './pages/viewPatron';
import ViewBook from './pages/viewBook';

class App extends Component{

state = {
  user: '',
}
  componentDidMount(){
    this.setState({user: sessionStorage.getItem('user')})
    
  }


  logOut = () =>{
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    //this.props.history.push("/")
   // this.setState({user: ''})
  }


  render(){
    const {user} = this.state;

    
    const styles={
      library:{
        backgroundColor: '#555',
        width: '50%'
      }
    }

    
      return(
        <Router>
          {
          <div className='top_bar'>
                 <header className='header'>
                  
                      <div className='pagesLink'>
                          <Link to="/home">Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Link to="/Patrons">Patrons</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Link to="/books">Cataloging</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Link to="/search">Search</Link>
                      </div>
                      <div className='admin'>
                        <Avatar  size="large" icon="user" ></Avatar> Admin : {user}
                        <Button onClick={this.logOut}><Link to="/"><PoweroffOutlined /></Link> </Button>
                      </div>
                </header>
          </div>
          }
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/test' component={Test} />
            <Route exact path='/books' component={Books} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/patrons' component={Patrons} />
            <Route exact path='/viewPatron/:id' component={ViewPatron} />
            <Route exact path='/viewBook/:id' component={ViewBook} />
          </Switch>
        </Router>
  
      );

    }
}


export default App;
