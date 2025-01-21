const RandomGenerateButton = ({generatePokemon} : {generatePokemon: any}) => {
    function generateRandomNums(min: number, max: number) {
        const numbers =[];
        for (let i = 0; i < 6; i++) {
            const minCeiled = Math.ceil(min);
            const maxFloored = Math.floor(max);
            numbers.push(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)); 
        }
    
        generatePokemon(numbers);
    }
    
    return (
        <button onClick={() => generateRandomNums(1, 100)}>Generate Random Team</button>
    )
}

export default RandomGenerateButton;