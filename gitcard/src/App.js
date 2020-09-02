import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state={
    users: [],
    userText:' ',
    error:' ',
  };

  componentDidMount(){
    axios.get('https://api.github.com/users/')
    .then(res =>{
      this.setState({
        users: res.data.followers
      });
    })
    .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.users !== this.state.users){
      if(this.state.userText === 'lambda'){
        axios.get('https://api.github.com/users/')
        .then(res =>{
          this.setState({
            users:res.data.followers,
            userText: 'blank'
          });
        })
        .catch(err => console.log(err));
      }
    }
  }
}

handleChanges = e =>{
  this.setState({
    users: e.target.value
  });
};

fetchUsers = e =>{
  e.preventDefauly()
  axios.get(`https://api.github.com/users/${this.state.userText}/`)
  .then(res=>{
    this.setState({
      users: res.data.followers,
      error:''
    });
  })
  .catch(err=>{
    this.setState({
      error:'Looks like we hit a snag. Please try again.'
    });
  });
};

render() {
  return (
    <div className='App'>
      <h1>Hello {this.state.user}</h1>
      <input
      type="text"
      value={this.state.userText}
      onChange={this.handlesChanges}
      />
      <button onClick={this.fetchUsers}>Get Users</button>
      {this.state.error && <p style={{color: 'red' }}>{this.state.error}</p>}
    </div>
  );
} 

export default App;
