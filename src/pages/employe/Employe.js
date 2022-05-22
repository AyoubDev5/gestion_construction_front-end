import React, { Component } from "react";
import axios from "axios";
import DayJS from "react-dayjs";
import {
  AttachMoney,
  CalendarToday,
  Done,
  Email,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./employe.css";
import { URL_NODE_API, URL_SPRING_API } from "../../Constant";

export default class Employe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employe: {},
      id_empl: 0,
      idEmpl: 0,
      cne: "",
      lname: "",
      fname: "",
      date_debut: "",
      date_fin: "",
      tele: "",
      price: "",
      image: "",
      gmail: "",
      taches: [],
      idTaches: 0,
      date_debut: "",
      date_fin: "",
      descriptionTache: "",
      nouveauPrix: "",
      projet: {},
      idProjet: 0,
      nomProjet: "",
      dateDebut: "",
      dateFin: "",
    };
  }

  componentDidMount() {
    axios
      .get(URL_NODE_API + `/empl/${this.props.match.params.idEmpl}`)
      .then((res) => {
        this.setState({
          employe: res.data,
          cne: res.data.cne,
          lname: res.data.lname,
          fname: res.data.fname,
          date_debut: res.data.date_debut,
          date_fin: res.data.date_fin,
          tele: res.data.tele,
          price: res.data.price,
          gmail: res.data.gmail,
          image: res.data.image,
        });
        // console.log("empl", res.data);
      });
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
  submit(event, id) {
    event.preventDefault();
    axios
      .put(URL_SPRING_API + `/updateEmpl/${this.props.match.params.idEmpl}`, {
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
      .then(() => {
        this.componentDidMount();
      });
  }

  render() {
    // console.log("this.state.lname", this.state.lname);
    // console.log("this.state.employe.lname", this.state.employe);

    const {
      image,
      lname,
      fname,
      date_debut,
      date_fin,
      tele,
      cne,
      gmail,
      price,
    } = this.state.employe;
    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">تغيير معلومات العامل</h1>
          <Link
            to={`/${this.props.match.params.idProjet}/${this.props.match.params.idTache}/addemploye`}
          >
            <button className="userAddButton">اضافة عامل</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="http://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png"
                alt="صورة"
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">
                  {lname} {fname}
                </span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">معلومات اضافية</span>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{date_debut}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                {date_fin}
              </div>
              <div className="userShowInfo">
                <AttachMoney className="userShowIcon" />
                {price}
              </div>
              <span className="userShowTitle">للتواصل</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{tele}</span>
              </div>
              <div className="userShowInfo">
                <Email className="userShowIcon" />
                <span className="userShowInfoTitle">{gmail}</span>
              </div>
            </div>
          </div>

          <div className="userUpdate">
            <span className="userUpdateTitle">تغيير</span>
            <form
              className="userUpdateForm"
              onSubmit={(e) => this.submit(e, this.state.idEmpl)}
            >
              <div className="userUpdateLeft">
                {/* <div className="userUpdateItem">
                  <label>الاسم</label>
                  <input
                    onChange={(e) => this.setState({ fname: e.target.value })}
                    value={this.state.fname}
                    type="text"
                    placeholder=""
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>النسب</label>
                  <input
                    onChange={(e) => this.setState({ lname: e.target.value })}
                    value={this.state.lname}
                    type="text"
                    placeholder=""
                    className="userUpdateInput"
                  />
                </div> */}
                <div className="userUpdateItem">
                  <label>الهاتف</label>
                  <input
                    onChange={(e) => this.setState({ tele: e.target.value })}
                    value={this.state.tele}
                    type="text"
                    placeholder=""
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>البريد الالكتروني</label>
                  <input
                    onChange={(e) => this.setState({ gmail: e.target.value })}
                    value={this.state.gmail}
                    type="text"
                    placeholder=""
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>تاريخ البدء</label>
                  <input
                    onChange={(e) =>
                      this.setState({ date_debut: e.target.value })
                    }
                    value={this.state.date_debut}
                    type="date"
                    placeholder=""
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>تاريخ الانتهاء</label>
                  <input
                    onChange={(e) =>
                      this.setState({ date_fin: e.target.value })
                    }
                    value={this.state.date_fin}
                    type="date"
                    placeholder=""
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>الراتب</label>
                  <input
                    onChange={(e) => this.setState({ price: e.target.value })}
                    value={this.state.price}
                    type="number"
                    placeholder=""
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img className="userUpdateImg" src={image} alt="empl_photo" />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input
                    // onChange={(e) =>
                    //   this.setState({ image: e.target.value })
                    // }
                    // value={this.state.image}
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                  />
                </div>
                <div className="actionsUserUpdate">
                  <button className="userUpdateButton">
                    <Done />
                    تحديث
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
