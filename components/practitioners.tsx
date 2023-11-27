import React, { useEffect, useState } from "react";
import { PractitionerInfo } from "../models/PractitionerInfo";
import {
  parsePractitionerData,
  calculateHaversineDistance,
} from "../utils/parsePractitionerData";
import "../app/css/additional-styles/practitioners.css";

const PractitionersComponent = () => {
  const [bestMatch, setBestMatch] = useState<PractitionerInfo | null>(null);
  const [additionalPractitioners, setAdditionalPractitioners] = useState<
    PractitionerInfo[]
  >([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userFocusArea = queryParams.get("focusArea") || "";
    const userZipCode = queryParams.get("zipCode") || "";

    fetch("/data/practitioners.xlsx")
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            const data = e.target.result;
            const { practitioners, zipCodes } = parsePractitionerData(data);
            const userZipData = zipCodes.find((zip) => zip.code === userZipCode);

            if (userZipData) {
              practitioners.forEach((practitioner) => {
                const practitionerZipData = zipCodes.find(
                  (zip) => zip.code === practitioner.zipCode
                );
                if (practitionerZipData) {
                  practitioner.distance = calculateHaversineDistance(
                    userZipData.latitude,
                    userZipData.longitude,
                    practitionerZipData.latitude,
                    practitionerZipData.longitude
                  );
                } else {
                  practitioner.distance = Infinity;
                }
              });

              const sortedPractitioners = practitioners
                .filter((practitioner) =>
                  practitioner.focusAreas.includes(userFocusArea)
                )
                .sort((a, b) => a.distance - b.distance);

              if (sortedPractitioners.length > 0) {
                setBestMatch(sortedPractitioners[0]);
                setAdditionalPractitioners(sortedPractitioners.slice(1));
              } else {
                setBestMatch(null);
                setAdditionalPractitioners([]);
              }
            } else {
              console.error("User zip code not found in the data");
              setAdditionalPractitioners([]);
            }
          } else {
            console.error("Error reading the file");
          }
        };
        reader.readAsBinaryString(blob);
      })
      .catch((error) => {
        console.error("Error loading the Excel file:", error);
      });
  }, []);


  if (!bestMatch && additionalPractitioners.length === 0) {
    return (
      <div className="loading-message">
        <p>
          Sorry, this app is currently available only in the Denver, CO area.
        </p>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold recommendation">
        Based on your needs and proximity to your location, we recommend:
      </h1>
      {bestMatch && (
        <div className="best-match-container">
          <h2 className="text-xl font-semibold text-center mt-6 mb-4">
            Best Match:
          </h2>
          <PractitionerCard practitioner={bestMatch} />
        </div>
      )}
      {additionalPractitioners.length > 0 && (
        <div className="additional-options-container mt-8">
          <h2 className="text-xl font-semibold text-center mb-4">
            Additional Options:
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 custom-grid-gap justify-center">
            {additionalPractitioners.map((practitioner, index) => (
              <PractitionerCard key={index} practitioner={practitioner} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Updated PractitionerCard component with explicit type definition
interface PractitionerCardProps {
  practitioner: PractitionerInfo;
}

const PractitionerCard: React.FC<PractitionerCardProps> = ({ practitioner }) => (
  <div className="card shadow-lg rounded p-4">
    <div className="text-center">
      <img
        src={practitioner.image}
        alt={`Dr. ${practitioner.name}`}
        className="rounded-full w-40 h-40 mx-auto border-2 border-purple-600"
      />
      <h2 className="text-xl font-semibold mt-3">{practitioner.name}</h2>
      <p className="text-white-500 font-semibold text-center">
        {practitioner.specialty}
      </p>
      <div className="flex items-center justify-center mt-2">
        <p className="text-purple-500">
          {typeof practitioner.googleReviews === "number"
            ? practitioner.googleReviews.toFixed(1)
            : "N/A"}
        </p>
        <div className="text-yellow-500 ml-1">★</div>
        <p className="text-purple-500 ml-1">
          ({practitioner.numberOfReviews || "N/A"})
        </p>
      </div>
      <p className="text-white-600 text-center">
        Focus Areas: {practitioner.focusAreas.join(", ")}
      </p>
    </div>
    <div className="mt-4">
      <p className="text-xl font-semibold mt-3 text-center">
        {practitioner.businessName}
      </p>
      <p className="text-white-600 text-center">{practitioner.address}</p>
      {practitioner.distance !== undefined && (
        <p className="text-purple-500 text-center">
          Distance: {practitioner.distance.toFixed(2)} mi
        </p>
      )}
    </div>
    <div className="flex flex-col items-center mt-4">
      <a
        href={`mailto:${practitioner.email}`}
        className="text-purple-500 text-center mb-2"
      >
        {practitioner.email}
      </a>
      <p className="text-purple-500 text-center mb-2">{practitioner.phone}</p>
      <a
        href={practitioner.website}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-600 text-white px-4 py-2 rounded-25px text-center btn"
      >
        Book Now
      </a>
    </div>
  </div>
);

export default PractitionersComponent;
