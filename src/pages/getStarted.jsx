import React, {Component, Form} from 'react';
import { BrowserRouter as Redirect, withRouter } from "react-router-dom";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import '../App.css'

class Test extends Component {  

  state = {
    createDatabase: true,
    createTables: true,
    insertDatas: true,
    loaded: 0,
    loaded2: 0,
    loaded3: 0,

  }


    createDatabase = _ => {
        fetch(`http://localhost:4000/createDatabase`)
        .then(response => response.json())
        .catch(err => console.error(err))
        .then(response => this.setState({createDatabase: false, createTables: false, loaded: 100}))

    }
    createTables = _ => {
      let loaded = [25,50,75,100];
      //let sql = 'CREATE TABLE '+sql_query+'(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
      let q1 = 'CREATE TABLE members(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
      let q2 = 'CREATE TABLE members2(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
      let q3 = 'CREATE TABLE members3(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
      let q4 = 'CREATE TABLE members4(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
     
      let sql_query = [q1, q2, q3,q4];

      for(let i = 0; i<=3; i++){
       fetch(`http://localhost:4000/createTable?sql_query=${sql_query[i]}`)
        .then(response => response.json())
        .catch(err => console.error(err))
        .then(response => this.setState({insertDatas: false, loaded2: loaded[i]}))

      }

    }

    


  render() {
   
    return (
      <div>
        <button onClick={this.createDatabase}>Create Library Database</button>
        <div className='in'><div className='i' style={{width:this.state.loaded}}></div></div>

        <button onClick={this.createTables} disabled={this.state.createTables}>Create Tables for Library</button>
        <div className='in'><div className='i' style={{width:this.state.loaded2}}></div></div>

        <button onClick={this.insertDatas} disabled={this.state.insertDatas}>Insert Datas for Library</button>
        <div className='in'><div className='i' style={{width:this.state.loaded3}}></div></div>

      </div>
    )
  }
}



export default withRouter(Test);
