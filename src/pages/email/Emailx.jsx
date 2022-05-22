import axios from "axios";
import React, { Component } from "react";
import { URL_NODE_API } from "../../Constant";

export default class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailto: "",
      text: "",
      send: false,
      loading: false,
      employe: {},
      gmail: "",
      idEmpl: 0,
    };
  }

 
  handleChangeemailto = (e) => {
    this.setState({ emailto: e.target.value });
  };
  handleChangetext = (e) => {
    this.setState({ text: e.target.value });
  };

  componentDidMount=()=>{
    axios
    .get(URL_NODE_API + `/empl/${this.props.match.params.idEmpl}`)
    .then((res) => {
      this.setState({
        employe: res.data,
        gmail: res.data.gmail,
      });
      // console.log("empl", res.data);
    });
  }

  sendText = (e) => {
    e.preventDefault();

    const data = {
      email: this.state.email,
      text: this.state.text,
    };
    try {
      this.setState({ loading: true });
      axios.post('https://node-server-construction.herokuapp.com/email', data).then((res) => {
        this.setState(
          {
            send: true,
          },
          this.reset()
        );
      });
      this.setState({ loading: false });
      alert(data.message);
    } catch (error) {
      this.setState({ loading: false });
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  reset = () => {
    this.setState({
      email: "",
      text: "",
    });
    setTimeout(() => {
      this.setState({
        send: false,
      });
    }, 2000);
  };

  render() {
    const { load } = this.state.loading;
    const {gmail } = this.state.employe;
    return (
      <div className="container-fluid" style={{marginLeft:"30px"}}>
        <form>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              البريد الالكتروني
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="...@gmail.com"
              name="emailto"
              onChange={this.handleChangeemailto}
              value={gmail}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              الرسالة
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
