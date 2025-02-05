import { useEffect, useRef } from "react";
import "../css/PokemonCard.css";
import "../css/Modal.css"
interface ModalProps {
    isOpen: boolean;
    modalClass: string;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

const Modal = ({isOpen, modalClass, hasCloseBtn, onClose, children} : ModalProps) => {
    
    const modalRef = useRef<HTMLDialogElement>(null);
    
    useEffect(() => {
        const modalElement = modalRef.current;
        if (!modalElement) return;
        
        if (isOpen) {
            modalElement.showModal();
        } else {
            modalElement.close();
        }
    }, [isOpen]);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    }

    return (
        <dialog ref={modalRef} className={modalClass} onKeyDown={handleKeyDown}>
            <div className="modal-container">
                {children}
                {hasCloseBtn && (
                    <div className="modal-bottom-btns">
                        <button className="modal-close-btn" onClick={handleCloseModal}>
                        Close
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    )
}

export default Modal;