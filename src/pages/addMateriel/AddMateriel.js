import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Select } from "semantic-ui-react";
import { URL_NODE_API, URL_SPRING_API } from "../../Constant";
import "./addMateriel.css";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materiels: [],
      materialsList: [],
      tache: {},
      projet: {},
      idMateriel: 0,
      type_materiel: "",
      prix_unitaire: 0,
      quantite: 0,
      idTaches: 0,
      dateDebut: "",
      dateFin: "",
      descriptionTache: "",
      nouveauPrix: "",
      idProjet: 0,
      nomProjet: "",
      dateDebutProjet: "",
      dateFinProjet: "",
    };
  }

  componentDidMount() {
    axios.get(URL_NODE_API + "/material_list").then((res) => {
      this.setState({
        materialsList: res.data,
      });
      console.log("materialsList data", res.data);
    });
    axios.get(URL_SPRING_API + "/materiels").then((res) => {
      this.setState({
        materiels: res.data,
        idMateriel: 0,
        type_materiel: "",
        prix_unitaire: "",
        quantite: "",
      });
      // console.log("materiels data", res.data);
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

  //get tache by id

  submit(event) {
    event.preventDefault();
    axios
      .post(URL_SPRING_API + "/addMateriel", {
        type_materiel: this.state.type_materiel,
        prix_unitaire: this.state.prix_unitaire,
        quantite: this.state.quantite,
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
      });
  }

  edit(id) {
    axios.get(URL_SPRING_API + `/materielById/${id}`).then((res) => {
      this.setState({
        prix_unitaire: res.data.prix_unitaire,
      });
    });
  }

  render() {
    const constructOptions = [
      { key: "af", value: "af", text: "Mud Bricks" },
      { key: "ax", value: "ax", text: "Clay Bricks" },
      { key: "al", value: "al", text: "Aggregate" },
      { key: "dz", value: "dz", text: "Types of Stone" },
      { key: "as", value: "as", text: " Thatch" },
      { key: "ad", value: "ad", text: "Wood" },
      { key: "ao", value: "ao", text: "Fire Bricks" },
      { key: "ai", value: "ai", text: "Cement" },
      { key: "ag", value: "ag", text: "Fiberglass Fabric" },
      { key: "ar", value: "ar", text: "Foam Insulation" },
      { key: "am", value: "am", text: "Glass" },
      { key: "aw", value: "aw", text: "Gypcrete" },
      { key: "au", value: "au", text: "Steel Roof Shed" },
      { key: "at", value: "at", text: "Plastic Pipes" },
    ];
    return (
      <div className="newProduct">
        <h1 className="addProductTitle">اضافة مواد جديدة</h1>
        <form className="addProductForm" onSubmit={(e) => this.submit(e)}>
          <div className="addProductItem">
            <label>المادة المستعملة</label>
            {/* <Select
              placeholder="لائحة المواد"
              options={constructOptions}
              onChange={(e) => this.setState({ type_materiel: e.target.value })}
              value={constructOptions.find(
                (item) => item.value === type_materiel
              )}
            /> */}

            <input
              list="materiel"
              className="materielSelect"
              onChange={(e) => this.setState({ type_materiel: e.target.value })}
              value={this.state.type_materiel}
            />
            <datalist id="materiel">
              {this.state.materialsList.map((materiel) => (
                <option
                  value={materiel.type_materiel}
                  onClick={(e) => this.edit(materiel.id)}
                ></option>
              ))}
            </datalist>
          </div>
          <div className="addProductItem">
            <label>الكمية</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => this.setState({ quantite: e.target.value })}
              value={this.state.quantite}
            />
          </div>
          <div className="addProductItem">
            <label>سعر الوحدة</label>
            <input
              type="number"
              placeholder=""
              onChange={(e) => this.setState({ prix_unitaire: e.target.value })}
              value={this.state.prix_unitaire}
            />
          </div>
          <button className="addProductButton">اضافة</button>
        </form>
      </div>
    );
  }
}
