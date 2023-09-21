import { ImageCard } from "./ImageCard";
import { useState, useEffect } from "react";
import { OpenAPI } from "../api_clients";
import { ClothesService } from "../api_clients";

export function Gallery(props) {
  const { closet_id } = props;

  const [clothes, setClothes] = useState([] as any);
  // closetsをfetchしてcloset_idを取得する
  useEffect(() => {
    OpenAPI.BASE = import.meta.env.VITE_BACKEND_URL;
    async function fetchData() {
      const response =
        await ClothesService.readClothesApiV1ClothesGetMyClothesClosetIdGet(
          closet_id
        );
      setClothes([...response]);
    }
    fetchData();
  }, []);

  const handleDelete = async (clothe_id) => {
    const requestBody = { clothes_ids: [clothe_id] };
    await ClothesService.deleteClothesApiV1ClothesDeleteDelete(requestBody);

    console.log("delete");
    const newClothes = clothes.filter((clothe) => clothe.id !== clothe_id);
    setClothes(newClothes);
  };

  const handleAddClick = async (shop_url) => {
    const requestBody = { name: "string", "shop_url": shop_url};
    await ClothesService.createClothesApiV1ClothesCreateClosetIdPost(requestBody);
  };

  return (
    <div>
      {clothes.map((clothe) => {
        return (
          <ImageCard
            key={clothe.id}
            clothe_id={clothe.id}
            shop_url={clothe.shop_url}
            img_path={clothe.img_path}
            handleDelete={handleDelete}
            handleAddClick={handleAddClick}
          />
        );
      })}
    </div>
  );
}
