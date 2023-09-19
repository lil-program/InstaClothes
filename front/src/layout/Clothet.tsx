import { Gallery} from "../components/Gallery";


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