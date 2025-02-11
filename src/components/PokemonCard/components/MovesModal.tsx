import { Move } from "pokenode-ts";
import Modal from "../layout/Modal";
import { useEffect, useState } from "react";
import { MoveDetails, PokemonInfo } from "../../../types/PokemonInfo";
import { getMoveData } from "../../../utilities/apiUtilities";
import TabList from "../layout/Tabs/TabList";
import TabItem from "../layout/Tabs/TabItem";
import { formatVersionTitles } from "../../../utilities/formatUtilities";
import "../css/MovesModal.css";

interface MovesModalProps {
    isOpen: boolean;
    learnMethod: string;
    pokemonInfo: PokemonInfo;
    loadedMoves: Move[];
    updateLoadedMoves: any;
    onClose: () => void;
}

const MovesModal = ({isOpen, learnMethod, pokemonInfo, loadedMoves, updateLoadedMoves, onClose} : MovesModalProps) => {

    const handleClose = () => {
        onClose()
        setSelectedMoves([]);
    }

    const moveLabels = ["Move Name", "Type", "Cat.", "Acc.", "Pow.", "PP", "Description"]
    const versionGroups = [ "red-blue", "yellow", "gold-silver", "crystal", "ruby-sapphire", "emerald",
                            "firered-leafgreen", "diamond-pearl", "platinum", "heartgold-soulsilver",
                            "black-white", "black-2-white-2", "x-y", "omega-ruby-alpha-sapphire",
                            "sun-moon", "ultra-sun-ultra-moon", "lets-go-pikachu-lets-go-eevee",
                            "sword-shield", "brilliant-diamond-and-shining-pearl", "legends-arceus",
                            "scarlet-violet"
                          ]

    const [selectedMoves, setSelectedMoves] = useState<MoveDetails[]>([]);
    const generateMoves = (data: any) => {
        setSelectedMoves(data);
    }

    useEffect(() => {
        if (isOpen) {
            if (!pokemonInfo.moves.length) {
                let movesList = pokemonInfo.pokemon.moves;
                const selected = movesList.filter(x => x.version_group_details.some(y => y.move_learn_method.name == learnMethod))
                getMoveData({moves: selected, learnMethod, loadedMoves, updateLoadedMoves, generateMoves});
            } else {
                generateMoves(pokemonInfo.moves);
            }
        }        
    }, [isOpen])

    const versionsPresent = selectedMoves.reduce((set, item) => {
        set.add(item.versionGroup);
        return set;
    }, new Set()) 

    const displayMoves = (version: string) => {
        let moveList: any = [];
        const currMoves = selectedMoves.filter(x => x.versionGroup == version).sort((a, b) => a.level - b.level);
        currMoves?.forEach((item, ind) => {
            const moveData = item.move;
            const description = moveData.flavor_text_entries.find(x => x.language.name == "en");
            moveList.push(
                <tr key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-${ind}`}>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-${ind}-method`}>
                        {item.level}
                    </td>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-${ind}-name`}>
                        {moveData.name}
                    </td>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-${ind}-type`}>
                        <img key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-${ind}-type-img`} 
                             src={`typeSymbols/${item.move.type.name}.png`}>
                        </img>
                    </td>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-${ind}-cat`}>
                        <img key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-${ind}-cat-img`}
                             src={`moveCatSymbols/${moveData.damage_class?.name}.png`}>
                        </img>
                    </td>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-${ind}-acc`}>
                        {moveData.accuracy ? moveData.accuracy : "--"}
                    </td>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-${ind}-pow`}>
                        {moveData.power ? moveData.power : "--"}
                    </td>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-${ind}-pp`}>
                         {moveData.pp}
                    </td>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-${ind}-desc`}>
                        {description?.flavor_text ? description.flavor_text : "--"}
                    </td>
                </tr>
            )
        })

        return moveList;
    }
    
    return (
        <Modal
            isOpen={isOpen}
            modalClass="moves-modal"
            hasCloseBtn={true}
            onClose={handleClose}
        >
            <div>
                <div>
                    <TabList activeTabIndex={0}>
                        {versionGroups.map(version => {
                            const inVersion = versionsPresent.has(version);
                            if (inVersion) {
                                return (
                                    <TabItem key={`${pokemonInfo.name}-${version}-${learnMethod}`} label={formatVersionTitles(version)}>
                                        <table key={`${pokemonInfo.name}-${version}-${learnMethod}-table`} className="moves-table">
                                            <thead>
                                                <tr>
                                                    <th>{learnMethod == "level-up" ? "Lv" : ""}</th>
                                                    {moveLabels.map((label, ind) => <th key={`${label}-${ind}`}>{label}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {displayMoves(version)}
                                            </tbody>
                                        </table>
                                    </TabItem>
                                )
                            } else {
                                return <div key={`${pokemonInfo.name}-${version}-${learnMethod}`}></div>
                            }                
                        })}
                    </TabList>
                </div>
            </div>
        </Modal>
    )
}

export default MovesModal