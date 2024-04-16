import { useEffect, useState } from "react";
import './App.css'
import CollectedColour from './Components/collected';

function App() {
  const [allCardsInfo, setAllCardsInfo] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchNumber, setSearchNumber] = useState('')
  const [filteredCards, setFilteredCards] = useState([]);
  const [filterOption, setFilterOption] = useState('all');
  
  useEffect(getAllCardsInfo, [])

  function getAllCardsInfo () {
      fetch('https://cardcollector.2024-connory.dev.io-academy.uk/api/card')
      .then(response => response.json())
      .then(data => {
          setAllCardsInfo(data.data)
          setFilteredCards(data.data)
      })
  }

  const handleInputChange = () => {
    const filteredItems = allCardsInfo.filter((card) =>
      card.name.toLowerCase().includes(searchName.toLowerCase()) &&
      String(card.number).includes(searchNumber)
    );
    setFilteredCards(filteredItems);
  }

  const handleFilterChange = (filter) => {
    setFilterOption(filter);
  };

  return (
      <div className="flex flex-col items-center gap-5 bg-pokemon1 min-h-screen">
        <div className="flex flex-col md:flex-row self-center gap-5 mt-5">
          <button onClick={() => handleFilterChange('all')} className="p-3 w-48 text-white bg-blue-700 hover:bg-blue-800 rounded-lg">Show All</button>
          <button onClick={() => handleFilterChange('true')} className="p-3 w-48 text-white bg-blue-700 hover:bg-blue-800 rounded-lg">Show Collected</button>
          <button onClick={() => handleFilterChange('false')} className="p-3 w-48 text-white bg-blue-700 hover:bg-blue-800 rounded-lg">Show Not Collected</button>
        </div>
        <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Type to search by name" className="p-1 w-72 md:w-96 rounded-md"/>
        <input type="text" value={searchNumber} onChange={(e) => setSearchNumber(e.target.value)} placeholder="Type to search by number" className="p-1 w-72 md:w-96 rounded-md"/>
        <button type="button" onClick={handleInputChange} className="p-1 w-48 bg-white hover:bg-slate-100 rounded-md">Search</button>
          <table className="bg-slate-100 border border-black border-2 mb-10">
              <thead>
                  <tr className="border-b-2">
                      <th className="border border-black border-y-2">Name</th>
                      <th className="border border-black border-y-2 px-1 md:px-10">Number</th>
                      <th className="border border-black border-y-2">Type</th>
                      <th className="border border-black border-y-2 px-1 md:px-10">Collected</th>
                  </tr>
              </thead>
              <tbody>
                  {filteredCards.map(card => {
                      if (filterOption === 'all' ||
                          (filterOption === 'true' && card.collected) ||
                          (filterOption === 'false' && !card.collected)) {
                          return (
                              <tr key={card.id}>
                                  <td className="border border-black px-1 md:px-10">{card.name}</td>
                                  <td className="border border-black text-center">{card.number}</td>
                                  <td className="border border-black px-1 md:px-10">{card.type}</td>
                                  <CollectedColour collected={card.collected}/>
                              </tr>
                          );
                      }
                      return null;
                  })}
              </tbody>
          </table>
      </div>
  )
}

export default App;
