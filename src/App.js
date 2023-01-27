import logo from './logo.svg';
import * as React from 'react'
// import './App.css';
import { DisplayGraph } from './graph';

function App() {
  const [dataSet, setDataSet] = React.useState(1);
  return (
    <div className="App">
      <button onClick={() => setDataSet(1)}>Dataset 1</button>
      <button onClick={() => setDataSet(2)}>Dataset 2</button>
      <DisplayGraph dataSet={dataSet} />
    </div>
  );
}

export default App;
