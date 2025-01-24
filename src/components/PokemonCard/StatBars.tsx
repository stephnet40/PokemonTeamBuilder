import { PokemonStat } from "pokenode-ts";
import "./css/StatBars.css"

const StatBars = ({statsArr} : {statsArr: PokemonStat[]}) => {

    const statLabels = ["HP", "Atk", "Def", "Sp.Atk", "Sp.Def", "Spd"]

    const displayStats = () => {
        let stats: any[] = [];

        statsArr.forEach((stat, ind) => {
            const name = stat.stat.name;
            const value = stat.base_stat;
            stats.push(
                <div key={name}>
                    <div className="wrapper">
                        <span className="stat-label">{statLabels[ind]}</span>
                        <div className="bar">
                            <span style={{
                                width: (value / 255) * 100 + "%",
                                opacity: ((value / 255) * 100 < 1 ? 0 : 1)
                            }}></span>
                        </div>
                        <span className="bst">{value}</span>
                    </div>
                </div>
            )
        })

        return stats;
    }

     
    return (
        <div className="stats">
            {statsArr.length ? displayStats() : null}
        </div>
    )

    
}

export default StatBars;