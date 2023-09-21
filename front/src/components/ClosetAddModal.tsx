import { Link } from "react-router-dom";
import useAddModal from "../hooks/useAddModal";
import { AddButton } from "./AddButton";

function ClosetAddModal() {

    const { AddModal, openAddModal, closeAddModal } = useAddModal();

    const handleAddClothe = async (closet_id, shop_url) => {

        console.log(shop_url)
        const requestBody = {"name": "string", "shop_url": shop_url};
        await ClothesService.createClothesApiV1ClothesCreateClosetIdPost(closet_id, requestBody);

        setInputShopUrl(shop_url);
    };

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
                <ClosetAddModal />
                </div>
            </AddModal>
        </div>
    );
}
export { ClosetAddModal };