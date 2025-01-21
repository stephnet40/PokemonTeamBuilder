const PokemonCard = ({name}: {name: number}) => {
    if (name) {
        return (
            <div>
                <h3>{name}</h3>
                <p>Test Test Test</p>
            </div>
            );
    }
    return (
        <div>
            <h3>Empty</h3>
            <p>Test Test Test</p>
        </div>
    )
}

export default PokemonCard;