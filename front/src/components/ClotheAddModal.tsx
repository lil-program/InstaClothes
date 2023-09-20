import { Link } from "react-router-dom";
import useAddModal from "../hooks/useAddModal";
import { AddButton } from "./AddButton";
import { LinkRegistField } from "./LinkRegistField";

function ClotheAddModal() {

    const { AddModal, openAddModal, closeAddModal } = useAddModal();

    return (
        <div>
            <div>
                <AddButton onAddClick={openAddModal} />
            </div>
            <AddModal>
                <div
                    style={{
                    backgroundColor: 'white',
                    width: '300px',
                    height: '200px',
                    padding: '1em',
                    borderRadius: '15px',
                }}
                >
                <h2>服の追加</h2>
                <LinkRegistField />
                <button onClick={closeAddModal}>Close</button>
                </div>
            </AddModal>
        </div>
    );
}
export { ClotheAddModal };