import { DataGrid } from "@material-ui/data-grid";
import { Add, DeleteOutline, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_NODE_API } from "../../Constant";
import "./materielList.css";

export default function MaterielList(props) {
  const [materials, setMaterials] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //delete material function
  const deleteMaterial = async (id) => {
    try {
      setIsLoaded(true);
      const deleteMaterial = await fetch(
        URL_NODE_API + `/deleteMateriel/${id}`,
        {
          method: "DELETE",
        }
      );
      setIsLoaded(false);
      setMaterials(materials.filter((material) => material.idMateriel !== id));
    } catch (err) {
      setIsLoaded(false);
      console.error(err.message);
    }
  };

  useEffect(() => {
    var apiurl = URL_NODE_API + `/materiels/${props.match.params.idTache}`;
    axios
      .get(apiurl)
      .then((response) => response.data)
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const columns = [
    { field: "id_materiel", headerName: "Material ID", width: 200 },
    {
      field: "type_materiel",
      headerName: "المادة المستعملة",
      width: 200,
    },
    { field: "quantite", headerName: "الكمية", width: 200 },
    {
      field: "prix_unitaire",
      headerName: "سعر الوحدة",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={
                `/${props.match.params.idProjet}/${props.match.params.idTache}/materiel/` +
                params.row.id_materiel
              }
            >
              <Edit style={{ fontSize: "1.7em", color: "green" }} />
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => deleteMaterial(params.row.id_materiel)}
              disabled={isLoaded}
            >
              {isLoaded ? (
                "deleting"
              ) : (
                <DeleteOutline
                  className="productListDelete"
                  onClick={() => deleteMaterial(params.row.id_materiel)}
                  disabled={isLoaded}
                />
              )}
            </DeleteOutline>
          </>
        );
      },
    },
  ];
  return (
    <div className="productList">
      <Link
        to={`/${props.match.params.idProjet}/${props.match.params.idTache}/addmateriel`}
      >
        <button className="addIconNewUserButton">
          <Add />
        </button>
      </Link>
      <DataGrid
        getRowId={(row) => row.id_materiel}
        rows={rowData}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        autoHeight
      />
    </div>
  );
}
