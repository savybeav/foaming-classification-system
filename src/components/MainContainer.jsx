import React, { useEffect, useState} from "react";

import Reactor from './Reactor.jsx';

function MainContainer() {
      
  const [list, setList] = useState([]);

  
  useEffect(() => {
    fetch('/reactors')
      .then(res => res.json())
      .then(setList
        // for(let i = 0; i < data.length; i++) {
        // reactorList.push(<Reactor id={data[i].id} source={data[i].source} status={data[i].status}/>)
        
      )
  }, [])

  // for(let i = 0; i < results.length; i++) {
  //   reactorList.push(<Reactor id={results[i].id} source={results[i].source} status={results[i].status}/>)
  // }
  
    
  return (
    <div>
      {list.map(reactor => 
        <Reactor key={reactor.id} id={reactor.id} source={reactor.source} status={reactor.status}/>
        )}
      {/* <h1>hello from the Main Container</h1> */}
    </div>
  )
}
    
export default MainContainer;