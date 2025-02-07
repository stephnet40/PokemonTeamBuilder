import { Ability, PokemonAbility } from "pokenode-ts"
import { useEffect, useState } from "react";
import "../css/Abilities.css"
import { getAbilityData } from "../../../utilities/apiUtilities";

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
                    <tr key={`${slot}-${item.ability.name}`} className="ability">
                        <td className="ability-name">{ability?.name.replace(/-/g, " ").replace(/^.|(?<=\s)(.)/g, char => char.toUpperCase())}</td>
                        <td className="ability-description">
                            <span className="hidden">{isHidden ? "(Hidden) " : ""}</span>
                            {ability?.flavor_text_entries.find(x => x.language.name == "en")?.flavor_text}
                        </td>
                    </tr>
                )
            }
            
        })

        return abilities;
    }

    return (
        <div>
            <div className="table-title">Abilities</div>
            <table className="ability-list">
                <tbody>
                    {currAbility.length ? displayAbilities() : null}
                </tbody>
            </table>
        </div>
    )
}

export default Abilities