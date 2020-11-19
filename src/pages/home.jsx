import React, {Component} from 'react';
//import logo from './logo.svg';
import './home.css';
import { BrowserRouter as Router, withRouter, Route, Link } from 'react-router-dom';
import moment from 'moment';
import My_checkouts from  '../components/my_checkouts'
import SideNav from  '../components/sideNav'

import { LogoutOutlined, LoginOutlined, RetweetOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import {Card, Alert, message, Layout, Button, Icon, Avatar,Input, Tabs} from 'antd';


//https://www.npmjs.com/package/react-keyboard-event-handler
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Date } from 'core-js';
import { breakStatement } from '@babel/types';

const { TabPane } = Tabs;
const { Meta } = Card;


//import Import_books from './pages/import_books';
//amir react full stack based on this app
// https://www.youtube.com/watch?v=HPIjjFGYSJ4&t=1021s
// for run the node server post:4000 must be run....

class Home extends Component{
    state = {
      products:[],
      product: {
        name: 'sample product',
        price: 20
      },
      user: '',
      members:[],
      books:[],
      checkOutBooks: [],
      member: {
        memberUsername: null,
        memberRegno: null,
      },
      book: {
        bookBarcode: null,
        bookName: null,
      },
      // Check in
      bookCheckInBarcode: null,
      bookCheckInName: null,
      // Renew
      bookRenewBarcode: null,
      bookRenewName: null,

      errMsg: '',
      checkOutBook: false,
      typed_into: false,
      typed_into_checkIn: false,
      dueDate: null,
      booksInMyHand: []
    }
  
    componentDidMount(){
      this.getProducts();
      this.setState({user: sessionStorage.getItem('user')})
      this.getMembers()
      this.getBooks()
      this.checkOutBooks();
      this.getDueDate();
      this.getMyBooks()

      
    }
  
    getDueDate = _ => {
      fetch(`http://localhost:4000/dueDate`)
      .then(response => response.json())
      .then(response => this.setState({dueDate: response.data[0].due_date}))
      .catch(err => console.error(err))
      
    }
  
    getMembers = _ => {
      fetch(`http://localhost:4000/getMembers`)
      .then(response => response.json())
      .then(response => this.setState({members: response.data}))
      .catch(err => console.error(err))
    }
    
    getBooks = _ => {
      fetch(`http://localhost:4000/getBooks`)
      .then(response => response.json())
      .then(response => this.setState({books: response.data}))
      .catch(err => console.error(err)) 
    }
  
    checkOutBooks = _ =>{
      fetch(`http://localhost:4000/checkOutBooks`)
      .then(response => response.json())
      .then(response => this.setState({checkOutBooks: response.data}))
      .catch(err => console.error(err)) 
    }
  /////////////////////////////////// DATE FORMATION ///////////////////////////
    setDueDate = _ =>{
      let date = new Date();
      var a = moment(date).add(14, 'days'); 
      //var b = a.format("YYYY-MM-DD");
      var b = a.format("YYYY-MM-DD");
      //this.setState({dueDate: b})
  
      //var month = b.format('M');
      //var day   = b.format('D');
      //var year  = b.format('YYYY');
  
      alert('testing date')
      fetch(`http://localhost:4000/setDueDate?dueDate=${b}`)
    }
  
    setSpecialDueDate = (e) =>{
      var inputDate = e.target.value;
      var a = moment(inputDate).format("YYYY-MM-DD");
      this.setState({dueDate: a})
      alert(a)
    }
  
    checkMember = (e) =>{
      const {member,members} = this.state;
      members.map(items => {
          if(items.regno == e.target.value){
            this.setState({member: {...member, memberRegno: items.regno , memberUsername: items.username}});
            this.getMyBooks()
          }else{
            this.setState({errMsg: ''})
          }
      })  

    }
  
    
  onKeyPress = (e) =>{
    this.setState({typed_into: true, checkOutBook: false})
    this.checkOutBooks(); 
    
  }
  
  
  checkOut = _ => {
    const {book, member, checkOutBook, user, dueDate } = this.state; 
    alert(checkOutBook + dueDate)
    if(checkOutBook == false && member.memberRegno != null && book.bookBarcode != null){
     fetch(`http://localhost:4000/check_out?memberBarcode=${member.memberRegno}&bookBarcode=${book.bookBarcode}&admin=${user}&dueDate=${dueDate}`) 
     .catch(err => console.error(err))
      this.setState({book: {...book, bookBarcode: null}})
      this.setState({ checkOutBook: false})
      this.refs.input2.value = "";
      alert('USER TYPE BOOK successfully deliverd!');
      this.setState({msg: <Alert message={'USER TYPE BOOK successfully deliverd!'} type='success' closable />})
    }else{
    }

    this.getMyBooks()
  }
  
  
  
