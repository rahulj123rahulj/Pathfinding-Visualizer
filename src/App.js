import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer.jsx'
function App() {
  const [algorithm,setAlgorithm]=useState('bfs');
  const [visualize,setVisualize]=useState(false);
  
  useEffect(()=>{
    console.log(algorithm);
    console.log(visualize);
  },[algorithm])
  return (
    <div className="App">
      <Navbar className="navbar" setVis={setVisualize} algo={algorithm} setAlgo={setAlgorithm} />
      <PathfindingVisualizer className="visualizer" vis={visualize} algo={algorithm} ></PathfindingVisualizer>
    </div>
  );
}

export default App;
