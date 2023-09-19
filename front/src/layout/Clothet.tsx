import { Gallery} from "../components/Gallery";
import { UsersService } from "../api_clients";

function Clothet(props) {
    const { urls, onLinkClick, onDeleteClick } = props;

    return (
        <Gallery
        urls={urls}
        onLinkClick={onLinkClick}
        onDeleteClick={onDeleteClick}
        />
);
}

export { Clothet };

