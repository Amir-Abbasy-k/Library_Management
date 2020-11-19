import React, {Component, Form, Input} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class History extends Component{
  constructor(props) {
    super(props);
    this.state = {
      booksInMyHand: [],
      books:[],
    };

  }
componentDidMount(){
  this.getMyBooks()
}




getMyBooks = _ => {
    fetch(`http://localhost:4000/getMyBooks?regno=MEM1`)
    .then(response => response.json())
    .then(response => this.setState({booksInMyHand: response.data}))
    .catch(err => console.error(err)) 
  }


  renderCatogaries = ({book_brcode, author, title}) => <div key={book_brcode}>{book_brcode +'______________'+ author+'______________'+ title}</div>

  print = _ =>{
  let link = 'file:///E:/Node/2020/library_test_ubuntu/PDF/A4.html';
  window.open(link, "_blank");
  alert('ppppda')
}

  render() {
    const {booksInMyHand,members} = this.state;
    return (
      
      <div>
        <p>hi amir {this.props.id}</p>
        <div>
          this is your History
          {booksInMyHand.map(this.renderCatogaries)}
        </div>
        <a  href='/PDF/A4.html'  target="_blank" >Print AA</a>
        <button onClick={this.print}>Print</button>
        <Link to='/PDF/A4.html'>link</Link>
      </div>
    );
  }
}