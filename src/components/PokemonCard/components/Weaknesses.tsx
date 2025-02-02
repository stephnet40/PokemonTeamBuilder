import "../css/Weaknesses.css"

const Weaknesses = () => {

    const types = [
                    "normal", "fire", "water", "electric", "grass", "ice", "fighting", 
                    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", 
                    "dragon", "dark", "steel", "fairy"
                  ]

    const getTableHeader = () => {
        let headers: any = [];
        types.forEach((type, ind) => {
            const imgSrc = `typeSymbols/${type}.png`;
            headers.push(
                <th key={`${ind + 1} - ${type}`}>
                    <img src={imgSrc}></img>
                </th>
            )
        })

        return headers;
    }

    return (
        <table>
            <tr>
                {getTableHeader()}
            </tr>
        </table>
    )
}

export default Weaknesses