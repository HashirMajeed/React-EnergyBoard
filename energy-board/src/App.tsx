import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { CurrentFuelUsage } from './interfaces/CurrentFuelUsage';
import { PieChart } from './components/PieChart';
import { currentFuelUsageToCategorisedPieChartDataRaw } from './mapper/currentFuelUsageMapper';
import { ListData } from './components/ListData';
import { Header } from './components/Header';



function App() {
  var x : CurrentFuelUsage[] = [];
  const [listData, setListData] = useState([]);
  const [chartData, setChartData] = useState(x);
  const [lineData, setLineData] = useState()

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    //xhr.open('GET', 'https://data.dev.elexon.co.uk/bmrs/api/v1/reference/fueltypes/all');
    xhr.open('GET', 'https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/FUELINSTHHCUR');
    xhr.onload = function() {
      if (xhr.status === 200) {
        setChartData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();

    const xhr1 = new XMLHttpRequest();
    xhr1.open('GET', 'https://data.dev.elexon.co.uk/bmrs/api/v1/reference/fueltypes/all');
    xhr1.onload = function() {
      if (xhr1.status === 200) {
        setListData(JSON.parse(xhr1.responseText));
      }
    };
    xhr1.send();

    const xhr3 = new XMLHttpRequest();
    xhr3.open('GET', 'https://data.dev.elexon.co.uk/bmrs/api/v1/generation/availability/summary/3YW');
    xhr3.onload = function() {
      if (xhr3.status === 200) {
        setListData(JSON.parse(xhr3.responseText));
      }
    };
    xhr3.send();
  });

  var myData : any = chartData.slice();
  var PieChartData : (string | number)[][] = chartData.map(item => [item.fuelType, item.currentUsage]);
  PieChartData.unshift(["Fuel Type", "Current Usage"]);

  return (
  <div>
    <Header />
    <div className="main">
        <PieChart title="Breakdown by fuel type" data={PieChartData} />
        <ListData title="List of fuel types" data={listData} />
        <PieChart title="Breakdown by category" data={currentFuelUsageToCategorisedPieChartDataRaw(myData)} />
    </div>
  </div>
  );
}


export default App;
