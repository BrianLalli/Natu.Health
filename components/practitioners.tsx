import React, { useEffect, useState } from "react";
import { PractitionerInfo } from "../models/PractitionerInfo";
import { parsePractitionerData } from "../utils/parsePractitionerData";
import "../app/css/additional-styles/practitioners.css";

const PractitionersComponent = () => {
  const [Practitioners, setPractitioners] = useState<PractitionerInfo[]>([]);

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

  // Check if Practitioners data is available
  if (Practitioners.length === 0) {
    return <div>Loading Practitioners data...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold recommendation">
        Based on your needs and proximity to your location, we recommend the
        following Practitioners for your care:
      </h1>
      <div className="my-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        {Practitioners.map((practitioner) => (
          <div key={practitioner.id} className="card shadow-lg rounded p-4">
            <img
              src={practitioner.image}
              alt={`Dr. ${practitioner.name}`}
              className="rounded-full w-32 h-32 mx-auto"
            />
            <h2 className="text-xl font-semibold mt-3 text-center">
              {practitioner.name}
            </h2>
            <p className="text-center mt-2 text-blue-500">
              Clinic: {practitioner.businessName}
            </p>
            <p className="text-white-600 text-center">
              Address: {practitioner.address}, {practitioner.city},{" "}
              {practitioner.state} {practitioner.zipCode}
            </p>
            <p className="text-center">
              Focus Areas: {practitioner.focusArea1 || "N/A"},{" "}
              {practitioner.focusArea2 || "N/A"},{" "}
              {practitioner.focusArea3 || "N/A"}
            </p>

            <div className="flex items-center justify-center mt-2">
              {typeof practitioner.googleReviewsCount === "number" &&
              !isNaN(practitioner.googleReviewsCount)
                ? [...Array(Math.floor(practitioner.googleReviewsCount))].map(
                    (_, index) => (
                      <span key={index} className="text-yellow-400">
                        {/* Filled star */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 2l2.3 6.2 6.9.6-5.3 4.7 1.6 7-6.5-3.9-6.5 3.9 1.6-7-5.3-4.7 6.9-.6z" />
                        </svg>
                      </span>
                    )
                  )
                : null}
              {typeof practitioner.zocDocReviewsCount === "number" &&
              !isNaN(practitioner.zocDocReviewsCount)
                ? [...Array(Math.floor(practitioner.zocDocReviewsCount))].map(
                    (_, index) => (
                      <span key={index} className="text-yellow-400">
                        {/* Filled star */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 2l2.3 6.2 6.9.6-5.3 4.7 1.6 7-6.5-3.9-6.5 3.9 1.6-7-5.3-4.7 6.9-.6z" />
                        </svg>
                      </span>
                    )
                  )
                : null}
            </div>
            <div className="flex justify-between items-center mt-4">
              <a
                href={`mailto:${practitioner.email}`}
                className="text-blue-500"
              >
                Email
              </a>
              <a href={`tel:${practitioner.phone}`} className="text-blue-500">
                Call
              </a>
              <a
                href={practitioner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PractitionersComponent;
