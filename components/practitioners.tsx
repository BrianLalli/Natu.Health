import React, { useEffect, useState } from "react";
import { PractitionerInfo } from "../models/PractitionerInfo";
import { parsePractitionerData } from "../utils/parsePractitionerData";
import "../app/css/additional-styles/practitioners.css";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const fractionalPart = rating % 1;
  let quarterStar = 0,
    halfStar = 0,
    threeQuarterStar = 0;

  if (fractionalPart >= 0.75) {
    threeQuarterStar = 1;
  } else if (fractionalPart >= 0.5) {
    halfStar = 1;
  } else if (fractionalPart >= 0.25) {
    quarterStar = 1;
  }

  const totalStars = fullStars + quarterStar + halfStar + threeQuarterStar;
  const emptyStars = Math.max(5 - totalStars, 0); // Ensure it's not negative

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      ))}
      {quarterStar === 1 && (
        <span key="quarter" className="text-yellow-400">
          ☆
        </span>
      )}
      {halfStar === 1 && (
        <span key="half" className="text-yellow-400">
          ☆
        </span>
      )}
      {threeQuarterStar === 1 && (
        <span key="three-quarter" className="text-yellow-400">
          ☆
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">
          ☆
        </span>
      ))}
    </div>
  );
};

const PractitionersComponent = () => {
  const [practitioners, setPractitioners] = useState<PractitionerInfo[]>([]);

  useEffect(() => {
    fetch("/data/practitioners.xlsx")
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const parsedData = parsePractitionerData(data);
          setPractitioners(parsedData);
        };
        reader.readAsBinaryString(blob);
      })
      .catch((error) => console.error("Error loading the Excel file:", error));
  }, []);

  if (practitioners.length === 0) {
    return <div>Loading Practitioners data...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold recommendation">
        Based on your needs and proximity to your location, we recommend the
        following Practitioners for your care:
      </h1>
      <div className="my-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        {practitioners.map((practitioner, index) => (
          <div key={index} className="card shadow-lg rounded p-4">
            <div className="text-center">
              <img
                src={practitioner.image}
                alt={`Dr. ${practitioner.name}`}
                className="rounded-full w-32 h-32 mx-auto"
              />
              <h2 className="text-xl font-semibold mt-3">
                {practitioner.name}
              </h2>
              <p className="text-white-500 font-semibold text-center">
                {practitioner.specialty}
              </p>
              <div className="flex items-center justify-center mt-2">
                <p className="text-blue-500">
                  {practitioner.googleReviews.toFixed(1)}
                </p>
                <div className="text-yellow-500 ml-1">★</div>
                <p className="text-blue-500 ml-1">
                  ({practitioner.numberOfReviews})
                </p>
              </div>
              <p className="text-white-600 text-center">
                Focus Areas: {practitioner.focusAreas.join(", ")}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-white-600 text-center font-semibold">
                {practitioner.businessName}
              </p>
              <p className="text-white-600 text-center">
                {practitioner.address}
              </p>
            </div>
            <div className="flex flex-col items-center mt-4">
              <a
                href={`mailto:${practitioner.email}`}
                className="text-blue-500 text-center mb-2"
              >
                {practitioner.email}
              </a>
              <p className="text-blue-500 text-center mb-2">
                {practitioner.phone}
              </p>
              <a
                href={practitioner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-4 py-2 rounded text-center"
              >
                Book Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PractitionersComponent;
