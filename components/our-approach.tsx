import React from 'react';
import { IoMdPeople, IoMdSearch, IoMdHeart } from 'react-icons/io';
import '../app/css/additional-styles/our-approach.css';

const featureData = [
    {
      IconComponent: IoMdPeople,
      title: "Explore Evidence-Based Wellness Experts",
      description:
        "Find experts in non-traditional and alternative medicine, validated through peer reviews and evidence-based practices. Discover the right practitioner for your needs with options for in-person or virtual consultations.",
      color: "#f0ad4e" // Confirm actual icon color
    },
    {
      IconComponent: IoMdSearch,
      title: "Personalized Triage and Matching",
      description:
        "Benefit from our unique triage process, designed to understand your individual health needs and goals. We'll match you with practitioners who specialize in the care you seek, ensuring a tailored wellness journey.",
      color: "#34aadc" // Choose a new icon color that represents this feature
    },
    {
      IconComponent: IoMdHeart,
      title: "Access Care on Your Terms",
      description:
        "Book appointments effortlessly online, choosing between face-to-face or virtual visits. Our platform ensures that your path to wellness is both flexible and accommodating, suited to your lifestyle and preferences.",
      color: "#d9534f" // Confirm actual icon color
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
