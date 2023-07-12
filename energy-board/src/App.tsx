import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CurrentFuelUsage } from './interfaces/CurrentFuelUsage';
import { PieChart } from './components/PieChart';
import { currentFuelUsageToPieChartData } from './mapper/currentFuelUsageMapper';

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

  // var x = [getFuelDataByTypes(), getAllFuelTypes()];

  // return (
  //   <div className="main">
  //     <div>{getFuelDataByTypes()}</div>
  //     <div>{getAllFuelTypes()}</div>
  //   </div>
  // );
  return (<div></div>);
}


export default App;
