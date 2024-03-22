import { useEffect, useState } from "react";
import CollectedColour from "./collected";

function AllCardsTable() {
    const [allCardsInfo, setAllCardsInfo] = useState([])
    useEffect(getAllCardsInfo, [])

    function getAllCardsInfo () {
        fetch('http://localhost:8000/api/card')
        .then(response => response.json())
        .then(data => {
            setAllCardsInfo(data.data);
        })
    }
    console.log(allCardsInfo) 

    return (
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
                {allCardsInfo.map((card, index) => (
                        <tr key={index}>
                            <td className="border border-slate-500 px-10">{card.name}</td>
                            <td className="border border-slate-500 px-10 text-center">{card.number}</td>
                            <td className="border border-slate-500 px-10">{card.type}</td>
                            <CollectedColour collected={card.collected}/>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default AllCardsTable