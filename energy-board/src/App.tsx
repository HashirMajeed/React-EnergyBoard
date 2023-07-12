import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

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

export default App;
