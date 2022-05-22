import React, { Component } from "react";
import axios from "axios";
import { URL_NODE_API, URL_SPRING_API } from "../../Constant";
import "./style.css";
import jsPDF from "jspdf";
import {Image } from "semantic-ui-react";
import logo from "../../images/logo.png";


export default class Pdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allprojettaches: [],
      idProjet: 0,
      description_tache: "",
      nom_projet:"",
      nouveau_prix: 0.0,
      sumprix:0,
    };
  }

  componentDidMount = () => {
    axios
      .get(
        URL_NODE_API + `/alltaches/projet/${this.props.match.params.idProjet}`
      )
      .then((res) => {
        this.setState({
          allprojettaches: res.data.rows,
          nom_projet:res.data.rows[0].nom_projet
        });
        // console.log("res.data.rows", res.data.rows);
      })
      .catch((err) => {
         console.log(err);
      });

     //get sum prix
   axios
     .get(
       URL_NODE_API + `/tacheSum/${this.props.match.params.idProjet}`
     )
     .then((res) => {
       this.setState({
         sumprix: res.data[0].sum,
       });
      //  console.log("sumprix.", res.data[0].sum);
     })
     .catch((err) => {
       console.log(err);
     });
  };

  generatePdf = () => {
   try {
      const legend = document.getElementById("my-pdf");
     const pdf = new jsPDF("p", "pt","a2");
     pdf.html(legend,{
      callback: function (doc) {
         doc.save("newprojet");
       },html2canvas: {
         scale: 0.9 
      },
      });
   } catch (error) {
     console.log(error);
   }
 };


  render() {
    const today = new Date();
    return (
      <>
        <div id="my-pdf">
        <div className="container">
          <div className="row">
            <div className="col-auto me-auto">
              <p>
                Date: {today.getDate()}/ {today.getMonth() + 1}/
                {today.getFullYear()}.
              </p>
            </div>
          </div>
        </div>
        <Image src={logo} wrapped ui={false} className="text-center"/>
        <h1>
               <p className="text-center">
               Nom de Projet:{this.state.nom_projet}
               </p>
         </h1>
        <div className="container">
          <table className="table table-sm">
            <thead className="table-dark">
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Prix</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allprojettaches.map((projettache) => (
                <tr className="item">
                  <th>{projettache.description_tache}</th>
                  <th>{projettache.nouveau_prix}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1>
               <p className="text-center">
                  Total de Prix:{this.state.sumprix}
               </p>
         </h1>
        </div>
        <div className="container">
            <button type="button" class="btn btn-outline-secondary" onClick={this.generatePdf}> طبع الملف</button>
        </div>
      </>
    );
  }
}
