import { useState} from "react";
import "./NavbarStyles.css";
export const Navbar=({setVis,algo,setAlgo})=>{
    const [clicked,setClicked]=useState(false);
    const options = [
        { label:'BFS',value:'bfs' },
        { label:'DFS',value:'dfs' },
        { label:'Dijkstra',value:'dij' },
      ];
      const handleChange = (event) => {
        setAlgo(event.target.value);
      };
    return (
        <nav className="NavbarItems">
                <h1 className="logo">
                    PathFinding Visualizer <i className="fab fa-react"></i></h1>
                    <div className="menu-icons"
                    // onClick={setClicked(!clicked)}
                    >
                        <i className={clicked? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                <li >
                            <a href='' className="nav-links main" onClick={(e)=>{
                                e.preventDefault();
                                setVis(true)}}>
                                Visualize
                            </a>
                    </li>
                    <li >
                        <select className="dropdown" value={algo} onChange={handleChange}>
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                            
                    </li>
                    
                    <li >
                            <a href='' className="nav-links">
                                Clear Path
                            </a>
                    </li>
                    <li >
                            <a href='' className="nav-links">
                                Clear Board
                            </a>
                    </li>
                    
                </ul>
            </nav>
        );
}
export default Navbar;