
interface ImageGridProps {
  images: string[];
}

const ImageGrid = ({ images }: ImageGridProps) => {
  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-card">
          <img loading="lazy" src={image} alt={`Clue ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;