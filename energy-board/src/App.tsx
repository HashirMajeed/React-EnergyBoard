import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CurrentFuelUsage } from './JSON-Objects/CurrentFuelUsage';
import { PieChart } from './components/PieChart';
import { currentFuelUsageToPieChartData } from './mapper';

function displayArray(title : string, data : string[]){
  console.log(data.length);
  if (data == null){
    return (<div>No data found</div>)
  }
  else{
    return(
      <table>
        <thead>
          <tr>
              <th>
                  <h3>{title}</h3>
              </th>
          </tr>
        </thead>
        <tbody>
          <tr>
          {data.map(item => <tr>{item}</tr>)}
          </tr>
        </tbody>
      </table>
    );
  }
}

function App() {

  // function getAllData() {

  // }

  const [data, setData] = useState(null);

  function handleClick() {
    const xhr = new XMLHttpRequest();
    //xhr.open('GET', 'https://data.dev.elexon.co.uk/bmrs/api/v1/reference/fueltypes/all');
    xhr.open('GET', 'https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/FUELINSTHHCUR');
    xhr.onload = function() {
      if (xhr.status === 200) {
        setData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }


  return (
    <div className="main">
      <button onClick={handleClick}>Get Data</button>
      {data && <PieChart title="Breakdown of fuel type" data={currentFuelUsageToPieChartData(data)}/>}
    </div>
  );
  
}

function GetAllFuelTypes() {
  const [data, setData] = useState(null);

  function handleClick() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://data.dev.elexon.co.uk/bmrs/api/v1/reference/fueltypes/all');
    xhr.onload = function() {
      if (xhr.status === 200) {
        setData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }

  return (
    <div className="main">
      <button onClick={handleClick}>Get Data</button>
      {<div>{data == null ? "" : displayArray("Fuel types", data)}</div>}
    </div>
  );
    }

function App3() {
  const [outputs, setOutputs] = useState(null);

  function handleClick() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/FUELINSTHHCUR');
    xhr.onload = function() {
      if (xhr.status === 200) {
        setOutputs(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }
  //var PowerOutput : CurrentFuelUsage = new CurrentFuelUsage();
  var newTodo : CurrentFuelUsage | null;
  newTodo = outputs;
  console.log(newTodo);
  return (
    <div className="main">
      <button onClick={handleClick}>Get Data</button>
      
    </div>
  );
}

export default App;
