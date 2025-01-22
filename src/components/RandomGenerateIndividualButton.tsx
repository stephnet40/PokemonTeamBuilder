import { PokemonClient } from "pokenode-ts";

const RandomGenerateIndividualButton = ({generateNewPokemon: generateNewPokemon} : {generateNewPokemon: any}) => {
    function generateRandomNum(min: number, max: number) {
        let number: number;
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        number = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
        
        getData(number);
    }

    const getData = async (num: number) => {
        const api = new PokemonClient();
        const response = await api.getPokemonById(num).then(data => data)
        generateNewPokemon(response);
    }
    
    return (
        <button onClick={() => generateRandomNum(1, 1025)}>Randomize</button>
    )
}

export default RandomGenerateIndividualButton;