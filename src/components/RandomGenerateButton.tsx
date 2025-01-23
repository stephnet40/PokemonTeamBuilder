import { PokemonClient, PokemonEntry } from "pokenode-ts";

const RandomGenerateButton = ({allPokemon, generatePokemon: generatePokemon} : {allPokemon: PokemonEntry[], generatePokemon: any}) => {
    function generateRandomNums(min: number, max: number) {
        const numbers = [];
        for (let i = 0; i < 6; i++) {
            const minCeiled = Math.ceil(min);
            const maxFloored = Math.floor(max);
            numbers.push(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)); 
        }
        
        getData(numbers);
    }

    const getData = async (num: number[]) => {
        const api = new PokemonClient();
        const responses = await Promise.all(
            num.map(id => api.getPokemonById(id).then(data => data))
        );

        generatePokemon(responses);
    }
    
    return (
        <button onClick={() => generateRandomNums(1, 1025)}>Generate Random Team</button>
    )
}

export default RandomGenerateButton;