  onChange = (e) =>{
    const {typed_into, book, books, checkOutBooks, checkOutBook, member, user, dueDate} = this.state
    let checkOutStatus  = false;

   // if (typed_into) { ////////////// FOR USER INPUT CHECKOUT /////////////
        books.map(items => {
          if(items.barcode == e.target.value){
            this.setState({book: {...book, bookBarcode: items.barcode, bookName: items.title}})
            this.setState({msg: ''})
            this.getMyBooks()
              checkOutBooks.map(outItems => {
                if(outItems.book_brcode == e.target.value){
                  this.setState({checkOutBook: true})
                   //error
                  this.setState({msg: <Alert message={outItems.book_brcode +' this book already taken by '+ outItems.member_brcode} type='warning' closable />})

                }else{
                  //alert('you can take this book');
                
                }
              })
      
          }else{
      
          }
      })
    
    }
       // alert('user type')
       // this.setState({typed_into: false}) //reset type listener
       /*else {             ////////////// FOR BARCODE CHECKOUT /////////////
        //alert('Barcode')
        
    books.map(items => {
      if(items.barcode == e.target.value){
        this.setState({book: {...book, bookBarcode: items.barcode, bookName: items.title}})
        this.setState({errMsg: '---'})
        checkOutStatus  = true;
          checkOutBooks.map(outItems => {
            if(outItems.book_brcode == e.target.value){
               alert(items.barcode + 'this book already taken');
               checkOutStatus  = false;
            }else{
             // alert('you can take this book')
            }
          })
      }else{
      }
  })  
  
   /* if(checkOutStatus){
      if(member.memberRegno != null && e.target.value != ''){
      fetch(`http://localhost:4000/check_out?memberBarcode=${member.memberRegno}&bookBarcode=${e.target.value}&admin=${user}&dueDate=${dueDate}`) 
      alert('BARCODE BOOK successfully deliverd!');
      this.checkOutBooks(); 
      this.setState({ checkOutBook: false})
      this.refs.input2.value = "";
    }else {alert ('Enter the barcode')}
  }
  */
   
          ///////////////////////////////////////////////////////////////////
          /////////////////////////// CHECK IN //////////////////////////////
          ///////////////////////////////////////////////////////////////////
  
  onKeyPressCheckIn = (e) =>{
    this.setState({typed_into_checkIn: true})
    this.checkOutBooks();        
  }
  
  checkIn = _ => {
    //alert('works adding book')
    const {bookCheckInBarcode} = this.state; 
    if(bookCheckInBarcode){
      fetch(`http://localhost:4000/check_in?bookBarcode=${bookCheckInBarcode}`)
      //.then(response => response.json())
      //.then(response => this.setState({products: response.data}))
      .catch(err => console.error(err))
      this.refs.checkIn.value = "";
      alert('USER TYPE BOOK successfully CHECkIN!');
    }else alert('No books check out for this barcode')
  }
  
  
  onChangeCheckIn = (e) => {
    const {typed_into_checkIn, checkOutBooks, books, book, members, member} = this.state
   //let checkInStatus  = false;
  
    //if (typed_into_checkIn) { ////////////// FOR USER INPUT CHECKIN  /////////////
       //alert('user type')
       checkOutBooks.map(outItems => {
        if(outItems.book_brcode == e.target.value){
          alert(outItems.book_brcode + outItems.member_brcode)
          this.getMyBooks()
              ////// For cheked in book 
              books.map(items => {
                if(items.barcode == outItems.book_brcode){
                  this.setState({bookCheckInBarcode: items.barcode, bookCheckInName: items.title})
                }else{
                 // this.setState({bookCheckInBarcode: '', bookCheckInName: ''})
                }
                })
              ////// For Check in Patron 
              members.map(items => {
                if(items.regno == outItems.member_brcode){
                  this.setState({member: {...member, memberRegno: items.regno , memberUsername: items.username}});
                  this.setState({errMsg: '---'})
                }else{
                 // this.setState({member: {...member, memberRegno: '' , memberUsername: ''}});
                }
              }) 
        }else{}
      })
    }
          
