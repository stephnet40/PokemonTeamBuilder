import { Pokemon } from "pokenode-ts";
import Modal from "../modals/Modal";
import { PokemonInfo } from "../../interfaces";

interface SelectFormModalProps {
    isOpen: boolean;
    pokemonInfo?: PokemonInfo;
    onSubmit: (data: any) => void;
    onClose: () => void;
}

const SelectFormModal = ({isOpen, pokemonInfo, onSubmit, onClose} : SelectFormModalProps) => {

    const handleClose = () => {
        onClose();
    }

    const varieties = pokemonInfo?.varieties;

    const onSelect = (newPokemon: Pokemon) => {
        const newInfo = {
            name: pokemonInfo?.name,
            species: pokemonInfo?.species,
            pokemon: newPokemon,
            varieties: varieties,
            evolutionChain: pokemonInfo?.evolutionChain
        } as PokemonInfo

        onSubmit(newInfo);
        handleClose();
    } 

    const displayVarieties = () => {
        let options: any = [];
        varieties?.forEach((pokemon: Pokemon) => {
            options.push(
                <button key={`${pokemon.name}-option`} onClick={() => onSelect(pokemon)}>
                    <img src={pokemon.sprites.front_default!}></img>
                    <h3>{pokemon.name}</h3>
                </button>
            )
        })

        return options;
    }

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={true}
            onClose={handleClose}
        >
            <div key="varieties">
                {displayVarieties()}
            </div>
        </Modal>
    )
}

export default SelectFormModal;