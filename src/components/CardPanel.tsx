"use client";
import { useReducer } from "react";
import Card from "./Card";
import Link from "next/link";

export default function CardPanel() {
  const cardReducer = (
    venueList: Map<string, number>,
    action: { type: string; venueName: string; rating?: number },
  ) => {
    switch (action.type) {
      case "add":
      case "update":
        const newVenueList = new Map(venueList);
        newVenueList.set(action.venueName, action.rating ?? 0);
        return newVenueList;
      case "remove":
        const newList = new Map(venueList);
        newList.delete(action.venueName);
        return newList;
      default:
        return venueList;
    }
  };

  let defaultVenue = new Map<string, number>([
    ["The Bloom Pavilion", 0],
    ["Spark Space", 0],
    ["The Grand Table", 0],
  ]);

  const [compareList, dispatchCompare] = useReducer(cardReducer, defaultVenue);

  const handleRatingChange = (venueName: string, rating: number) => {
    dispatchCompare({ type: "update", venueName, rating });
  };

  /**
   * Mock Data
   */
  const mockVenueRepo = [
    { vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg" },
    { vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg" },
    { vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg" },
  ];

  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around",
          padding: "10px",
        }}
      >
        {mockVenueRepo.map((venue) => (
          <Link href={`/venue/${venue.vid}`} className="w-1/5">
            <Card
              key={venue.vid}
              venueName={venue.name}
              imgSrc={venue.image}
              onCompare={handleRatingChange}
              rating={compareList.get(venue.name) || 0}
            />
          </Link>
        ))}
      </div>
      <div className="w-full text-xl font-medium">
        Venue List With Ratings ({compareList.size})
      </div>
      {Array.from(compareList).map(([venueName, rating]) => (
        <div
          key={venueName}
          data-testid={venueName}
          className="w-full text-lg font-medium p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => dispatchCompare({ type: "remove", venueName })}
        >
          {venueName} : {rating}
        </div>
      ))}
    </div>
  );
}

// <Card
//   venueName="The Grand Table"
//   imgSrc="/img/grandtable.jpg"
//   onCompare={handleRatingChange}
//   rating={compareList.get("The Grand Table") || 0}
// />
