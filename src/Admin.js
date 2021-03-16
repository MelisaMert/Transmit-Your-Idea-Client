import React, { Component } from 'react';
import axios from 'axios';


class Admin extends Component {
  state={
      username:'',
      password:'',
      successLogin: false,
      ideas:''
  }
 
  login = () => {
    const {username,password} = this.state;
    axios.post('http://localhost:5555/login',{username,password}).then(res => {
      if(res.data === 'Success') {
        this.setState({successLogin: true})
        // this.getIdeas();
      } 
    })
  }

  getIdeas = () => {
    axios.get('http://localhost:5555/ideas').then(res => {
       this.setState({ideas:res.data});
    })
  } 

  componentDidMount(){
     this.getIdeas();
  }

  render() {
    if(this.state.successLogin == true){
      return (
          <div className="text-center mt-3">
            <h1 onClick={() => console.log(this.state.ideas)}>Ideas</h1>
            <ul>
              {this.state.ideas.map((item) =><li key={item._id}>{item.suggestion}</li>)}
            </ul>
          </div>
      );
    }
    return (
        <div className="text-center mt-3">
          <h1>Admin Panel Login Form</h1>
        <div className="mx-auto w-25 mt-5">
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">User Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
            placeholder="User Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
            value={this.state.password}
            placeholder="Password"
            onChange={(e) => this.setState({ password: e.target.value })}
           />
        </div>
        <button className="btn btn-success w-100" onClick={this.login}>
           Send
        </button>
        <div>
        </div>
      </div>
      </div>
    );
  }
}

export default Admin;
