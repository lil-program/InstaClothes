import { Link } from "react-router-dom";
import useAddModal from "../hooks/useAddModal";
import { AddButton } from "./AddButton";
import { RegistClosetField } from "./RegsitClosetField";

function ClosetAddModal() {

    const { AddModal, openAddModal, closeAddModal } = useAddModal();

    return (
        <div>
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
                <RegistClosetField />
                <button onClick={closeAddModal}>Close</button>
                </div>
            </AddModal>
        </div>
    );
}
export { ClosetAddModal };