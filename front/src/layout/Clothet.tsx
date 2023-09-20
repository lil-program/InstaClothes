import { Gallery} from "../components/Gallery";
import { UsersService } from "../api_clients";

function Clothet(props) {
    const { urls, onLinkClick, onDeleteClick } = props;

    // clothet_idをhomeコンポーネントから受け取る
    // closetのidを使って、get_my_clothesをたたいてclothesを取得する
    //　以下のようになる
    //   {
    //     "name": "string",
    //     "id": "string",
    //     "shop_url": "string",
    //     "img_path": "string",
    //     "description": "string",
    //     "closet_id": "string"
    //   }

    // img_path, shop_url, id, 

    return (
        <Gallery
        urls={urls}
        onLinkClick={onLinkClick}
        onDeleteClick={onDeleteClick}
        />
);
}

export { Clothet };

