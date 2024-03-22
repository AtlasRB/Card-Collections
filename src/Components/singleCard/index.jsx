import { useEffect, useState } from "react";
import CollectedColour from "../allCards/collected";

function OneCardsTable() {
    const [data, setData] = useState([])
    useEffect(getOneCardsInfo, [])

    function getOneCardsInfo() {
        fetch('http://localhost:8000/api/card/2')
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            setData(data.data)
        })
    }

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
                <tr>
                    <td className="border border-slate-500 px-10">{data.name}</td>
                    <td className="border border-slate-500 px-10 text-center">{data.number}</td>
                    <td className="border border-slate-500 px-10">{data.type}</td>
                    <CollectedColour collected={data.collected}/>
                </tr>
            </tbody>
        </table>
    )
}

export default OneCardsTable