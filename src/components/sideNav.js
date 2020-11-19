import React, {Component} from 'react';
import { BrowserRouter as Redirect, withRouter } from "react-router-dom";
import {  Loading3QuartersOutlined, UploadOutlined ,BarcodeOutlined , SettingOutlined, RollbackOutlined, ContactsOutlined} from '@ant-design/icons';

import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Switch,
  Icon,
  Cascader,
  Select,
  Card,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Avatar,
  Radio 
} from 'antd';

class SideNav extends React.Component {

  render() {
    const styles={
      menu:{
        backgroundColor: '',
        width: '100%'
      },
      btn:{
          width: '40%',
          height: 100,
          marginTop: '5%',
          marginBottom: '5%',
          marginLeft: '5%',
          marginRight: '5%',
          fontSize: 40,

      },
      i:{
        fontSize: 15,
        position: 'relative',
        top: 20,
        right: '70%'
      },
      icon:{
        position: 'relative',
        top: -10,
        left: '18%'
      }
    }
    return (
        <div className='Side'>

        <div style={styles.menu}>

          <Button style={styles.btn}><Loading3QuartersOutlined style={styles.icon}/><i style={styles.i}>Circulation</i></Button>
          <Button style={styles.btn}><BarcodeOutlined style={styles.icon}/><i style={styles.i}> &nbsp;&nbsp;&nbsp;Serials</i></Button>
          <Button style={styles.btn}><SettingOutlined style={styles.icon}/><i style={styles.i}> &nbsp;&nbsp;Settings</i></Button>
          <Button style={styles.btn}><RollbackOutlined style={styles.icon}/><i style={styles.i}> &nbsp;&nbsp;Backup</i></Button>
          <Button style={styles.btn}><ContactsOutlined style={styles.icon}/><i style={styles.i}> &nbsp;About us</i></Button>
          <Button style={styles.btn}><UploadOutlined style={styles.icon}/><i style={styles.i}>Circulation</i></Button>
        </div>

        <ui>
          <li><a href='#'>Circulation</a></li>
          <li><a href='#'>Serials</a></li>
          <li><a href='#'>Settings</a></li>
          <li><a href='#'>Backup</a></li>
          <li><a href='#'>About us</a></li>
        </ui>
        <a href='./PDF/A4.html' target='_blank'>Print A4 Barcodes</a>
        <a href='./PDF/A4.html' target='_blank'>Print Patron Ids</a>

      </div>
    );
  }
}


export default withRouter(SideNav);
