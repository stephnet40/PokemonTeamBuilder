import { GameClient, Pokedex, PokemonEntry } from 'pokenode-ts'
import './PokedexSelect.css'
import { useState } from 'react'

const PokedexSelect = ({loadedDexes, updateLoadedDexes, getSelectedDex} : {loadedDexes: Pokedex[], updateLoadedDexes: any, getSelectedDex: any}) => {

    const gameList = [
        ["2", "Red, Blue & Yellow"], ["3", "Gold, Silver & Crystal"], ["4", "Ruby, Sapphire & Emerald"], ["40", "FireRed & LeafGreen"], 
        ["5", "Diamond & Pearl"], ["6", "Platinum"], ["7", "HeartGold & SoulSilver"], ["8", "Black & White"], 
        ["9", "Black 2 & White 2"], ["12", "X & Y"], ["15", "Omega Ruby & Alpha Sapphire"], ["16", "Sun & Moon"], 
        ["21", "Ultra Sun & Ultra Moon"], ["26", "Let's Go Pikachu & Let's Go Eevee"], ["27", "Sword & Shield"], 
        ["41", "Brilliant Diamond & Shining Pearl"], ["30", "Pokemon Legends Arceus"], ["31", "Scarlet & Violet"]
    ]

    const [selectedGame, setSelectedGame] = useState("1");
    const onGameChange = (event: any) => {
        setSelectedGame(event.target.value)
        getSelectedPokedex(event.target.value)
    }

    function getSelectedPokedex(id: any) {
        if (id == 40 || id == 41) {
            id = id == 40 ? 2 : 5;
        }
        
        if (loadedDexes.some(x => x.id == id)) {
            let pokedex = loadedDexes.find(x => x.id == id)?.pokemon_entries;
            if (id == 12 || id == 27 || id == 31) {
                const pokedex2 = loadedDexes.find(x => x.id == id + 1)?.pokemon_entries;
                const pokedex3 = loadedDexes.find(x => x.id == id + 2)?.pokemon_entries;
                pokedex = pokedex?.concat(pokedex2!, pokedex3!);
            }     

            getSelectedDex(pokedex)
        } else {
            getPokedexData(parseInt(id));
        }
    }

    const getPokedexData = async (id: number) => {
        const api = new GameClient();
        const response = await api.getPokedexById(id).then(data => data);

        let pokedex = response.pokemon_entries;

        let newLoaded = loadedDexes;
        newLoaded.push(response);

        if (id == 12 || id == 27 || id == 31) {
            const response2 = await api.getPokedexById(id + 1).then(data => data);
            const response3 = await api.getPokedexById(id + 2).then(data => data);

            newLoaded.push(response2);
            newLoaded.push(response3);

            pokedex = pokedex.concat(response2.pokemon_entries, response3.pokemon_entries);
        }
        updateLoadedDexes(newLoaded);

        getSelectedDex(pokedex);
    }
    
    return (
        <div id="game-select">
            <div>
                <input type="radio" id="1" name="game-list" value="1" checked={selectedGame == "1"} onChange={onGameChange}></input>
                <label>All</label>
            </div>
            <div id="games"> 
            {gameList.map(([dex, game], index) => {
                return (
                    <div key={index}>
                        <input type="radio" id={dex} name="game-list" value={dex} checked={selectedGame == dex} onChange={onGameChange}></input>
                        <label>{game}</label>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default PokedexSelect;