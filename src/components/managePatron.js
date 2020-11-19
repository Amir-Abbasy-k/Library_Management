import React, {Component, Form} from 'react';
import { BrowserRouter as Redirect, withRouter } from "react-router-dom";



import { List, Input, Button, Popconfirm, Icon, Card } from 'antd';
import Column from 'antd/lib/table/Column';
//import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';




class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
            allPatronBatch: []
          };
    
      }

  componentDidMount() {
    this.GetPatronArrays()
  }
  
  
  GetPatronArrays = _ => {
    const {member} = this.state;
    fetch(`http://localhost:4000/GetPatronArrays`)
    .then(response => response.json())
    .then(response => this.setState({allPatronBatch: response.data[0].PatronCatogary}))
    .catch(err => console.error(err))
  }

  
  deleteBatch = (index) =>{
      let Q = `DELETE FROM members WHERE categorycode='${index}'`;
    fetch(`http://localhost:4000/Delete?Q=${Q}`)
    .catch(err => console.error(err))
    alert('delete Book')
  }


  printBatch = _ =>{
      //alert('print Book')
  }
 
  renderCatogaries = (index) =>
      <Card style={{display: 'flex'}}>
     <h3 style={{float: 'left'}}>{index}</h3>
      <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteBatch(index)} >
        <Button><Icon type="delete" style={{ fontSize: '16px', color: 'red' }} theme="outlined" />Delete</Button>
      </Popconfirm>
      <Button><Icon type="home" style={{ fontSize: '16px', color: 'green' }} theme="outlined" onClick={this.printBatch(index)}/>Print</Button>
      </Card>
     
    

  render() {
    let catogaries = this.state.allPatronBatch.toString().split(",");    


    return (
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title="Inner Card title"
        extra={<a href="#">help</a>}
      >
         {catogaries.map(this.renderCatogaries)}
     
  </Card>);
      
  }

  
}



export default withRouter(Test);
