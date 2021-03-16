import React, { Component } from 'react';
import axios from 'axios';
import Admin from './Admin';
import './App.css';

class App extends Component {
  state = {
    fullName: '',
    emailAddress: '',
    suggestionType: 'Select',
    suggestion: '',
    alertSuccessDisplay: 'none',
    alertErrorDisplay:'none',
    isAdminPanel: false
  }

  componentDidMount() {
  }
 
  cleanInputField = () => {
    this.setState({fullName:'',emailAddress: '',suggestionType:'Select',suggestion: ''});
  }

  formValidation = () => {
     const {fullName,emailAddress,suggestion,suggestionType} = this.state;

     if(!fullName || !emailAddress || !suggestion || !suggestionType ) return false;

     return true;
  }

  sendForm = () => {
    const { fullName, emailAddress, suggestionType, suggestion } = this.state;

    if(!this.formValidation()) return;

    axios.
      post('http://localhost:5555/saveSuggesstion', {
        fullName,
        emailAddress,
        suggestionType,
        suggestion
      })
      .then((res) => {
        this.cleanInputField();
        this.setState({alertSuccessDisplay:'block'});

        setTimeout(() => {
           this.setState({alertSuccessDisplay: 'none'});
        },1500);

      }).catch(err => {
        this.setState({alertErrorDisplay:'block'})
      });
  }

  render() {
    if(this.state.isAdminPanel) return <Admin/>
    return (
      <>
        <div className="text-center mt-3">
          <h1>Let's Transmit Your Idea</h1>

          <div className="mx-auto w-25 mt-5">
            <div className="alert alert-success" role="alert" style={{ display: this.state.alertSuccessDisplay }}>
              Your idea has been delivered successfully
            </div>
            <div className="alert alert-danger" role="alert" style={{ display: this.state.alertSuccessDisplay }}>
              Your idea could not be delivered successfully
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Name Surname</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={this.state.fullName}
                onChange={(e) => this.setState({ fullName: e.target.value })}
                placeholder="Name Surname" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">E-mail Address</label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                value={this.state.emailAddress}
                onChange={(e) => this.setState({ emailAddress: e.target.value })}
                placeholder="E-mail Address" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Suggestion Type</label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                placeholder="Select"
                value={this.state.suggestionType}
                onChange={(e) => this.setState({ suggestionType: e.target.value })}
              >
                <option>General Reporting</option>
                <option>Error Reporting</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Suggestion</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                value={this.state.suggestion}
                placeholder="Suggestion"
                onChange={(e) => this.setState({ suggestion: e.target.value })}
                rows="3">
              </textarea>
            </div>
            <button className="btn btn-success" onClick={this.sendForm}>
               Send
            </button>
            <br/><br/><br/><br/>
            <button className="btn btn-dark" onClick={()=>this.setState({isAdminPanel: true})}>
               ADMIN PANEL
            </button>
            <div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
