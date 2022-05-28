import "./chart.css";
import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,

  BarElement,
  CategoryScale, 
  BarController,
  LinearScale,
  PointElement,
  LineElement,

} from 'chart.js';

import { Line  } from 'react-chartjs-2';
import axios from "axios";
import { useParams } from "react-router-dom";

ChartJS.register(
  BarElement,
  CategoryScale,
  BarController, 
  LinearScale,
  PointElement,
  LineElement,
);

export default function ChartEmp(props) {

  const URL_NODE_API = "https://node-server-construction.herokuapp.com";
  const [rowData, setRowData] = useState([]);
  const [chart, setChart] = useState({});

  const {idTache}=useParams();

  useEffect(() => {
    var apiurl = URL_NODE_API + `/empls/${idTache}`;
    axios
      .get(apiurl)
      .then((response) => {
      
          // console.log("chartemp", response);
          setChart(response)
      })
  }, []);
  
  const labels= chart?.data?.map(x=>x.lname+" "+x.fname);
  var data = {
    labels,
    datasets: [{
      label: `Les employees avec salaires`,
      data: chart?.data?.map(x=>x.price),
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
      ],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 4
    }]
  };
  
  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }
  


  return (
    <div className="chart">
      <Line 
        data={data}
        height={400}
        options={options}
      />
    </div>
  );
}