         // checkInStatus = true;
      // }else{}
     // });
       // this.setState({typed_into_checkIn: false}) //reset type listener
     // } else {             ////////////// FOR BARCODE CHECKIN /////////////
       /* alert('Barcode')
          checkOutBooks.map(outItems => {
            if(outItems.book_brcode == e.target.value){
               ////// For cheked in book 
                books.map(items => {
                  if(items.barcode == e.target.value){
                    this.setState({bookCheckInBarcode: items.barcode, bookCheckInName: items.title})
                  }else{}
                  })
                ///////////
               checkInStatus = true;
            }else{
             //alert('--------------')
            }
          })
  
      if(checkInStatus){
        if(e.target.value != ''){
          fetch(`http://localhost:4000/check_in?bookBarcode=${e.target.value}`)
        alert('BARCODE BOOK successfully Checked in!');
        this.checkOutBooks(); 
        this.refs.checkIn.value = "";
      }else {alert ('Enter the barcode')}
    }
  
    }
  } ////////////// END BARCODE CHECKIN */
  
  
  
          ///////////////////////////////////////////////////////////////////
          /////////////////////////// RENEW //////////////////////////////
          ///////////////////////////////////////////////////////////////////
  
          onKeyPressRenew = (e) =>{
            this.setState({typed_into_checkIn: true})
            this.checkOutBooks();        
          }
          
          Renew = _ => {
            //alert('works adding book')
            const {bookRenewBarcode, dueDate} = this.state; 
            let dateTime = moment(dueDate).format("YYYY-MM-DD");
            alert(dateTime +"-------------------"+ bookRenewBarcode)
  
            if(bookRenewBarcode){
              fetch(`http://localhost:4000/renew?bookBarcode=${bookRenewBarcode}&dueDate=${dateTime}`)
              .catch(err => console.error(err))
              this.refs.Renew.value = "";
              alert('USER TYPE BOOK successfully RENEWED!');
            }else alert('No books check out for this barcode')
          }
          
          
          onChangeRenew = (e) => {
            const {typed_into_checkIn, checkOutBooks, books, book, members, member} = this.state
            let checkInStatus  = false;
          
            if (typed_into_checkIn) { ////////////// FOR USER INPUT CHECKIN  /////////////
               //alert('user type')
               checkOutBooks.map(outItems => {
                if(outItems.book_brcode == e.target.value){
                  alert(outItems.book_brcode + outItems.member_brcode)
                  ////// For cheked in book 
                  books.map(items => {
                    if(items.barcode == e.target.value){
                      this.setState({bookRenewBarcode: items.barcode, bookRenewName: items.title})
                    }else{}
                    })
                  //////////
                  ////// For Check in Patron 
                  members.map(items => {
                    if(items.regno == outItems.member_brcode){
                      this.setState({member: {...member, memberRegno: items.regno , memberUsername: items.username}});
                      this.setState({errMsg: '---'})
                    }else{
                    }
                }) 
                  
                  checkInStatus = true;
                }else{}
              })
                this.setState({typed_into_checkIn: false}) //reset type listener
              } else {             ////////////// FOR BARCODE CHECKIN /////////////
               // alert('Barcode')
                  checkOutBooks.map(outItems => {
                    if(outItems.book_brcode == e.target.value){
                       ////// For cheked in book 
                        books.map(items => {
                          if(items.barcode == e.target.value){
                            this.setState({bookCheckInBarcode: items.barcode, bookCheckInName: items.title})
                          }else{}
                          })
                        ///////////
                       checkInStatus = true;
                    }else{
                     //alert('--------------')
                    }
                  })
          
              if(checkInStatus){
                if(e.target.value != ''){
                  fetch(`http://localhost:4000/check_in?bookBarcode=${e.target.value}`)
                alert('BARCODE BOOK successfully Checked in!');
                this.checkOutBooks(); 
                this.refs.checkIn.value = "";
              }else {alert ('Enter the barcode')}
            }
          
            }
          } ////////////// END BARCODE CHECKIN
  
  
      getProducts = _ =>{
        const {product} = this.state;
         fetch(`http://localhost:4000/getposts`)
          .then(response => response.json())
          .then(response => this.setState({products: response.data}))
          .catch(err => console.error(err))
      }
  
