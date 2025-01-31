import { Ability, PokemonAbility } from "pokenode-ts"
import { useEffect, useState } from "react";
import "../css/Abilities.css"
import { getAbilityData } from "../../utilities";

interface AbilitiesProps {
    abilityList: PokemonAbility[],
    loadedAbilities: Ability[],
    updateLoadedAbilities: any
}

const Abilities = ({abilityList, loadedAbilities, updateLoadedAbilities} : AbilitiesProps) => {

    const [currAbility, setCurrAbility] = useState<Ability[]>([]);
    const getCurrAbility = (data: any) => {
        setCurrAbility([...data]);
    }
    
    useEffect(() => {
        getAbilityData({abilities: abilityList, loadedAbilities, updateLoadedAbilities, generateAbility: getCurrAbility})
    }, [abilityList]);

    const displayAbilities = () => {
        let abilities: any = [];
        abilityList.forEach((item, ind) => {
            const isHidden = item.is_hidden;
            const slot = item.slot;
            const ability = currAbility[ind];
            if (ability) {
                abilities.push(
                    <div key={`${slot}-${item.ability.name}`}>
                        <span>{`${ability?.name.replace("-", " ").replace(/^.|(?<=\s)(.)/g, char => char.toUpperCase())}: `}</span>
                        {ability?.flavor_text_entries.find(x => x.language.name == "en")?.flavor_text}
                    </div>
                )
            }
            
        })

        return abilities;
    }

    return (
        <div>
            {currAbility.length ? displayAbilities() : null}
        </div>
    )
}

export default Abilities