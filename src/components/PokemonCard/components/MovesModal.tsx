import { Move } from "pokenode-ts";
import Modal from "../layout/Modal";
import { useEffect, useState } from "react";
import { MoveDetails, PokemonInfo } from "../../../types/PokemonInfo";
import { getMoveData } from "../../../utilities/apiUtilities";
import TabList from "../layout/Tabs/TabList";
import TabItem from "../layout/Tabs/TabItem";

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
                            return (
                                <TabItem key={`${pokemonInfo.name}-${version}-${learnMethod}`} label={version}>
                                    <table key={`${pokemonInfo.name}-${version}-${learnMethod}-table`}>

                                    </table>
                                </TabItem>
                            )
                        })}
                    </TabList>
                </div>
            </div>
        </Modal>
    )
}

export default MovesModal