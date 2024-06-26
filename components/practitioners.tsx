import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'; // Import useRouter
import { PractitionerInfo } from "../models/PractitionerInfo";
import {
  parsePractitionerData,
  calculateHaversineDistance,
} from "../utils/parsePractitionerData";
import "../app/css/additional-styles/practitioners.css";
import PageIllustration from "./page-illustration";
import PageIllustration2 from "./page-illustration2";

const PractitionersComponent = () => {
  const [bestMatch, setBestMatch] = useState<PractitionerInfo | null>(null);
  const [additionalPractitioners, setAdditionalPractitioners] = useState<PractitionerInfo[]>([]);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Use router.query to access URL parameters
    const userFocusArea = router.query.focusArea as string || "";
    const userZipCode = router.query.zipCode as string || "";

    if (!userFocusArea || !userZipCode) {
      // Optionally handle the case where no search parameters are provided
      console.log("Search parameters are missing.");
      return;
    }

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
                .sort((a, b) => {
                  const distanceA = a.distance !== undefined ? a.distance : Infinity;
                  const distanceB = b.distance !== undefined ? b.distance : Infinity;
                  return distanceA - distanceB;
                });

              setBestMatch(sortedPractitioners.length > 0 ? sortedPractitioners[0] : null);
              setAdditionalPractitioners(sortedPractitioners.slice(1));
            } else {
              console.error("User zip code not found in the data");
              setBestMatch(null);
              setAdditionalPractitioners([]);
            }
          } else {
            console.error("Error reading the file");
            setBestMatch(null);
            setAdditionalPractitioners([]);
          }
        };
        reader.readAsBinaryString(blob);
      })
      .catch((error) => {
        console.error("Error loading the Excel file:", error);
        setBestMatch(null);
        setAdditionalPractitioners([]);
      });
  }, [router.query]); // Add router.query to the dependency array

  if (!bestMatch && additionalPractitioners.length === 0) {
    return (
      <div className="loading-message">
        <p>Sorry, this app is currently available only in the Denver, CO area.</p>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-off-white text-deep-slate overflow-hidden">
      {" "}
      {/* Container with relative positioning */}
      {/* Page Illustrations */}
      <div
      className="hide-on-mobile"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <PageIllustration2 pageName="practitionersLeft" />{" "}
        {/* Illustration to the left */}
      </div>
      <div
      className="hide-on-mobile"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <PageIllustration pageName="practitionersRight" />{" "}
        {/* Illustration to the right */}
      </div>
      {/* Original content, now wrapped in a div to maintain structure */}
      <div className="practitioners-content z-10">
        {" "}
        {/* Content on top of the illustrations */}
        <h1
          className="text-2xl font-semibold recommendation text-deep-slate"
          style={{ color: "var(--deep-slate) !important" }} // Replace '--your-color' with your color variable or use a direct color code.
        >
          Based on your needs and proximity to your location, we recommend:
        </h1>
        {bestMatch && (
          <div className="best-match-container bg-off-white">
            <h2 className="text-2xl font-semibold text-center mt-6 mb-4 text-flora">
              Best Match:
            </h2>
            <PractitionerCard practitioner={bestMatch} />
          </div>
        )}
        {additionalPractitioners.length > 0 && (
          <div className="additional-options-container mt-8 mb-20 bg-off-white">
            <h2 className="text-2xl font-semibold text-center mb-4 text-deep-slate">
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
      <h2 className="text-xl font-semibold mt-3 text-deep-slate">
        {practitioner.name}
      </h2>
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
