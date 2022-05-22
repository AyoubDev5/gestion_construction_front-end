import { Component } from "react";
import axios from "axios";
import Projets from "./Projets";
import { URL_NODE_API, URL_SPRING_API } from "../../Constant";
import { AddCircle } from "@material-ui/icons";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { Alert, AlertTitle } from "@mui/material";
import { useAlert } from "react-alert";
import "./projet.css";

export class Projet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projets: [],
      isToggle: false,
      idProjet: 0,
      nomProjet: "",
      dateDebut: "",
      dateFin: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ isToggle: !this.state.isToggle });
  }
  componentDidMount() {
    axios.get(URL_NODE_API + "/projet", {}).then((response) => {
      this.setState({
        projets: response.data.rows,
      });
    });
  }

  submit(event, id) {
    const successMessage = document.querySelector("#success");
    event.preventDefault();
    if (id === 0) {
      axios
        .post(URL_SPRING_API + "/addProjet", {
          nomProjet: this.state.nomProjet,
          dateDebut: this.state.dateDebut,
          dateFin: this.state.dateFin,
        })
        .then((res) => {
          this.componentDidMount();
          this.setState({
            nomProjet: "",
            dateDebut: "",
            dateFin: "",
          });
          // handleClose = () => {
          //   console.log("this vaut :", this);
          // };
          //successMessage.innerHTML =
          //  "<Alert  severity='success'><AlertTitle>Success</AlertTitle></Alert> — <strong>بنجاح</strong>  لقد ازداد";
        });
    }
  }

  render() {
    return (
      <div className={this.props.darkMode ? "dark" : "projet"}>
        <div className="container">
          <div className="row">
            {this.state.projets?.map((projet) => (
              <div className="col-4 cardprojet">
                <Projets projet={projet} {...this.props} />
              </div>
            ))}
          </div>
        </div>
        <div className="newProjet ">
          <div className="btn_add_projet">
            <button className="newProjetButton" onClick={this.handleClick}>
              <AddCircle />
              بناء مشروع جديد
            </button>
          </div>
          <div style={{ display: this.state.isToggle ? "block" : "none" }}>
            <h1 className="newProjetTitle">مشروع جديد</h1>
            <Form onSubmit={(e) => this.submit(e, this.state.idProjet)}>
              <Form.Field>
                <label>اسم المشروع</label>
                <input
                  onChange={(e) => this.setState({ nomProjet: e.target.value })}
                  value={this.state.nomProjet}
                  type="text"
                  placeholder="اسم المشروع"
                />
              </Form.Field>
              <Form.Field>
                <label>تارخ البدء</label>
                <input
                  onChange={(e) => this.setState({ dateDebut: e.target.value })}
                  value={this.state.dateDebut}
                  type="date"
                  placeholder="yyyy-mm-dd"
                />
              </Form.Field>
              <Form.Field>
                <label>تارخ الانتهاء</label>
                <input
                  onChange={(e) => this.setState({ dateFin: e.target.value })}
                  value={this.state.dateFin}
                  type="date"
                  placeholder="yyyy-mm-dd"
                />
              </Form.Field>
              <Button type="submit">انشاء</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Projet;
