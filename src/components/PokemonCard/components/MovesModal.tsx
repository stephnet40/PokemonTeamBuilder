import { Move } from "pokenode-ts";
import Modal from "../layout/Modal";
import { useEffect, useState } from "react";
import { MoveDetails, PokemonInfo } from "../../../types/PokemonInfo";
import { getMoveData } from "../../../utilities/apiUtilities";
import TabList from "../layout/Tabs/TabList";
import TabItem from "../layout/Tabs/TabItem";
import { formatVersionTitles } from "../../../utilities/formatUtilities";

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
        currMoves.forEach(item => {
            const moveData = item.move
            const description = moveData.flavor_text_entries.find(x => x.language.name == "en")!;
            moveList.push(
                <tr key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}`}>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-method`}>
                        {item.level}
                    </td>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-name`}>
                        {moveData.name}
                    </td>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-acc`}>
                        {moveData.accuracy ? moveData.accuracy : "--"}
                    </td>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-pow`}>
                        {moveData.power ? moveData.power : "--"}
                    </td>
                    <td key={`${pokemonInfo.name}-${learnMethod}-${item.move.name}-pp`}>
                        {moveData.pp}
                    </td>
                    <td>
                        {description.flavor_text}
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
                                        <table key={`${pokemonInfo.name}-${version}-${learnMethod}-table`}>
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