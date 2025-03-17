import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Rating from "@mui/material/Rating";

export default function ProductCard({
  venueName,
  imgSrc,
  onCompare,
  rating,
}: {
  venueName: string;
  imgSrc: string;
  onCompare: (venueName: string, rating: number) => void;
  rating: number;
}) {
  return (
    <InteractiveCard contentName={venueName}>
      <div className="w-full h-[70%] relative rounded-lg shadow-lg bg-white">
        <Image
          src={imgSrc}
          alt="Product Picture"
          fill={true}
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[15%] p-[10px]">{venueName}</div>
      <div data-testid={`${venueName} Rating`}>
        <Rating
          onClick={(e) => e.stopPropagation()}
          onChange={(e, newValue) => {
            e?.stopPropagation();
            onCompare(venueName, newValue || 0);
          }}
          className="mx-2"
          value={rating}
          precision={0.5}
          name={`${venueName} Rating`}
        />
      </div>
    </InteractiveCard>
  );
}
