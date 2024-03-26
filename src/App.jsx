import { useEffect, useState } from "react";
import './App.css'
import CollectedColour from './Components/collected';

function App() {
  const [allCardsInfo, setAllCardsInfo] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchNumber, setSearchNumber] = useState('')
  const [filteredCards, setFilteredCards] = useState([])
  const [filterOption, setFilterOption] = useState('all');
  useEffect(getAllCardsInfo, [filterOption])

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
    const filteredItems = allCardsInfo.filter((card) =>
        String(card.number).includes(searchTerm)
    )
    setFilteredCards(filteredItems)
  }

  const handleFilterChange = (filter) => {
    setFilterOption(filter);
    if (filter === 'all') {
        setFilteredCards(allCardsInfo);
    } else {
        const filteredItems = allCardsInfo.filter(card => card.collected === (filter === 'true'));
        setFilteredCards(filteredItems);
    }
};

  return (
      <div className="flex flex-col items-center gap-5 bg-pokemon1 min-h-screen">
        <div className="flex gap-5 mt-5">
          <button onClick={() => handleFilterChange('all')} className="p-2 bg-slate-500">Show All</button>
          <button onClick={() => handleFilterChange('true')} className="p-2 bg-slate-500">Show Collected</button>
          <button onClick={() => handleFilterChange('false')} className="p-2 bg-slate-500">Show Not Collected</button>
        </div>
        <input type="text" value={searchName} onChange={handleInputChangeName} placeholder="Type to search by name" className="mt-5"/>
        <input type="text" value={searchNumber} onChange={handleInputChangeNumber} placeholder="Type to search by number"/>
          <table className="bg-slate-100">
              <thead>
                  <tr>
                      <th className="border border-slate-500 px-10">Name</th>
                      <th className="border border-slate-500 px-10">Number</th>
                      <th className="border border-slate-500 px-10">Type</th>
                      <th className="border border-slate-500 px-10">Collected</th>
                  </tr>
              </thead>
              <tbody>
                  {filteredCards.map(card => {
                      if (filterOption === 'all' ||
                          (filterOption === 'true' && card.collected) ||
                          (filterOption === 'false' && !card.collected)) {
                          return (
                              <tr key={card.id}>
                                  <td className="border border-slate-500 px-10">{card.name}</td>
                                  <td className="border border-slate-500 px-10 text-center">{card.number}</td>
                                  <td className="border border-slate-500 px-10">{card.type}</td>
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
