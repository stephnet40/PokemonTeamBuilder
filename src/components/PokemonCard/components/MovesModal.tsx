import { PokemonMove } from "pokenode-ts";
import Modal from "../layout/Modal";

interface MovesModalProps {
    isOpen: boolean;
    movesList: PokemonMove[];
    onClose: () => void;
}

const MovesModal = ({isOpen, movesList, onClose} : MovesModalProps) => {

    const handleClose = () => {
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            modalClass="moves-modal"
            hasCloseBtn={true}
            onClose={handleClose}
        >
            <div></div>
        </Modal>
    )
}

export default MovesModal