import { useEffect, useState} from "react";

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
    <div id="mainContainer">
      <h1>Foaming Classification System</h1>
      <Filter/>
      {list.map(reactor => 
        <Reactor key={reactor.id} id={reactor.id} source={reactor.source} status={reactor.status}/>
      )}
    </div>
  )
}
    
export default MainContainer;