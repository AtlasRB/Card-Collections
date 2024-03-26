import { useEffect, useState } from "react";
import CollectedColour from "../collected";

function OneCardsTable() {
    const [allCardsInfo, setAllCardsInfo] = useState([])
    const [search, setSearch] = useState('')
    const [filteredCards, setFilteredCards] = useState([])
    useEffect(getAllCardsInfo, [])

    function getAllCardsInfo () {
        fetch('http://localhost:8000/api/card')
        .then(response => response.json())
        .then(data => {
            setAllCardsInfo(data.data);
            setFilteredCards(data.data)
        })
    }

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm)
        const filteredItems = allCardsInfo.filter((card) =>
            card.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredCards(filteredItems)
    }

    return (
        <>
        <input type="text" value={search} onChange={handleInputChange} placeholder="Type to search by name"/>
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
                {filteredCards.map(card => 
                    <tr>
                        <td className="border border-slate-500 px-10">{card.name}</td>
                        <td className="border border-slate-500 px-10 text-center">{card.number}</td>
                        <td className="border border-slate-500 px-10">{card.type}</td>
                        <CollectedColour collected={card.collected}/>
                    </tr>
                )}
            </tbody>  
        </table>
        </>
    )
}

export default OneCardsTable