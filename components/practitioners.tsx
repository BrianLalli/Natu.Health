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
            const userZipData = zipCodes.find(
              (zip) => zip.code === userZipCode
            );

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
                .sort((a, b) => {
                  const distanceA =
                    a.distance !== undefined ? a.distance : Infinity;
                  const distanceB =
                    b.distance !== undefined ? b.distance : Infinity;
                  return distanceA - distanceB;
                });

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
      <h1 className="text-2xl font-semibold recommendation text-deep-slate">
        Based on your needs and proximity to your location, we recommend:
      </h1>
      {bestMatch && (
        <div className="best-match-container bg-off-white">
          <h2 className="text-xl font-semibold text-center mt-6 mb-4 text-deep-slate">
            Best Match:
          </h2>
          <PractitionerCard practitioner={bestMatch} />
        </div>
      )}
      {additionalPractitioners.length > 0 && (
        <div className="additional-options-container mt-8 bg-off-white">
          <h2 className="text-xl font-semibold text-center mb-4 text-deep-slate">
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

interface PractitionerCardProps {
  practitioner: PractitionerInfo;
}

const PractitionerCard: React.FC<PractitionerCardProps> = ({
  practitioner,
}) => (
  <div className="card shadow-lg rounded p-4 bg-off-white">
    <div className="text-center">
      <img
        src={practitioner.image}
        alt={`Dr. ${practitioner.name}`}
        className="rounded-full w-40 h-40 mx-auto border-2 border-lavender"
      />
      <h2 className="text-xl font-semibold mt-3 text-deep-slate">{practitioner.name}</h2>
      <p className="font-semibold text-center text-deep-slate">
        {practitioner.specialty}
      </p>
      <div className="flex items-center justify-center mt-2">
        <p className="text-lavender">
          {typeof practitioner.googleReviews === "number"
            ? practitioner.googleReviews.toFixed(1)
            : "N/A"}
        </p>
        <div className="ml-1 text-yellow">★</div>
        <p className="text-lavender ml-1">
          ({practitioner.numberOfReviews || "N/A"})
        </p>
      </div>
      <p className="text-center text-medium-slate">
        Focus Areas: {practitioner.focusAreas.join(", ")}
      </p>
    </div>
    <div className="mt-4">
      <p className="text-xl font-semibold mt-3 text-center text-deep-slate">
        {practitioner.businessName}
      </p>
      <p className="text-center text-medium-slate">{practitioner.address}</p>
      {practitioner.distance !== undefined && (
        <p className="text-lavender text-center">
          Distance: {practitioner.distance.toFixed(2)} mi
        </p>
      )}
    </div>
    <div className="flex flex-col items-center mt-4">
      <a
        href={`mailto:${practitioner.email}`}
        className="text-center mb-2 text-lavender"
      >
        {practitioner.email}
      </a>
      <p className="text-center mb-2 text-lavender">{practitioner.phone}</p>
      <a
        href={practitioner.website}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-lavender text-white px-4 py-2 rounded text-center btn"
      >
        Book Now
      </a>
    </div>
  </div>
);

export default PractitionersComponent;
