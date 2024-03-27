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
      fetch('http://localhost:8000/api/card')
      .then(response => response.json())
      .then(data => {
          setAllCardsInfo(data.data);
          setFilteredCards(data.data)
      })
  }

  const handleInputChangeName = (e) => {
      const searchTerm = e.target.value;
      setSearchName(searchTerm)
      const filteredItems = allCardsInfo.filter((card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCards(filteredItems)
  }

  const handleInputChangeNumber = (e) => {
    const searchTerm = e.target.value;
    setSearchNumber(searchTerm)
    const filteredItems = filteredCards.filter((card) =>
        String(card.number).includes(searchTerm)
    )
    setFilteredCards(filteredItems)
  }

  const handleFilterChange = (filter) => {
    setFilterOption(filter);
  };

  return (
      <div className="flex flex-col items-center gap-5 bg-pokemon1 min-h-screen">
        <div className="flex self-center gap-5 mt-5">
          <button onClick={() => handleFilterChange('all')} className="p-3 w-48 text-white bg-blue-700 hover:bg-blue-800 rounded-lg">Show All</button>
          <button onClick={() => handleFilterChange('true')} className="p-3 w-48 text-white bg-blue-700 hover:bg-blue-800 rounded-lg">Show Collected</button>
          <button onClick={() => handleFilterChange('false')} className="p-3 w-48 text-white bg-blue-700 hover:bg-blue-800 rounded-lg">Show Not Collected</button>
        </div>
        <input type="text" value={searchName} onChange={handleInputChangeName} placeholder="Type to search by name" className="p-1 w-96 rounded-md"/>
        <input type="text" value={searchNumber} onChange={handleInputChangeNumber} placeholder="Type to search by number" className="p-1 w-96 rounded-md"/>
          <table className="bg-slate-100 border border-black border-2">
              <thead>
                  <tr className="border-b-2">
                      <th className="border border-black border-y-2 px-10">Name</th>
                      <th className="border border-black border-y-2 px-10">Number</th>
                      <th className="border border-black border-y-2 px-10">Type</th>
                      <th className="border border-black border-y-2 px-10">Collected</th>
                  </tr>
              </thead>
              <tbody>
                  {filteredCards.map(card => {
                      if (filterOption === 'all' ||
                          (filterOption === 'true' && card.collected) ||
                          (filterOption === 'false' && !card.collected)) {
                          return (
                              <tr key={card.id}>
                                  <td className="border border-black px-10">{card.name}</td>
                                  <td className="border border-black px-10 text-center">{card.number}</td>
                                  <td className="border border-black px-10">{card.type}</td>
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

export default App