import { DataGrid } from "@material-ui/data-grid";
import {
  DeleteOutline,
  GroupAdd,
  Edit,
  Textsms,
  Email,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DayJS from "react-dayjs";
import "./employesList.css";
import { URL_NODE_API } from "../../Constant";

export default function EmployesList(props) {
  const [empls, setEmpls] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  //delete material function
  const deleteEmpl = async (id) => {
    try {
      const deleteEmpl = await fetch(URL_NODE_API + `/deleteEmpls/${id}`, {
        method: "DELETE",
        // isLoaded: true,
      });
      setEmpls(empls.filter((empl) => empl.id_empl !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    var api_url = URL_NODE_API + `/empls/${props.match.params.idTache}`;
    axios
      .get(api_url)
      .then((response) => response.data)
      .then((data) => {
        setIsLoaded(true);
        setRowData(data);
      });
  }, []);

  const columns = [
    { field: "id_empl", headerName: "USERS ID", width: 90 },
    {
      field: "user",
      headerName: "العامل",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <Link
              to={
                `/${props.match.params.idProjet}/${props.match.params.idTache}/employe/` +
                params.row.id_empl
              }
              className="name"
            >
              {/* <img className="userListImg" src="" alt={params.row.lname} /> */}
              {params.row.fname} {params.row.lname}
            </Link>
          </div>
        );
      },
    },
    {
      field: "gmail",
      headerName: "البريد الالكتروني",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <Link
              to={
                `/${props.match.params.idProjet}/${props.match.params.idTache}/employe/sendemail/` +
                params.row.id_empl
              }
              className="email"
            >
              <Email />
              {params.row.gmail}
            </Link>
          </div>
        );
      },
    },
    {
      field: "date_debut",
      headerName: "تاريخ البدء",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <DayJS format="DD-MM-YYYY">{params.row.date_debut}</DayJS>
          </div>
        );
      },
    },
    {
      field: "date_fin",
      headerName: "تاريخ الانتهاء",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <DayJS format="DD-MM-YYYY">{params.row.date_fin}</DayJS>
          </div>
        );
      },
    },
    {
      field: "tele",
      headerName: "الهاتف",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <Link
              to={
                `/${props.match.params.idProjet}/${props.match.params.idTache}/employe/sms/` +
                params.row.id_empl
              }
              className="sms"
            >
              <Textsms /> {params.row.tele}
            </Link>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={
                `/${props.match.params.idProjet}/${props.match.params.idTache}/employe/` +
                params.row.id_empl
              }
            >
              <Edit style={{ fontSize: "1.7em", color: "green" }} />
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => deleteEmpl(params.row.id_empl)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Link
        to={`/${props.match.params.idProjet}/${props.match.params.idTache}/addemploye`}
      >
        <button className="addIconNewUserButton">
          <GroupAdd />
        </button>
      </Link>
      <DataGrid
        getRowId={(row) => row.id_empl}
        rows={rowData}
        disableSelectionOnClick
        columns={columns}
        pageSize={3}
        checkboxSelection
        autoHeight
      />
    </div>
  );
}
