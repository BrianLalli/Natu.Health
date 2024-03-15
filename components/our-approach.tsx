import React from 'react';
import { IoMdPeople, IoMdCheckmarkCircleOutline, IoMdHeart } from 'react-icons/io';
import '../app/css/additional-styles/our-approach.css';

const featureData = [
  {
    IconComponent: IoMdPeople,
    title: "Find and compare top local doctors",
    description:
      "Read verified reviews from patients like you and see real-time availability for in-person and video visits.",
    color: "#f0ad4e" // Replace with the actual icon color
  },
  {
    IconComponent: IoMdCheckmarkCircleOutline,
    title: "Check coverage and estimated costs",
    description:
      "Enter your insurance to find in-network doctors who accept your plan or compare doctors’ out-of-pocket costs.",
    color: "#5cb85c" // Replace with the actual icon color
  },
  {
    IconComponent: IoMdHeart,
    title: "Get care anytime, anywhere",
    description:
      "Book appointments online and see the same great doctors from home with a video visit.",
    color: "#d9534f" // Replace with the actual icon color
  }
];

interface FeatureProps {
  IconComponent: React.ComponentType<{ color: string; size: string }>;
  title: string;
  description: string;
  color: string;
}

const Feature: React.FC<FeatureProps> = ({ IconComponent, title, description, color }) => (
  <div className="feature">
    <div className="feature-icon">
      <IconComponent color={color} size="3em" />
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

const SectionHeader: React.FC = () => (
  <h2 className="section-header">Our Approach</h2>
);

const OurApproach: React.FC = () => (
  <div className="our-approach">
    <div className="section-header-container">
      <SectionHeader />
    </div>
    <div className="features-container">
      {featureData.map((feature, index) => (
        <Feature
          key={index}
          IconComponent={feature.IconComponent}
          title={feature.title}
          description={feature.description}
          color={feature.color}
        />
      ))}
    </div>
  </div>
);

export default OurApproach;
