import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Node from './Node/Node.jsx';
import {dijkstra} from './algorithms/dijkstra.jsx';
import {bfs} from './algorithms/bfs.jsx';
import {dfs} from './algorithms/dfs.jsx'
import './pathfindingVisualizer.css';
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 60; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  
  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      prevNode: null,
    };
  };

  const getNewGridWithWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };


const PathfindingVisualizer=({vis,algo})=> {

    const [grid,setGrid]=useState(getInitialGrid);
    const [mouseIsPressed,setMouseIsPressed]=useState(false);

    console.log(grid);

 
  const handleMouseDown=(row,col)=>{
    const newGrid=getNewGridWithWall(grid,row,col);
    console.log("here");
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  const handleMouseEnter=(row, col)=>{
    if (mouseIsPressed=== false) return;
    console.log("here2");
    const newGrid = getNewGridWithWall(grid, row, col);
    setGrid(newGrid)
  }

  const handleMouseUp=() =>{
    setMouseIsPressed(false);
  }
 
  const animateShortestPath=(nodesInShortestPathOrder)=>{
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className='node node-shortest-path';
      }, 50 * i);
    }
  }


  const animateDijkstra=(visitedNodesInOrder, nodesInShortestPathOrder)=>{
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className='node node-visited';
      }, 10 * i);
    }
  }


  function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode != null) {
      nodesInShortestPathOrder.unshift(currentNode);
      console.log(currentNode)
      currentNode = currentNode.prevNode;
    }
    return nodesInShortestPathOrder;
  }
  

  const visualizeDijkstra=()=>{
    const newGrid = grid;
    const startNode = newGrid[START_NODE_ROW][START_NODE_COL];
    const finishNode = newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder
    switch (algo) {
      case 'bfs':
        visitedNodesInOrder = bfs(newGrid, startNode);
        break;
      case 'dfs':
        visitedNodesInOrder = dfs(newGrid, startNode);
        break;
      case 'dij':
        visitedNodesInOrder = dijkstra(newGrid, startNode);
        break;
      default:
        break;
    }

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    // console.log(nodesInShortestPathOrder)
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  if(vis==true){
    visualizeDijkstra()
  }

    return (
        
        <><div className='visualizer'>
          <div className="header">
              <div>
                <button onClick={visualizeDijkstra}>Visualize</button>
              </div>
          </div>
            <div className="grid">
          {grid.map((i, rowIdx) => {
            return (
              <div key={rowIdx}>
                {i.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row,col)=>handleMouseDown(row, col)}
                      onMouseEnter={(row,col)=>handleMouseEnter(row, col)}
                      onMouseUp={()=>handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        </div>
        </>
    )
   
}



export default PathfindingVisualizer;