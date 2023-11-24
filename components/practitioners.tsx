import React, { useEffect, useState } from "react";
import { PractitionerInfo } from "../models/PractitionerInfo";
import { parsePractitionerData } from "../utils/parsePractitionerData";
import "../app/css/additional-styles/practitioners.css";

const PractitionersComponent = () => {
  const [practitioners, setPractitioners] = useState<PractitionerInfo[]>([]);

  useEffect(() => {
    fetch("/data/practitioners.xlsx")
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const { practitioners } = parsePractitionerData(data);
          console.log("Parsed practitioners data:", practitioners); // Debug log
          setPractitioners(practitioners);
        };
        reader.readAsBinaryString(blob);
      })
      .catch((error) => {
        console.error("Error loading the Excel file:", error);
        console.error(error);
      });
  }, []);

  console.log("Practitioners state:", practitioners); // Debug log

  if (practitioners.length === 0) {
    return <div>Loading Practitioners data...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold recommendation">
        Based on your needs and proximity to your location, we recommend the
        following Practitioner(s) for your care:
      </h1>
      <div className="my-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        {practitioners.map((practitioner, index) => (
          <div key={index} className="card shadow-lg rounded p-4">
            <div className="text-center">
              <img
                src={practitioner.image}
                alt={`Dr. ${practitioner.name}`}
                className="rounded-full w-40 h-40 mx-auto border-2 border-purple-600"
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
              <p className="text-xl font-semibold mt-3 text-center">
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
                className="bg-purple-600 text-white px-4 py-2 rounded-25px text-center btn"
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
