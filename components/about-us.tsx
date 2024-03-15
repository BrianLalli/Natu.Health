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
      title: 'Find Trusted Care',
      description: 'It should be easy to find the care you want and can trust. Natu empowers you to connect with reputable medical practitioners, ensuring you receive high-quality care.',
    },
    {
      icon: <FaHandHoldingHeart />, // Assuming FaHandHoldingHeart is imported for "empowerment"
      title: 'Empower Your Health Decisions',
      description: 'Natu is on a mission to create a platform that empowers individuals to take control of their health by connecting them with a wide range of trustworthy providers.',
    },
    {
      icon: <FaUserMd />, // Assuming FaUserMd is imported for "diverse practitioners"
      title: 'Diverse Practitioners',
      description: 'Every provider listed on Natu, including MDs, Osteopaths, Chiropractors, and more, goes through a comprehensive vetting process to ensure trust and quality.',
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
