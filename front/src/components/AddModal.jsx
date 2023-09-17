import useAddModal from "../hooks/useAddModal";

export default function AddModal() {
    const { Modal, closeAddModal } = useAddModal();
    return (
        <Modal>
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
      </Modal>
    );
}