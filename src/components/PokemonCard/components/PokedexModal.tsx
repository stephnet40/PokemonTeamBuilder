import Modal from "../layout/Modal";
import "../css/PokedexModal.css"
import { Pokemon, PokemonSpecies } from "pokenode-ts";
import { formatDexEntry, formatGames, formatName } from "../../../utilities/formatUtilities";
import TabList from "../layout/Tabs/TabList";
import TabItem from "../layout/Tabs/TabItem";

interface PokedexModalProps {
    isOpen: boolean;
    species: PokemonSpecies;
    pokemon: Pokemon;
    onClose: () => void;
}

const PokedexModal = ({isOpen, species, pokemon, onClose} : PokedexModalProps) => {

    const handleClose = () => {
        onClose();
    }

    const genList = ["gen1", "gen2", "gen3", "gen4", "gen5", "gen6", "gen7", "gen8", "gen9"];
    const generations = [
        {id:"gen1", games:["red", "blue", "yellow"]}, {id:"gen2", games:["gold", "silver", "crystal"]}, 
        {id:"gen3", games:["ruby", "sapphire", "emerald", "firered", "leafgreen"]}, 
        {id:"gen4", games:["diamond", "pearl", "platinum", "heartgold", "soulsilver"]},
        {id:"gen5", games:["black", "white", "black-2", "white-2"]},
        {id:"gen6", games:["x", "y", "omega-ruby", "alpha-sapphire"]},
        {id:"gen7", games:["sun", "moon", "ultra-sun", "ultra-moon", "lets-go-eevee", "lets-go-pikachu"]},
        {id:"gen8", games:["sword", "shield", "legends-arceus"]}, {id:"gen9", games:["scarlet", "violet"]}
    ]

    const flavorTextArr = species.flavor_text_entries.filter(x => x.language.name == "en");

    const flavorText = flavorTextArr.reduce((map, item) => {
        map.set(item.flavor_text, (map.get(item.flavor_text) || "") + `${item.version.name} `)
        return map;
    }, new Map())

    const gamesPresent = flavorTextArr.reduce((arr, item) => {
        arr.push(item.version.name);
        return arr;
    }, new Array())

    const normalSpriteSrc = pokemon.sprites.other?.["official-artwork"].front_default!;
    const shinySpriteSrc = pokemon.sprites.other?.["official-artwork"].front_shiny!;

    const convertHeight = (height: number) => {
        // Convert to inches
        const totalInches = height * 3.937;

        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);

        return `${feet}'${inches.toString().padStart(2, "0")}"`
    }
    
    const convertWeight = (weight: number) => {
        const pounds = weight / 4.536;
        const converted = Math.round(pounds * 10) / 10;
        return `${converted}lbs`
    }

    const displayDexEntries = (gen: string) => {
        let dexEntries: any = [];
        let ind = 0;
        flavorText.forEach((games, text) => {
            const gamesGen = generations.find(x => x.id == gen)?.games;
            let gamesArr = games.trim().split(" ");
            games = gamesArr.filter((x: string) => gamesGen?.indexOf(x) !== -1).join(",");
            ind++;
            if (games.length) {
                dexEntries.push(
                    <tr key={`flavor-text-${ind}`}>
                        <td className="game-titles">
                            {formatGames(games)}
                        </td>
                        <td className="dex-description">
                            {formatDexEntry(text)}
                        </td>
                    </tr>
                )
            }     
        })

        return dexEntries;
    }

    return (
        <Modal
            isOpen={isOpen}
            modalClass="pokedex-modal"
            hasCloseBtn={true}
            onClose={handleClose}
        >
            <div>
                <div className="pokedex-info-header">
                    <div className="pokedex-sprites">
                        <img src={normalSpriteSrc}></img>
                        <img src={shinySpriteSrc}></img>
                    </div>
                    <div>
                        <h2>{formatName(pokemon.name)}</h2>
                        <div><span className="pokedex-label">Height: </span>{convertHeight(pokemon.height)}</div>
                        <div><span className="pokedex-label">Weight: </span>{convertWeight(pokemon.weight)}</div>
                    </div>
                </div>
                <div>
                    <TabList activeTabIndex={0}>
                        {genList.map(gen => { 
                            const gamesGen = generations.find(x => x.id == gen)?.games;
                            if (gamesGen?.some(game => gamesPresent.includes(game))) {
                                return (
                                    <TabItem key={`${pokemon.name}-${gen}`} label={gen.replace(/^./, char => char.toUpperCase()).split(/(\w+)(\d+)/).join(" ")}>  
                                        <table className="dex-entries">
                                            <tbody>
                                                {displayDexEntries(gen)}
                                            </tbody>
                                        </table>
                                    </TabItem>
                                )
                            } else {
                                return <div></div>
                            }   
                        })}
                    </TabList>
                </div>
                
            </div>
        </Modal>
    )   
}

export default PokedexModal