import "./image-circle.css";

interface ImageCircleProps {
  imgPath?: string;
  alt?: string;
  circleSize?: string;
  Badge?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  conditionalColor?: string;
  text?: string;
}

const ImageCircle: React.FC<ImageCircleProps> = ({
  imgPath,
  alt,
  circleSize,
  Badge,
  text,
  conditionalColor,
}) => {
  return (
    <div className="image-circle-container">
      {imgPath ? (
        <div>
          <div className={`circle ${circleSize ? circleSize : "medium"}`}>
            {imgPath && <img src={imgPath} alt={alt} className="circle-img" />}
          </div>
        </div>
      ) : (
        <div
          className={`text-circle circle ${circleSize ? circleSize : "medium"}`}
        >
          <strong>{text ? text : "?"}</strong>
        </div>
      )}
      {Badge && (
        <div className={`icon-circle ${conditionalColor}`}>
          <Badge />
        </div>
      )}
    </div>
  );
};

export default ImageCircle;
