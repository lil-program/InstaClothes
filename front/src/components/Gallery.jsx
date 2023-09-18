import { ImageCard } from "./ImageCard";

export function Gallery(props) {
    const { urls, onLinkClick, onDeleteClick } = props;

    return (
        <div>
            {urls.map((url, index) => {
                return (
                    <div key={url}>
                        <ImageCard
                        url={url}
                        onLinkClick={() => onLinkClick(url)}
                        onDeleteClick={() => onDeleteClick(index)}
                        />
                    </div>
                );
            })}
        </div>
    );
}

