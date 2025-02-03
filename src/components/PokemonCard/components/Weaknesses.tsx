import { Type, TypeRelations } from "pokenode-ts"
import "../css/Weaknesses.css"
import { useEffect, useState } from "react"
import { getTypeData } from "../../utilities"

interface weaknessesProps {
    pokemonTypes: string[],
    loadedTypes: Type[],
    updateLoadedTypes: any
}

const Weaknesses = ({pokemonTypes, loadedTypes, updateLoadedTypes} : weaknessesProps) => {

    const [typeRelations, setTypeRelations] = useState<TypeRelations[]>([]);
    const getTypeRelations = (data: any) => {
        setTypeRelations(data);
    }

    useEffect(() => {
        getTypeData({types: pokemonTypes, loadedTypes, updateLoadedTypes, generateTypeRelations: getTypeRelations});
    }, [pokemonTypes]);

    const types = [
                    "normal", "fire", "water", "electric", "grass", "ice", "fighting", 
                    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", 
                    "dragon", "dark", "steel", "fairy"
                  ]


    const getModifier = (type: string, relations: TypeRelations) => {
        const noDamage = relations.no_damage_from;
        const halfDamage = relations.half_damage_from;
        const doubleDamage = relations.double_damage_from;

        if (noDamage.some(x => x.name == type))
            return 0;
        if (halfDamage.some(x => x.name == type))
            return 0.5;
        if (doubleDamage.some(x => x.name == type))
            return 2;
        return 1;
    }

    const getModClass = (modifier: number) => {
        if (modifier > 1) return "weakness";
        if (modifier == 1) return "normal"
        if (modifier > 0) return "resistance";
        return "immunity";
    }

    const displayTypeRelations = (chartType: string) => {
        let damageModifications: any = [];
        types.forEach(type => {
            const imgSrc = `typeSymbols/${type}.png`;
            const type1Mod = typeRelations.length ? getModifier(type, typeRelations[0]) : 1;
            const type2Mod = typeRelations.length > 1 ? getModifier(type, typeRelations[1]) : 1;
            const modClass = getModClass(type1Mod * type2Mod);
            if (modClass == chartType) {
                damageModifications.push(
                    <td key={`${type}-modification`} className={modClass}>
                        <div className="type-icon">
                            <img src={imgSrc}></img>
                        </div>
                        <div className="modifier">
                            {`x${(type1Mod * type2Mod)}`}
                        </div>             
                    </td>
                )
            }
            
        })
        return damageModifications.length ? damageModifications : <td className="empty-cell">--None--</td>;
    }

    return (
        <div>
            <div className="chart-type">Weaknesses</div>
            <table className="type-chart">
                <tbody>
                    <tr>
                        {displayTypeRelations("weakness")}
                    </tr>
                </tbody>
            </table>

            <div className="chart-type">Resistances</div>
            <table className="type-chart">
                <tbody>
                    <tr>
                        {displayTypeRelations("resistance")}
                    </tr>
                </tbody>
            </table>

            <div className="chart-type">Immunities</div>
            <table className="type-chart">
                <tbody>
                    <tr>
                        {displayTypeRelations("immunity")}
                    </tr>
                </tbody>
            </table>
        </div>
        
    )
}

export default Weaknesses