import React from "react";
import { PhysicianInfo } from "../models/PhysicianInfo"; // Correct path to your model
import "../app/css/additional-styles/physicians.css";

interface PhysiciansComponentProps {
  physicians?: PhysicianInfo[]; // Array of physician information, now optional
}

// Mock data - Replace this with your PhysicianInfo fields
const dummyPhysicians = [
  {
    id: "1",
    name: "Dr. John Doe",
    image: "/images/Dr. Jane Doe.png",
    businessName: "Doe Medical Clinic",
    address: "123 Health St, Wellness City",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    website: "http://www.doemedicalclinic.com",
  },
  {
    id: "2",
    name: "Dr. John Smith",
    image: "/images/Dr. John Smith.png",
    businessName: "Smith Wellness Center",
    address: "456 Health Ave, Wellness City",
    email: "john.smith@example.com",
    phone: "987-654-3210",
    website: "http://www.smithwellnesscenter.com",
  },

  // Add more mock physicians as needed
];

const PhysiciansComponent: React.FC<PhysiciansComponentProps> = ({
  physicians = dummyPhysicians,
}) => {
  // Check if physicians data is available
  if (physicians.length === 0) {
    return <div>Loading physicians data...</div>; // Or any other placeholder content
  }

  return (
    <div className="my-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
      {physicians.map((physician) => (
        <div key={physician.id} className="card shadow-lg rounded p-4">
          <img
            src={physician.image}
            alt={`Dr. ${physician.name}`}
            className="rounded-full w-32 h-32 mx-auto"
          />
          <h2 className="text-xl font-semibold mt-3 text-center">
            {physician.name}
          </h2>
          <p className="text-gray-600 text-center">{physician.businessName}</p>
          <p className="text-center">{physician.address}</p>{" "}
          <div className="flex justify-between items-center mt-4">
            <a href={`mailto:${physician.email}`} className="text-blue-500">
              Email
            </a>
            <a href={`tel:${physician.phone}`} className="text-blue-500">
              Call
            </a>
            <a
              href={physician.website}
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
  );
};

export default PhysiciansComponent;
