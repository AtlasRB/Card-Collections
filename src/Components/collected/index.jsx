function CollectedColour ({collected}) {
    return (
        <td className={`border border-black ${collected ? 'bg-green-500' : 'bg-red-500'}`}></td>
    );
}

export default CollectedColour