function Filter() {
  
  const handleSelect = (e) => {
    const status = e.target.value
    // when an option is selected, make a fetch passing in the 
    fetch(`/reactors/${status}`)
      .then(res => res.json())
      .then(data => console.log('data from filter: ',data))
      .catch(err => console.log(`Filter fetch /reactors/${status}}: ERROR: `, err));
  }
  
  return (
    <div>
      <select className='filter-select' value={'Status'} onChange={handleSelect}>
        <option value='all'>All Reactors</option>
        <option value='unclassified'>Unclassified</option>
        <option value='non-foaming'>Non-foaming</option>
        <option value='foaming'>Foaming</option>
     </select>
    </div>
  )
}

export default Filter;
