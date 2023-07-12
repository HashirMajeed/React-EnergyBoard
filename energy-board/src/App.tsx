import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

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
    <div>
      <button onClick={handleClick}>Get Data</button>
      {data ? <div>{JSON.stringify(data)}</div> : <div>Loading...</div>}
    </div>
  );
}

export default App;
