import { ImageCard } from "./ImageCard";

export function Gallery(props) {
    const { urls } = props;

    return (
        <div>
            {urls.map((url) => {
                return (
                    <div key={url}>
                        <ImageCard url={url} />
                    </div>
                );
            })}
        </div>
    );
}