import Modal from "../modals/Modal";
import "../css/PokedexModal.css"
import { Pokemon, PokemonSpecies } from "pokenode-ts";

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

    const flavorTextArr = species.flavor_text_entries.filter(x => x.language.name == "en");

    const flavorText = flavorTextArr.reduce((map, item) => {
        map.set(item.flavor_text, (map.get(item.flavor_text) || "") + `${item.version.name},`)
        return map;
    }, new Map())

    //const normalSpriteSrc = pokemon.sprites.other?.home.front_default!;
    //const shinySpriteSrc = pokemon.sprites.other?.home.front_shiny!;

    const normalSpriteSrc = pokemon.sprites.other?.["official-artwork"].front_default!;
    const shinySpriteSrc = pokemon.sprites.other?.["official-artwork"].front_shiny!;

    const convertHeight = (height: number) => {
        // Conver to inches
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

    const displayDexEntries = () => {
        let dexEntries: any = [];
        let ind = 0;
        flavorText.forEach((games, text) => {
            ind++;
            dexEntries.push(
                <tr key={`flavor-text-${ind}`}>
                    <td>
                        {games}
                    </td>
                    <td>
                        {text}
                    </td>
                </tr>
            )
        })

        return dexEntries;
    }

    return (
        <Modal
            isOpen={isOpen}
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
                        <div>Height: {convertHeight(pokemon.height)}</div>
                        <div>Weight: {convertWeight(pokemon.weight)}</div>
                    </div>
                </div>
                <table>
                    <tbody>
                        {displayDexEntries()}
                    </tbody>
                </table>
            </div>
        </Modal>
    )   
}

export default PokedexModal