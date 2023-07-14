import React, { useState, useEffect, useRef } from 'react';
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
import { Gauge } from './components/Gauge';
import { EmailJSResponseStatus } from '@emailjs/browser';
// import emailjs from 'emailjs-com';
import emailjs from '@emailjs/browser';
import { FourteenDayHistory } from './interfaces/FourteenDayHistory';
import { LineChart } from './components/LineChart';
import { fourteenDayHistoryToLineChart } from './mapper/fourteenDayHistoryMapper';



function App() {
  var x : CurrentFuelUsage[] = [];
  var combo : DailyUsage[] = []
  const [listData, setListData] = useState([]);
  const [chartData, setChartData] = useState(x);
  const [comboData, setComboData] = useState(combo);
  var historyData : FourteenDayHistory = {
    data : [],
      metadata : { datasets : []},

    };
  const [lineData, setLineData] = useState(historyData);
  const form = useRef();

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

    const xhr4 = new XMLHttpRequest();
    xhr4.open('GET', 'https://data.dev.elexon.co.uk/bmrs/api/v1/forecast/availability/daily/history?publishTime=2023-07-14T09%3A01%3A35.076Z');
    xhr4.onload = function() {
      if (xhr4.status === 200) {
        setLineData(JSON.parse(xhr4.responseText));
      }
    };
    xhr4.send();


  }, []);

  var myData : any = chartData.slice();
  var PieChartData : (string | number)[][] = chartData.map(item => [item.fuelType, item.currentUsage]);
  PieChartData.unshift(["Fuel Type", "Current Usage"]);

  // const sendEmail() = (e) => {
  //   e.preventDefault();
  
  //   emailjs.send(
  //     "service_t2ntb2r",
  //     "template_sd292ql",
  //     form.current,
  //     "emeqgm_vaepTreeg4"
  //   ).then(
  //     result => console.log(result.text),
  //     error => console.log(error.text)
  //   );
  // };

  function sendEmail(e : any) {
    e.preventDefault();

    emailjs.sendForm('service_t2ntb2r', 'template_sd292ql', e.target, 'emeqgm_vaepTreeg4')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  function getNewLineData(date : any) {
    date.preventDefault();
    const xhr4 = new XMLHttpRequest();
    console.log(date.target.value);
    var url = 'https://data.dev.elexon.co.uk/bmrs/api/v1/forecast/availability/daily/history?publishTime=';
    xhr4.open('GET', url + date.target.value + 'T09%3A01%3A35.076Z');
    xhr4.onload = function() {
      if (xhr4.status === 200) {
        setLineData(JSON.parse(xhr4.responseText));
      }
    };
    xhr4.send();
  }


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
    <div className="tilebackgroundcombo">
      <div className="tileforegroundcombo">
      <div className='combochart'>
      <ComboChart title="14 Day Forecast" vAxisName='Power/GW' hAxisName='Time' data={fourteenDayUsageToComboChart(comboData, listData)} />
    </div>
    <div className='tilebackground'>
      <div className='tileforeground'>
        <text>Enter the date in the form YYYY-MM-DD</text>
        <input onChange={getNewLineData}></input>
        <LineChart title="Fourteen day forecast" data={fourteenDayHistoryToLineChart(lineData)} />
        </div>     
    </div>
      </div>
    </div>
    <div className="tilebackgroundgauge">
      <div className="tileforegroundgauge">
        <div className='gauge'>
        <Gauge data={currentFuelUsageToCategorisedPieChartDataRaw(myData).filter(x => x[0] == "Carbon")[0][1]} width={1000} height={500} redFrom={90} redTo={100} yellowFrom={75} yellowTo={90} minorTicks={5} />
        </div>
      </div>
    </div> 
    <div className="tilebackground">
      <div className="tileforeground">
        <h2>Alert Boss to Climate Change</h2>
        <div className='climateform'><form onSubmit={sendEmail}>
        <label>Boss Name</label>
        <input type='text' name="user_name" required></input>
        <label>Message</label>
        <input type='text' name='message' required></input>
        <input type='submit' value="Send"></input>
      </form></div>
      </div>
      </div>
  </div>
  );
}



export default App;
