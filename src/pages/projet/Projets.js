import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { CalendarToday, Edit, Call, MoreHoriz } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import logo from "../../images/logo.png";
import "./projet.css";

export class Projets extends Component {
  render() {
    const { id_projet, nom_projet, date_debut, date_fin } = this.props.projet;
    return (
      <>
        <Card key={id_projet}>
          <Image src={logo} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{nom_projet}</Card.Header>
            <Card.Meta>
              <span className="date">
                <CalendarToday />
                {date_debut}
              </span>
              <span className="date">
                <CalendarToday />
                {date_fin}
              </span>
            </Card.Meta>
            <Card.Description>
              <span className="ProjetShowTitle">بيانات المسؤول</span>
              <div className="ProjetShowInfo">
                <Call className="ProjetShowIcon" />
                <span className="ProjetShowInfoTitle">+212 658540116</span>
              </div>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`projet/${id_projet}`}>
              <MoreHoriz />
                المزيد
            </Link>
              <div className="d-md-flex justify-content-md-end">
                <Button size="small">
                  <Edit />
                  تغيير
                </Button> 
              </div>
          </Card.Content>
        </Card>
        {/* <Card className="card_projet" key={id_projet}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {nom_projet}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                <span className="ProjetShowTitle">معلومات عن المشروع</span>
                <div className="ProjetShowInfo">
                  <PermIdentity className="ProjetShowIcon" />
                  <span className="ProjetShowInfoTitle">homeTeam</span>
                </div>

                <div className="ProjetShowInfo_date">
                  <CalendarToday className="ProjetShowIcon" />
                  <DayJS className="ProjetShowInfoTitle" format="DD-MM-YYYY">
                    {date_debut}
                  </DayJS>
                  <ArrowForward />
                  <CalendarToday className="ProjetShowIcon" />
                  <DayJS className="ProjetShowInfoTitle" format="DD-MM-YYYY">
                    {date_fin}
                  </DayJS>
                </div>

                <span className="ProjetShowTitle">بيانات المسؤول</span>
                <div className="ProjetShowInfo">
                  <PhoneAndroid className="ProjetShowIcon" />
                  <span className="ProjetShowInfoTitle">+212 658540116</span>
                </div>
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`projet/${id_projet}`}>
                <Button size="small">المزيد</Button>
              </Link>
            </CardActions>
          </CardActionArea>
        </Card> */}
      </>
    );
  }
}

export default Projets;
