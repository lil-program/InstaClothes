import { Link } from "react-router-dom";
import useAddModal from "../hooks/useAddModal";
import { AddButton } from "./AddButton";
import { LinkRegistField } from "./LinkRegistField";
import { ClothesService, OpenAPI } from "../api_clients";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';


function ClotheAddModal(props) {
    const { closet_id } = props;
    const { AddModal, openAddModal, closeAddModal } = useAddModal();

    const [inputShopUrl, setInputShopUrl] = useState("");

    // const AddCloleModal = (closet_id,shop_url) => {
    //     return (
    //         <div>
    //             <button onClick={closeAddModal}>Close</button>
    //             <button onClick={() => handleAddClothe(closet_id, shop_url)}>Add</button>
    //         </div>
    //     );
    // };

    const handleAddClothe = async (closet_id, shop_url) => {

        const requestBody = {"name": "string", "shop_url": shop_url};
        await ClothesService.createClothesApiV1ClothesCreateClosetIdPost(closet_id, requestBody);

        setInputShopUrl(shop_url);
    };

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
                <LinkRegistField closet_id={closet_id} inputShopUrl={inputShopUrl} setInputShopUrl={setInputShopUrl} handleAddClothe={handleAddClothe}/>
                <CloseIcon onClick={closeAddModal}>Close</CloseIcon>
                </div>
            </AddModal>
        </div>
    );
}
export { ClotheAddModal };