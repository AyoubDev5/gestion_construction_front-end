import axios from "axios";
import React, { Component } from "react";
import { URL_SPRING_API } from "../../Constant";
import { Publish } from "@material-ui/icons";
import "./addEmploye.css";

export default class AddEmploye extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empls: [],
      id_empl: 0,
      cne: "",
      lname: "",
      fname: "",
      date_debut: "",
      date_fin: "",
      tele: "",
      price: "",
      image: "",
      gmail: "",
      tache: {},
      idTaches: 0,
      dateDebut: "",
      dateFin: "",
      descriptionTache: "",
      nouveauPrix: "",
      projet: {},
      idProjet: 0,
      nomProjet: "",
      dateDebutProjet: "",
      dateFinProjet: "",
    };
  }
  componentDidMount() {
    axios
      .get(URL_SPRING_API + `/tacheById/${this.props.match.params.idTache}`)
      .then((res) => {
        this.setState({
          tache: res.data,
          idTaches: res.data.idTaches,
          dateDebut: res.data.dateDebut,
          dateFin: res.data.dateFin,
          descriptionTache: res.data.descriptionTache,
          nouveauPrix: res.data.nouveauPrix,
        });
        // console.log("tache data", res.data);
      });
    axios
      .get(URL_SPRING_API + `/projetById/${this.props.match.params.idProjet}`)
      .then((res) => {
        this.setState({
          projet: res.data,
          idProjet: res.data.idProjet,
          nomProjet: res.data.nomProjet,
          dateDebutProjet: res.data.dateDebut,
          dateFinProjet: res.data.dateFin,
        });
        // console.log("projet data", res.data);
      });
  }

  submit(event) {
    event.preventDefault();
    axios
      .post(URL_SPRING_API + "/addEmpl", {
        cne: this.state.cne,
        lname: this.state.lname,
        fname: this.state.fname,
        date_debut: this.state.date_debut,
        date_fin: this.state.date_fin,
        tele: this.state.tele,
        price: this.state.price,
        image: this.state.image,
        gmail: this.state.gmail,
        tache: {
          idTaches: this.state.idTaches,
          dateDebut: this.state.dateDebut,
          dateFin: this.state.dateFin,
          descriptionTache: this.state.descriptionTache,
          nouveauPrix: this.state.nouveauPrix,
          projet: {
            idProjet: this.state.idProjet,
            nomProjet: this.state.nomProjet,
            dateDebutProjet: this.state.dateDebutProjet,
            dateFinProjet: this.state.dateFinProjet,
          },
        },
      })
      .then((res) => {
        this.componentDidMount();
        this.setState({
          cne: "",
          lname: "",
          fname: "",
          date_debut: "",
          date_fin: "",
          tele: "",
          price: "",
          image: "",
          gmail: "",
        });
      });
  }
  render() {
    return (
      <div className="newUser">
        <h1 className="newUserTitle">عامل جديد</h1>
        <form className="newUserForm" onSubmit={(e) => this.submit(e)}>
          <div className="newUserItem">
            <label>الاسم</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => this.setState({ fname: e.target.value })}
              value={this.state.fname}
            />
          </div>
          <div className=" newUserItem userUpdateRight">
            <div className="userUpdateUpload">
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <label htmlFor="file">
              <Publish className="userUpdateIcon" /> اختر صورة
            </label>
          </div>
          <div className="newUserItem">
            <label>النسب</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => this.setState({ lname: e.target.value })}
              value={this.state.lname}
            />
          </div>
          <div className="newUserItem">
            <label>البريد الالكتروني</label>
            <input
              type="gmail"
              placeholder=""
              onChange={(e) => this.setState({ gmail: e.target.value })}
              value={this.state.gmail}
            />
          </div>
          {/* <div className="newUserItem">
            <label>رقم البطاقة الوطنية</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => this.setState({ cne: e.target.value })}
              value={this.state.cne}
            />
          </div> */}
          <div className="newUserItem">
            <label>الهاتف</label>
            <input
              type="text"
              placeholder="+1 123 456 78"
              onChange={(e) => this.setState({ tele: e.target.value })}
              value={this.state.tele}
            />
          </div>
          <div className="newUserItem">
            <label>بداية العمل</label>
            <input
              type="date"
              placeholder=""
              onChange={(e) => this.setState({ date_debut: e.target.value })}
              value={this.state.date_debut}
            />
          </div>
          <div className="newUserItem">
            <label>نهاية العمل</label>
            <input
              type="date"
              placeholder=""
              onChange={(e) => this.setState({ date_fin: e.target.value })}
              value={this.state.date_fin}
            />
          </div>
          <div className="newUserItem">
            <label>الراتب</label>
            <input
              type="number"
              placeholder=""
              onChange={(e) => this.setState({ price: e.target.value })}
              value={this.state.price}
            />
          </div>
          <button className="newUserButton">اضافة</button>
        </form>
      </div>
    );
  }
}
