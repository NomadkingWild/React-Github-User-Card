import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state= {
    user: {},
    followers: [],
    userText:' ',
    error:' ',
  };

  componentDidMount(){
    axios.get('https://api.github.com/users/NomadkingWild')
    .then(res =>{
      console.log(res.data)
      this.setState({
        user: res.data
      });
    })
    .catch(err => console.log(err));

    axios.get('https://api.github.com/users/NomadkingWild/followers')
    .then(res=>{
      this.setState({
        followers:res.data
      });
    })
    .catch(err=> console.log(err));
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.user !== this.state.user){
        this.fetchUsers= e =>{
          e.preventDefault()
          axios.get(`https://api.github.com/users/${this.state.userText}`)
        .then(res =>{
          this.setState({
            user:res.data
          });
        })
        .catch(err => console.log(err));

        axios.get(`https://api.github.com/users/${this.state.userText}/followers`)
        .then(res =>{
          this.setState({
            followers:res.data
          });
        })
        .catch(err => console.log(err));

    }
        }
  }


handleChanges = e =>{
  this.setState({
    userText: e.target.value
  });
};



render() {
  return (
    <div className='App'>
      <h1>Hello, {this.state.user.login}</h1>
      <img src={this.state.user.avatar_url}/>
      <input
      type="text"
      value={this.state.userText}
      onChange={this.handleChanges}
      />
      <button onClick={this.fetchUsers}>Get Users</button>
      {this.state.error && <p style={{color: 'red' }}>{this.state.error}</p>}
      
        {this.state.followers.map(follower=>(
          <div className='followers'>
            <img src= {follower.avatar_url} />
            <p>{follower.login}</p>
          </div>
        ))}
      
    </div>
  );
}
} 

export default App;
