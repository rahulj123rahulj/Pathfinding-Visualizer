import React from 'react';

import './Node.css';


const Node=(props)=>{
    const {col,
        isFinish,
        isStart,
        isWall,
        row,
        prevNode,
        onMouseDown,
        onMouseEnter,
        onMouseUp} = props;
    
    let specialNode ='';
    
    if(isFinish){
        specialNode='node-finish'
    }else if(isStart){
        specialNode='node-start'
    }else if(isWall){ 
        specialNode='node-wall'
    }

    return (
        <>
        <div
        id={`node-${row}-${col}`}
        className={`node ${specialNode}`}
        onMouseDown={()=>onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={onMouseUp}
        ></div>
        </>
    )
}

export default Node;
