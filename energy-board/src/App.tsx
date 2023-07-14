import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { CurrentFuelUsage } from './interfaces/CurrentFuelUsage';
import { PieChart } from './components/PieChart';
import { currentFuelUsageToPieChartData, currentFuelUsageToCategorisedPieChartData, currentFuelUsageToCategorisedPieChartDataRaw } from './mapper/currentFuelUsageMapper';
import { ListData } from './components/ListData';
import { Header } from './components/Header';
import { dailyMetadata } from './interfaces/dailyMetadata';
import { ComboChart } from './components/ComboChart';
import {fourteenDayUsageToComboChart} from './mapper/fourteenDayForecastMapper';
import { DailyUsage } from './interfaces/dailyUsage';
import { FourteenDayHistory } from './interfaces/FourteenDayHistory';
import { LineChart } from './components/LineChart';
import { fourteenDayHistoryToLineChart } from './mapper/fourteenDayHistoryMapper';



function App() {
  var x : CurrentFuelUsage[] = [];
  var combo : DailyUsage[] = [];
  var historyData : FourteenDayHistory = {
    data : [],
      metadata : { datasets : []},
      
    };
  const [listData, setListData] = useState([]);
  const [chartData, setChartData] = useState(x);
  const [comboData, setComboData] = useState(combo);
  const [lineData, setLineData] = useState(historyData);

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

    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://data.dev.elexon.co.uk/bmrs/api/v1/generation/availability/summary/14D');
    xhr2.onload = function() {
      if (xhr2.status === 200) {
        setComboData(JSON.parse(xhr2.responseText));
      }
    };
    xhr2.send();
    console.log("hfdgfkhdbfwj");


    const xhr4 = new XMLHttpRequest();
    xhr4.open('GET', 'https://data.dev.elexon.co.uk/bmrs/api/v1/forecast/availability/daily/history?publishTime=2023-07-14T09%3A01%3A35.076Z');
    xhr4.onload = function() {
      if (xhr4.status === 200) {
        console.log("found");
        setLineData(JSON.parse(xhr4.responseText));
      }
    };
    xhr4.send();


  }, []);


  var myData : any = chartData.slice();
  var PieChartData : (string | number)[][] = chartData.map(item => [item.fuelType, item.currentUsage]);
  PieChartData.unshift(["Fuel Type", "Current Usage"]);

  return (
  <div className="main">
    <Header />
    <div className="tilebackground">
      <div className="tileforeground">
        <PieChart title="Breakdown by fuel type" data={PieChartData} />
      </div>
    </div>
    <div className="tilebackground">
      <div className="tileforeground">
        <ListData title="List of fuel types" data={listData} />
      </div>
    </div>
    <div className="tilebackground">
      <div className="tileforeground">
        <PieChart title="Breakdown by category" data={currentFuelUsageToCategorisedPieChartDataRaw(myData)} />
      </div>
    </div>
    <div>
      <ComboChart title="Fourteen Day Generation Forecast" vAxisName='Power/GW' hAxisName='Time' data={fourteenDayUsageToComboChart(comboData, listData)} ></ComboChart>
    </div>
    <div>
      <LineChart title="Fourteen Day Generation Forecast From Specified Date" data={fourteenDayHistoryToLineChart(lineData)}  vAxis="Power/GW" hAxis=""/>
    </div>
  </div>
  );
}


export default App;