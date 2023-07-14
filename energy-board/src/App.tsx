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



function App() {
  var x : CurrentFuelUsage[] = [];
  var combo : DailyUsage[] = []
  const [listData, setListData] = useState([]);
  const [chartData, setChartData] = useState(x);
  const [comboData, setComboData] = useState(combo);
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
  });

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
      </div>
    </div>
    <div className="tilebackgroundgauge">
      <div className="tileforegroundgauge">
        <div className='gauge'>
        <Gauge data={currentFuelUsageToCategorisedPieChartDataRaw(myData).filter(x => x[0] == "Carbon")[0][1]} width={550} height={550} redFrom={90} redTo={100} yellowFrom={75} yellowTo={90} minorTicks={5} />
        </div>
      </div>
    </div>
    <div className="tilebackground">
      <div className="tileforeground">
        <div className='heading'>Alert Boss to Climate Change</div>

        <div className="container">
          <form onSubmit={sendEmail}>
          <label><b>Boss' Name</b></label>
          <input type="text" name="user_name" required></input>
          <label><b>Message</b></label>
          <input type="text" name="message" required></input>
          <button type="submit" value="Send">Send</button>
          </form>
        </div>
      </div>
        </div>  
      </div>
  );
}



export default App;
