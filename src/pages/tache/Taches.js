import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { URL_NODE_API, URL_SPRING_API } from "../../Constant";
import { Card, Form } from "semantic-ui-react";
import { AddCircle } from "@material-ui/icons";
import { Edit, MoreHoriz } from "@material-ui/icons";
import "./tache.css";
import jsPDF from "jspdf";
import Pdf from "../pdf/Pdf";

import ReactDOMServer from "react-dom/server";

class Taches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggle: false,
      isToggle2: false,
      taches: [],
      allprojettaches: [],
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
      sumprix: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      isToggle: !this.state.isToggle,
      dateDebut: "",
      dateFin: "",
      descriptionTache: "",
      nouveauPrix: "",
    });
  }
  handleClick2(e) {
    this.setState({
      isToggle2: !this.state.isToggle2,
    });
  }

  componentDidMount() {
    //get taches by id
    axios
      .get(URL_NODE_API + `/tache/${this.props.match.params.idProjet}`)
      .then((res) => {
        const taches = res.data;
        this.setState({ taches });
        // console.log("taches", taches);
      });

    //get projet by id
    axios
      .get(URL_SPRING_API + `/projetById/${this.props.match.params.idProjet}`)
      .then((res) => {
        const projet = res.data;
        this.setState({ projet });
        // console.log("projet", projet);
      });
    //GET nomprojet,tache by id projet
    axios
      .get(
        URL_NODE_API + `/alltaches/projet/${this.props.match.params.idProjet}`
      )
      .then((res) => {
        this.setState({
          allprojettaches: res.data.rows,
          nom_projet: res.data.rows[0].nom_projet,
        });
        // console.log("res.data.rows", res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
    //get sum prix
    axios
      .get(URL_NODE_API + `/tacheSum/${this.props.match.params.idProjet}`)
      .then((res) => {
        this.setState({
          sumprix: res.data[0].sum,
        });
        // console.log("res.data.", res.data[0].sum);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submit(event, id) {
    event.preventDefault();
    if (id === 0) {
      axios
        .post(URL_SPRING_API + "/addTache", {
          dateDebut: this.state.dateDebut,
          dateFin: this.state.dateFin,
          descriptionTache: this.state.descriptionTache,
          nouveauPrix: this.state.nouveauPrix,
          projet: {
            idProjet: this.state.projet.idProjet,
            nomProjet: this.state.projet.nomProjet,
            dateDebut: this.state.projet.dateDebut,
            dateFin: this.state.projet.dateFin,
          },
        })
        .then((res) => {
          this.componentDidMount();
          this.setState({
            dateDebut: "",
            dateFin: "",
            descriptionTache: "",
            nouveauPrix: "",
          });
        });
    } else {
      axios
        .put(URL_SPRING_API + "/updateTache", {
          idTaches: this.state.idTaches,
          dateDebut: this.state.dateDebut,
          dateFin: this.state.dateFin,
          descriptionTache: this.state.descriptionTache,
          nouveauPrix: this.state.nouveauPrix,
          projet: {
            idProjet: this.props.match.params.idProjet,
            nomProjet: this.state.projet.nomProjet,
            dateDebut: this.state.projet.dateDebut,
            dateFin: this.state.projet.dateFin,
          },
        })
        .then(() => {
          this.componentDidMount();
        });
    }
  }
  delete(id) {
    axios.delete(URL_SPRING_API + `/deleteTache/${id}`).then(() => {
      this.componentDidMount();
    });
  }

  edit(id) {
    axios.get(URL_SPRING_API + `/tacheById/${id}`).then((res) => {
      this.setState({
        isToggle2: !this.state.isToggle2,
        idTaches: res.data.idTaches,
        dateDebut: res.data.dateDebut,
        dateFin: res.data.dateFin,
        descriptionTache: res.data.descriptionTache,
        nouveauPrix: res.data.nouveauPrix,
      });
    });
  }

  render() {
    return (
      <div className="tache" id="tache">
        <div className="container ">
          <Card.Group>
            <div className="row">
              {this.state.taches?.map((tache) => (
                <div className="col-4 cardtache">
                  <Card key={tache.id_taches}>
                    <Card.Content>
                      <Card.Header></Card.Header>
                      <Card.Meta>
                        <span>{tache.date_debut}</span>
                        <span>{tache.date_fin}</span>
                      </Card.Meta>
                      <Card.Description>
                        {tache.description_tache}
                      </Card.Description>
                      <Card.Meta>{tache.nouveau_prix}</Card.Meta>
                    </Card.Content>
                    <div className="card-footer">
                      <Link
                        to={`/projet/${this.props.match.params.idProjet}/${tache.id_taches}`}
                      >
                        <p>
                          <MoreHoriz />
                          المزيد
                        </p>
                      </Link>
                      <button
                        onClick={(e) => this.edit(tache.id_taches)}
                        // onClick={this.handleClick2}
                        class="btn waves-effect waves-light"
                        type="submit"
                        name="action"
                      >
                        <Edit />
                        تغيير
                      </button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </Card.Group>
        </div>
        <div className="tacheForm">
          <div className="btn_add_projet">
            <Link to={`/projet/${this.props.match.params.idProjet}/pdf`}>
              <button
                className="btn btn-outline-success"
                onClick={this.generatePdf}
              >
                <p>إستخراج الملف</p>
              </button>
            </Link>
            <button className="newProjetButton" onClick={this.handleClick}>
              <AddCircle />
              اضافة مهمة جديدة
            </button>
          </div>
          <div
            className="formtache"
            style={{ display: this.state.isToggle ? "block" : "none" }}
          >
            <h1 className="newProjetTitle">مهمة جديدة</h1>
            <Form onSubmit={(e) => this.submit(e, this.state.idTaches)}>
              <Form.Field>
                <label>الوصف</label>
                <input
                  onChange={(e) =>
                    this.setState({ descriptionTache: e.target.value })
                  }
                  value={this.state.descriptionTache}
                  type="text"
                  placeholder="الوصف"
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
              <Form.Field>
                <label>الثمن المحتمل</label>
                <input
                  onChange={(e) =>
                    this.setState({ nouveauPrix: e.target.value })
                  }
                  value={this.state.nouveauPrix}
                  type="number"
                  placeholder=""
                />
              </Form.Field>
              <Button type="submit">اضافة</Button>
            </Form>
          </div>

          <div
            className="formtache"
            style={{ display: this.state.isToggle2 ? "block" : "none" }}
          >
            <h1 className="newProjetTitle">تغيير مهمة </h1>
            <Form onSubmit={(e) => this.submit(e, this.state.idTaches)}>
              <Form.Field>
                <label>الوصف</label>
                <input
                  onChange={(e) =>
                    this.setState({ descriptionTache: e.target.value })
                  }
                  value={this.state.descriptionTache}
                  type="text"
                  placeholder="الوصف"
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
              <Form.Field>
                <label>الثمن المحتمل</label>
                <input
                  onChange={(e) =>
                    this.setState({ nouveauPrix: e.target.value })
                  }
                  value={this.state.nouveauPrix}
                  type="number"
                  placeholder=""
                />
              </Form.Field>
              <Button type="submit">تغيير</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default Taches;
