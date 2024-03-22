import React from 'react';
import { FaStar, FaUsers, FaPiggyBank, FaSearch, FaHandHoldingHeart, FaUserMd } from 'react-icons/fa'; // Add FaSearch, FaHandHoldingHeart, FaUserMd to your imports
import '../app/css/additional-styles/about-us.css';


// Define the types for the props of each benefit
interface BenefitProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

// Single Benefit component
const Benefit: React.FC<BenefitProps> = ({ icon, title, description }) => (
  <div className="benefit">
    <div className="benefit-icon">{icon}</div>
    <h3 className="benefit-title">{title}</h3>
    <p className="benefit-description">{description}</p>
  </div>
);

// The main component for the About Us section
const AboutUs: React.FC = () => {
  // This could be fetched or imported from a static file
  const benefitsData: BenefitProps[] = [
    {
      icon: <FaSearch />, // Assuming FaSearch is imported for "finding care"
      title: 'Find Trusted Care → Better Experience',
      description: 'Natu makes sense of the confusing alternative and nontraditional healthcare space.',
    },
    {
      icon: <FaHandHoldingHeart />, // Assuming FaHandHoldingHeart is imported for "empowerment"
      title: 'Empower Your Health Decisions → Own Your Health',
      description: 'Natu empowers you with the information necessary to take control of your health and make decisions for yourself.',
    },
    {
      icon: <FaUserMd />, // Assuming FaUserMd is imported for "diverse practitioners"
      title: 'Diverse Practitioners → Vetted Practitioners',
      description: 'Natu conducted a comprehensive vetting process to ensure you can trust all providers listed on the platform.',
    },
  ];
  

  return (
    <section className="about-us">
      <h2>About Us</h2>
      <div className="benefits-container">
        {benefitsData.map((benefit, index) => (
          <Benefit key={index} {...benefit} />
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
