export const bfs=(grid,node)=>{
	
    const visitedNodesInOrder=[];
	let queue=[];
    queue.push(node);
    node.isVisited=true;
	while(queue.length>0)
	{
		const currNode=queue[0];
        queue.shift();

        const {col,row}=currNode;
        visitedNodesInOrder.push(currNode);


        if(row===10 && col===40)  return visitedNodesInOrder; 

        
	    const dr=[-1,0,1,0];
	    const dc=[0,1,0,-1];
		for(let i=0;i<4;i++)
		{
			let newr=row+dr[i];
			let newc=col+dc[i];

			if(newr>=0 && newc>=0 && newr<20 && newc<60 && grid[newr][newc].isVisited===false && grid[newr][newc].isWall===false)
			{
                grid[newr][newc].prevNode=currNode;
                grid[newr][newc].isVisited=true;
				queue.push(grid[newr][newc]);
			}
		}
	}
    return visitedNodesInOrder;
}