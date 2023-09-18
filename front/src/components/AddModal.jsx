import useAddModal from "../hooks/useAddModal";
import { AddButton } from "./AddButton";

function AddModal() {

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
                <h2>追加してください</h2>
                <button onClick={closeAddModal}>Close</button>
                </div>
            </AddModal>
        </div>
    );
}    
export { AddModal };