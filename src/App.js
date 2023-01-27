import * as React from 'react'
// import { DisplayGraph } from './graph';
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import { DisplayGraph } from './graph';

function Layout() {
  return (
    <div><Outlet /></div>
  )
}

function GraphLoader() {
  let { space } = useParams();
  return <DisplayGraph space={space} />
}

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="*" element={<DisplayGraph dataSet={dataSet} />} /> */}
          <Route path="space/:space" element={<GraphLoader />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
