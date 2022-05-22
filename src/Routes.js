import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Projet from "./pages/projet/Projet";
import Taches from "./pages/tache/Taches";
import EmployesList from "./pages/employesList/EmployesList";
import MaterielList from "./pages/materielList/MaterielList";
import Employe from "./pages/employe/Employe";
import AddEmploye from "../src/pages/addEmploye/AddEmploye";
import Materiel from "./pages/materiel/Materiel";
import AddMateriel from "./pages/addMateriel/AddMateriel";
import Pdf from "./pages/pdf/Pdf";
import Email from "./pages/email/Email";
import Sms from "./pages/email/Sms";

function Routes() {
  const [darkMode, setDarkMode] = useState(false);
  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }
  return (
    <div>
      <Router>
        <Topbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Switch>
          <Route exact path="/" component={Projet} darkMode={darkMode} />
          <Route exact path="/projet/:idProjet" component={Taches} />
          <Route path="/projet/:idProjet/pdf" component={Pdf} />
          <div className="container">
            {/* <Sidebar /> */}
            <Switch>
              <Route path="/projet/:idProjet/:idTache" component={Home} />
              <Route
                path="/:idProjet/:idTache/employe/sendemail/:idEmpl"
                component={Email}
              />
              <Route
                path="/:idProjet/:idTache/employe/sms/:idEmpl"
                component={Sms}
              />
              <Route
                path="/:idProjet/:idTache/employes"
                component={EmployesList}
              />
              <Route
                path="/:idProjet/:idTache/materiels"
                component={MaterielList}
              />
              <Route
                path="/:idProjet/:idTache/employe/:idEmpl"
                component={Employe}
              />
              <Route
                path="/:idProjet/:idTache/addemploye"
                component={AddEmploye}
              />
              <Route
                path="/:idProjet/:idTache/materiel/:idMateriel"
                component={Materiel}
              />
              <Route
                path="/:idProjet/:idTache/addmateriel"
                component={AddMateriel}
              />
            </Switch>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
