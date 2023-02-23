
const dfsRecursion=(grid,node,visitedNodesInOrder)=>{
    const {col,row,dist} = node;
    node.isVisited=true;
    if(row===10 && col===40)  return true; 
    visitedNodesInOrder.push(node);
    const dr=[0,1,0,-1];
    const dc=[1,0,-1,0];

    for(let i=0;i<4;i++){
        let newr=row+dr[i];
        let newc=col+dc[i];

        if(newr>=0 && newc>=0 && newr<20 && newc<60 && grid[newr][newc].isVisited===false && grid[newr][newc].isWall===false){
            grid[newr][newc].prevNode=node;
            grid[newr][newc].distance=dist+1;

            if(dfsRecursion(grid,grid[newr][newc],visitedNodesInOrder)===true)  return true; 
        }
    }
    return false;
}

export const dfs=(grid,startNode)=>{
    const visitedNodesInOrder = [];
    dfsRecursion(grid,startNode,visitedNodesInOrder)
    return visitedNodesInOrder;
}
