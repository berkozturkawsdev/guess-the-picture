import "./ImageGrid.css";

interface ImageGridProps {
  images: string[];
}

const ImageGrid = ({ images }: ImageGridProps) => {
  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-card">
          <img src={image} alt={`Clue ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;