      addProducts = _ => {
        const {user} = this.state;
        // fetch(`http://localhost:4000/getposts/add?title=amir&body=a test to ckeck`) 
         fetch(`http://localhost:4000/addProducts?title=${user}`) 
          //.then(response => response.json())
          .then(this.getProducts)
          //.then(response => this.setState({products: response.data}))
          .catch(err => console.error(err))
          alert('works..')
      }
  
  
      deleteProducts = (id) => {
         fetch(`http://localhost:4000/deletepost?id=${id}`) 
          .then(this.getProducts)
          .catch(err => console.error(err))
      }
  
      logOut = () =>{
        sessionStorage.removeItem('user');
        sessionStorage.clear();
        this.props.history.push("/")
        this.setState({user: ''})
      }
  
  
getMyBooks = _ => {
  fetch(`http://localhost:4000/getMyBooks?regno=${this.state.member.memberRegno}`)
  .then(response => response.json())
  .then(response => this.setState({booksInMyHand: response.data}))
  .catch(err => console.error(err)) 
}
renderMyCheckOutBooks = ({book_brcode, author, title, ckeck_out_date, due_date}) => {
          let statusColor= ''
          if(ckeck_out_date>=due_date){
            statusColor= 'red'
          }else {

          }
          return(
          <div>
            
            <a href={'viewBook/'+book_brcode} key={book_brcode}><b>{book_brcode} - </b>
            { author+' | '+ title+' | '}
            <i style={{color: 'rgb(97, 97, 97)'}}> Check out date: </i>{ckeck_out_date.toString().substring(0, 10)}
            <span style={{color: statusColor}}><i style={{color: 'rgb(97, 97, 97)'}}> Due date: </i>{due_date.toString().substring(0, 10)}</span></a></div>
          );
        }

  
        //renderProduct = ({id, title, body}) => <div key={id}>{title +'______________'+ body}<button onClick={this.deleteProducts.bind(this, id)}>X</button></div>
  
