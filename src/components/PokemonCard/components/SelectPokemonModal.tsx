import { EvolutionChain, PokemonEntry } from "pokenode-ts";
import Modal from "../layout/Modal";
import "../css/Modal.css";
import "../css/SelectPokemonModal.css"
import { useState } from "react";
import { PokemonInfo } from "../../../types/PokemonInfo";
import { getPokemonData } from "../../../utilities/apiUtilities";
import { formatName } from "../../../utilities/formatUtilities";

interface SelectPokemonModalProps {
    isOpen: boolean;
    pokedex?: PokemonEntry[];
    loadedPokemon: PokemonInfo[];
    updateLoadedPokemon: (data: any) => void;
    loadedEvolutionChains: EvolutionChain[];
    updateLoadedEvolutionChains: (data: any) => void;
    onSubmit: (data: any) => void;
    onClose: () => void;
}

const SelectPokemonModal = (
    {isOpen, pokedex, loadedPokemon, updateLoadedPokemon,
        loadedEvolutionChains, updateLoadedEvolutionChains, onSubmit, onClose}
    : SelectPokemonModalProps) => {
    
    const handleClose = () => {
        onClose();
        
        // Clear dropdown selection
        setSelectedDropdown(new Array(26).fill(null))
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
        const newSelectedDropdowns = selectedDropdowns?.map((_val, i) => (i === index ? value : null));
        setSelectedDropdown(newSelectedDropdowns);
    }
    
    const displayDropdowns = () => {
        let dropdowns: any = [];
        pokemonGroups.forEach((arr: any, ind: any) => {
            const letter = alphabet[ind];
            dropdowns.push(
                <div key={`${letter}-div`}>
                    <select key={`${letter}-dropdown`} value={selectedDropdowns[ind] || ''} disabled={!arr.length} onChange={(e) => handleDropdownChange(ind, e.target.value)}>
                        <option key={`${letter}-default`} className="default" value="">-- {letter.toUpperCase()} --</option>
                        {arr.map((name: string) => <option key={name} value={name}>{formatName(name)}</option>)}
                    </select>
                </div>
            )
        })
        return dropdowns;
    }

    const getData = (name: string) => {
        let pokemonInfo;

        if (loadedPokemon.some(x => x.name == name)) {
            pokemonInfo = loadedPokemon.find(x => x.name == name);
            onSubmit(pokemonInfo);
        } else {
            getPokemonData({name, loadedPokemon, updateLoadedPokemon, loadedEvolutionChains, updateLoadedEvolutionChains, generateNewPokemon: onSubmit})
        }    
        
        handleClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            modalClass="select-pokemon-modal"
        >
            <div className="select-pokemon" key="dropdowns">
                {pokemonGroups.length ? displayDropdowns() : null}
            </div>
            
            <div className="modal-bottom-btns"> 
                <button onClick={() => getData(selectedDropdowns.find(x => x !== null)!)} disabled={!selectedDropdowns.find(x => x !== null)}>Select</button>
                <button className="modal-close-btn" onClick={handleClose}>Close</button>
            </div>
        </Modal>
    )
}

export default SelectPokemonModal;