import React, {Component, Form} from 'react';
import { BrowserRouter as Redirect, withRouter } from "react-router-dom";



import { Table, Input, Button, Popconfirm, Icon } from 'antd';
//import Highlighter from 'react-highlight-words';
//import { SearchOutlined } from '@ant-design/icons';

const SearchOutlined = 'book.png';
const dajta = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    d: 'ghgfhgfgfgfh'
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

class Test extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };


  componentDidMount() {
    this.funFilter()    
  }
  
  
    funFilter = _ =>{
      const {words} = this.state;
      fetch(`http://localhost:4000/getBooks`)
      .then(response => response.json())
      .then(response => this.setState({data: response.data}))
      .catch(err => console.error(err)) 
      //alert(this.state.catagory)
    }


    
  handleDelete = barcode => {
    alert(barcode)
  };

    



  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
       <div></div>
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  render() {
    const columns = [
      {
        title: 'author',
        dataIndex: 'author',
        key: 'author',
        width: '30%',
        ...this.getColumnSearchProps('author'),
      },
      {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
        width: '20%',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: 'barcode',
        dataIndex: 'barcode',
        key: 'barcode',
        ...this.getColumnSearchProps('barcode'),
        render: (text, record) => (
          <span>
            <a style={{ marginRight: 16 }} href={'viewBook/'+record.barcode}>{record.barcode}</a>
          </span>
        ),
      },
      {
        title: 'Action',
        dataIndex: 'barcode',
        key: 'barcode',
        render: (text, record) => (
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.barcode)}>
            <Button><Icon type="delete" style={{ fontSize: '16px', color: 'red' }} theme="outlined" /></Button>
          </Popconfirm>
        ),
      },
    ];
    return (
      <div>
    <Table columns={columns} dataSource={this.state.data} bordered={true} size='small'/>
    </div>);
      
  }

  
}




export default withRouter(Test);
