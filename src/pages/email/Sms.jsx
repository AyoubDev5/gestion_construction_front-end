import axios from "axios";
import React, { Component } from "react";
import { URL_NODE_API } from "../../Constant";

export default class Sms extends Component {

      state={
        number:"",
        text:"",
        tele:"",
        employe:{},
        send:false,
        loading:false
      }

      componentDidMount=()=>{
        axios
        .get(URL_NODE_API + `/empl/${this.props.match.params.idEmpl}`)
        .then((res) => {
          this.setState({
            employe: res.data,
            tele: res.data.tele,
          });
          // console.log("empl", res.data.tele);
        });
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
            axios.post('https://node-server-construction.herokuapp.com/sms',data)
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
    const { load } = this.state.loading;
    const { tele } = this.state.employe;
    return (
      <div className="container-fluid" style={{marginLeft:"30px"}}>
        <form>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Number phone
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="+1 23456789"
              name="number"
              onChange={this.handleChangenumber}
              value={tele}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Message Text
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="text"
              placeholder="message text here..."
              onChange={this.handleChangetext}
            ></textarea>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              disabled={load}
              type="submit"
              className="btn btn-primary"
              onClick={this.sendText}
            >
              {load ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
