import React, {Component, Form, Input} from 'react';
import './AddPatron.css';

export default class History extends Component{
  constructor(props) {
    super(props);
    this.state = {
      booksInMyHand: []
    };

  }
componentDidMount(){
  this.getMyBooks()
}




getMyBooks = _ => {
    fetch(`http://localhost:4000/getMyBooks?regno=${this.props.id}`)
    .then(response => response.json())
    .then(response => this.setState({booksInMyHand: response.data}))
    .catch(err => console.error(err)) 
  }


  renderCatogaries = ({book_brcode, author, title}) => <div key={book_brcode}>{book_brcode +'______________'+ author+'______________'+ title}</div>



  render() {
    const {booksInMyHand} = this.state;
    return (
      
      <div>
        <p>hi amir {this.props.id}</p>
        <div>
          this is your History
          {booksInMyHand.map(this.renderCatogaries)}
        </div>
      </div>
    );
  }
}