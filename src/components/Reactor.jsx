import Classifications from './Classifications.jsx'


function Reactor(props) {
  const { source, id, status } = props;

  const URL = `https://take-home-foam-challenge.s3.us-west-2.amazonaws.com/${source}`
  
  return (
    <div className='reactorCard'>
      <img src={URL} alt='reactor'/>
      <p>ID: {id}</p>
      <p>Current Status: {status}</p>
      <Classifications id={id}/>
    </div>
  )
}

export default Reactor;
