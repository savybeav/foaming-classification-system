import React, { useEffect, useState} from "react";
import MainContainer from './components/MainContainer';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/reactors')
      .then(res => res.json())
      .then(data => setData(data.message))
  }, [])

  return (
    <div className='App'>
      <MainContainer/>
    </div>
  );
}

export default App;