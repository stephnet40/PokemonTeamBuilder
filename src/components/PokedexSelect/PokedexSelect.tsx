import './PokedexSelect.css'

const PokedexSelect = () => {

    const gameList = [
        ["kantoDex", "Red, Blue & Yellow"], ["ogJohtoDex", "Gold, Silver & Crystal"], ["ogHoennDex", "Ruby, Sapphire & Emerald"],
        ["gen3Kanto", "FireRed & LeafGreen"], ["ogSinnohDex", "Diamond & Pearl"], ["extSinnohDex", "Platinum"], ["gen4JohtoDex", "HeartGold & SoulSilver"],
        ["ogUnovaDex", "Black & White"], ["sequelUnovaDex", "Black 2 & White 2"], ["kalosDex", "X & Y"], ["gen6HoennDex", "Omega Ruby & Alpha Sapphire"],
        ["ogAlolaDex", "Sun & Moon"], ["ultraAlolaDex", "Ultra Sun & Ultra Moon"], ["letsGoKantoDex", "Let's Go Pikachu & Let's Go Eevee"],
        ["galarDex", "Sword & Shield"], ["gen8SinnohDex", "Brilliant Diamond & Shining Pearl"], ["hisuiDex", "Pokemon Legends Arceus"], ["paldeaDex", "Scarlet & Violet"]
    ]

    return (
        <div id="game-select">
            <div>
                <input type="radio" id="nationalDex" name="game-list" value="nationalDex" checked></input>
                <label>All</label>
            </div>
            <div id="games"> 
            {gameList.map(([dex, game], index) => {
                return (
                    <div key={index}>
                        <input type="radio" id={dex} name="game-list" value={dex}></input>
                        <label>{game}</label>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default PokedexSelect;