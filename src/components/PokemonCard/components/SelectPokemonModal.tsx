import { PokemonClient, PokemonEntry } from "pokenode-ts";
import Modal from "../modals/Modal";
import "../css/Modal.css";
import { useState } from "react";
import { PokemonInfo } from "../../interfaces";

interface SelectPokemonModalProps {
    isOpen: boolean;
    pokedex?: PokemonEntry[];
    onSubmit: (data: any) => void;
    onClose: () => void;
}

const SelectPokemonModal = ({isOpen, pokedex, onSubmit, onClose}: SelectPokemonModalProps) => {
    
    const handleClose = () => {
        onClose();
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const pokemonGroups: any = [];

    for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        const entries = pokedex?.filter(x => x.pokemon_species.name[0] == letter);
        const group: string[] = [];

        entries?.forEach(x => {
            group.push(x.pokemon_species.name);
        })

        pokemonGroups.push(group.sort());
    }

    const [selectedDropdowns, setSelectedDropdown] = useState<(string | null)[]>(new Array(26).fill(null));
    const handleDropdownChange = (index: number, value: string) => {
        const newSelectedDropdowns = selectedDropdowns?.map((val, i) => (i === index ? value : null));
        setSelectedDropdown(newSelectedDropdowns);
    }
    
    const displayDropdowns = () => {
        let dropdowns: any = [];
        pokemonGroups.forEach((arr: any, ind: any) => {
            const letter = alphabet[ind];
            dropdowns.push(
                <div key={`${letter}-div`}>
                    <select key={`${letter}-dropdown`} value={selectedDropdowns[ind] || ''} onChange={(e) => handleDropdownChange(ind, e.target.value)}>
                        <option key={`${letter}-default`} className="default" value="">-- {letter.toUpperCase()} --</option>
                        {arr.map((name: string) => <option key={name} value={name}>{name.replace(/^./, (char: string) => char.toUpperCase())}</option>)}
                    </select>
                </div>
            )
        })
        return dropdowns;
    }

    const getData = async (name: string | undefined) => {
        const api = new PokemonClient();
        const species = await api.getPokemonSpeciesByName(name!).then(data => data);
        const pokemon = await api.getPokemonById(species.id).then(data => data);

        const pokemonInfo = {
            name: name,
            species: species,
            pokemon: pokemon
        } as PokemonInfo;

        onSubmit(pokemonInfo);
        handleClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={true}
            onClose={handleClose}
        >
            <div className="select-pokemon" key="dropdowns">
                {pokemonGroups.length ? displayDropdowns() : null}
            </div>
            
            <button onClick={() => getData(selectedDropdowns.find(x => x !== null))} disabled={!selectedDropdowns.find(x => x !== null)}>Select</button>
        </Modal>
    )
}

export default SelectPokemonModal;