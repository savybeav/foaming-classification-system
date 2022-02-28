


function Reactor(props) {
  const { source, id, status } = props;

  const URL = `https://take-home-foam-challenge.s3.us-west-2.amazonaws.com/${source}`
  
  return (
    <div>
      <img src={URL} alt='reactor'/>
      <p>{id}</p>
      <p>{status}</p>
    </div>
  )
}

export default Reactor;
