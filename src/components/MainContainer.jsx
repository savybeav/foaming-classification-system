import React, { useEffect, useState} from "react";

import Reactor from './Reactor.jsx';
import Filter from './Filter.jsx';

function MainContainer() {
      
  const [list, setList] = useState([]);
  
  useEffect(() => {
    fetch('/reactors/all')
      .then(res => res.json())
      .then(setList)
      .catch(err => console.log('MainContainer fetch /reactors/all: ERROR: ', err));
  }, [])
  
    
  return (
    <div>
      <Filter/>
      {list.map(reactor => 
        <Reactor key={reactor.id} id={reactor.id} source={reactor.source} status={reactor.status}/>
        )}
      {/* <h1>hello from the Main Container</h1> */}
    </div>
  )
}
    
export default MainContainer;