      render(){
        const { products, product, user, member, booksInMyHand, book, errMsg, checkOutBooks, checkOutBook, dueDate, bookCheckInBarcode, bookCheckInName} = this.state;
        // check out member and book results  && book.bookBarcode
        var checkOutResultMember;

        if(member.memberRegno){

          let link = 'viewPatron/'+ member.memberRegno;
          checkOutResultMember =
          <div style={{display: 'flex'}}>
          <div>
          <img src={"/mem_photos/"+member.memberRegno+".jpg"} alt={member.memberRegno+".jpg"}/>
          </div>
          <div className='details'>
          <h4>Member Info</h4>
          <p>Id: <a href={link} style={{fontSize: '26px'}}>{member.memberRegno}</a></p>
          <p>Name: <a href={link}>{member.memberUsername}</a></p>
          </div>
        </div>
         }else{
          checkOutResultMember = <div><p>No Member selected!</p></div>}
  
        var checkOutResultBook;
        if(book.bookBarcode){
            let link = 'viewBook/'+ book.bookBarcode;
            checkOutResultBook = 
        <div style={{display: 'flex'}}>
        <div>
        <img style={{rotate: '0deg'}} src={"/book.png"} alt={"Book Image"}/>
        </div>
        <div className='details'>
        <h4>Book Info</h4>
        <p>Id: <a href={link} style={{fontSize: '26px'}}>{book.bookBarcode}</a></p>
        <p>Name: <a href={link}>{book.bookName}</a></p>
        </div>
      </div>
      }else {checkOutResultBook = <div><p>No Book selected!</p></div>}
  
  
  
        // CKECK IN results
        var checkInResults;
        if(bookCheckInBarcode)
        {
        checkInResults = <div><p>The Book is {bookCheckInBarcode +'|'+ bookCheckInName}The Member is {this.state.member.memberUsername}{this.state.member.memberRegno}</p></div>;
        }
        else{
          checkInResults = <div><p>CHECK IN NO</p></div>
        }
        
  

      if(user){
       return (
<div classNamea='App'>
  <SideNav/>
  <div className='Content'>
{/*_________________________________________DUE DATE____________________________________________*/}
    <main className='main'>
      
      <div className='dueDate'>
     
      Due Date: {dueDate}<input 
                value = '12-12-2012'
                ref='dueDate'
                id='dueDate' 
                type='date'
                onChange={this.setSpecialDueDate}/>
                <button onClick={this.setDueDate}>Set</button>
                </div>



    <Tabs defaultActiveKey="1" className='Tabs'>
{/*_________________________________________CHECK OUT____________________________________________*/}
      <TabPane tab={<span><LogoutOutlined />Check Out</span>}key="1">
      <div style={{display: 'flex'}}>
         <div className='input_' >
         <Input  allowClear  id='input'
            ref="input1"
            onChange={this.checkMember} />
        </div>
        <div className='input_'>
         <KeyboardEventHandler
           handleKeys={['backspace']}
           onKeyEvent={(key, e) =>  this.setState({typed_into: true})} >
         <Input allowClear  id='input'
            ref="input2"
            onChange={this.onChange}
            onKeyPress={this.onKeyPress} />
        </KeyboardEventHandler>
        </div>
        <div className='input_' >
        <Button onClick={this.checkOut} id='btn' ><LogoutOutlined />Check out</Button>
        </div>
       </div>
       {this.state.msg}
                <Card className='card'>
                <div className='member_details'> {checkOutResultMember}</div>
                <div className='book_details'> {checkOutResultBook} </div>
   
                </Card>
      </TabPane>

{/*_________________________________________CHECK IN____________________________________________*/}
      <TabPane tab={<span><LoginOutlined /> Check In</span>}key="2">
      <div style={{display: 'flex'}}>
        
        <div className='input_'>
         <KeyboardEventHandler
           handleKeys={['backspace']}
           onKeyEvent={(key, e) =>  this.setState({typed_into_checkIn: true})} >
         <Input allowClear  id='input'
            ref="checkIn"
            onChange={this.onChangeCheckIn}
            onKeyPress={this.onKeyPressCheckIn} />
        </KeyboardEventHandler>
        </div>
        <div className='input_' >
        <Button onClick={this.checkIn} id='btn' ><LoginOutlined />Check In</Button>
        </div>
       </div>
                <Card>
                {checkInResults}
                {errMsg}
                </Card>
      </TabPane>

{/*_________________________________________RENEW____________________________________________*/}
      <TabPane tab={<span><RetweetOutlined /> Renew</span>}key="3">
      <div style={{display: 'flex'}}>
        
        <div className='input_'>
         <KeyboardEventHandler
           handleKeys={['backspace']}
           onKeyEvent={(key, e) =>  this.setState({typed_into_checkIn: true})} >
         <Input allowClear  id='input'
            ref="Renew"
            onChange={this.onChangeRenew}
            onKeyPress={this.onKeyPressRenew} />
        </KeyboardEventHandler>
        </div>
        <div className='input_' >
        <Button onClick={this.Renew} id='btn' ><RetweetOutlined />Renew</Button>
        </div>
       </div>  
      </TabPane>
      
    </Tabs>

    <Card>
    <div>
          Recently deliverd books...
          {booksInMyHand.map(this.renderMyCheckOutBooks)}
     </div>
                {errMsg}
     </Card>

    {/*    Library Details      */}
     <div style={{opacity: 0.7}}>{checkOutBooks.length} Books Check Outed | Total {this.state.books.length} Books</div>
    </main>

    <footer className='footer'>
      <h4>Team TAG Kerala</h4>
      <a  href=''>amirabbasyk@gmail.com</a></footer>
  </div>
</div>
      );
      }else{
        return(<div><Link to='/'>plz log in</Link></div>)
      }
    }

  }
    
export default withRouter(Home);
