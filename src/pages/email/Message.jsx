import React, { Component } from "react";
import axios from "axios";

export class Message extends Component {
  state={
    number:"",
    text:"",
    send:false,
    loading:false
  }

  handleChangeEmail = (e) =>{ this.setState({number:e.target.value})}

  handleChangeText = (e) =>{this.setState({text:e.target.value})}
  

  sendText=(e)=>{
    e.preventDefault();

    const data={
      number:this.state.number,
      text:this.state.text
    };
    try{
        this.setState({loading:true})
        axios.post('http://localhost:5000/sms',data)
        .then(res=>{
          this.setState({
            send:true
          },this.reset())
        })
        this.setState({loading:false})
        alert('Successful');
    }
    catch (err) {
      this.setState({loading:false})
      alert(
        err.response && err.response.data.text
          ? 'Error not sending'
          : err
      );
    }  
  }
  reset=()=>{
    this.setState({
      number:"",
      text:""
    })
    setTimeout(()=>{
      this.setState({
        send:false
      })
    },2000)
  }

  render() {
      const{load}=this.state.loading;
    return (
      <div className="container">
        <div className="mb-3" >
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Number Phone
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            name="number"
            placeholder="Put number here"
            value={this.state.number}
            onChange={this.handleChangeEmail}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Message Text
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            name="text"
            placeholder="Put the text here"
            rows="3"
            value={this.state.text}
            onChange={this.handleChangeText}
          ></textarea>
        </div>
        <div className="mb-3">
        <button disabled={load} className="btn btn-primary" onClick={this.sendText}>
                {load ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </div>
    );
  }
}

export default Message;
