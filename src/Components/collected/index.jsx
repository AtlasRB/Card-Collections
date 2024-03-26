function CollectedColour ({collected}) {
    return (
        <td className={`border border-slate-500 ${collected ? 'bg-green-500' : 'bg-red-500'}`}></td>
    );
}

export default CollectedColour