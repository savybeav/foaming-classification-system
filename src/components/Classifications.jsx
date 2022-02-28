import { useState} from "react";

function Classifications(props) {
  const [status, setStatus] = useState('');

  const { id } = props;
  
  const updateStatus = (e) => {
    const inputStatus = e.target.value;
    setStatus(inputStatus)
    console.log(inputStatus);
  }

  const handleSubmit =(e) => {
    
    console.log('status from state: ',status)
    fetch('/reactors', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        status: status
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(`Classifications fetch /reactors/: ERROR: `, err));
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Unclassified
        <input type="radio" value="unclassified" onChange={updateStatus}/>
      </label>
      <label>
        Non-foaming
        <input type="radio" value="non-foaming" onChange={updateStatus}/>
      </label>
      <label>
        Foaming
        <input type="radio" value="foaming" onChange={updateStatus}/>
      </label>
      <button type="submit" >Submit</button>
    </form>
  )
}

export default Classifications;
