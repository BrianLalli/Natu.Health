"use client";
import React, { useState } from "react";
import '../app/css/additional-styles/faq.css'

interface FAQItemProps {
  question: string;
  answer: string;
}

// This is a single FAQ item component
const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="flex justify-between items-center w-full p-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className="text-lg font-medium faq-question">{question}</h5>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <p className="p-5 faq-answer">{answer}</p>}
    </div>
  );  
};

// Main FAQ component
export default function FAQ() {
  const faqs = [
    {
      question: "How does this service work?",
      answer: "You start by completing our comprehensive quiz, which helps us understand your health goals and challenges. Based on your answers, we provide personalized recommendations for practitioners that align with your health journey."
    },
    {
      question: "Is my personal information kept confidential?",
      answer: "Absolutely. We prioritize your privacy and ensure that all personal information is encrypted and stored securely. We do not share your information with any third parties without your explicit consent."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We strive for 100% satisfaction, but if you're not happy with the service, you can cancel your subscription at any time. We also welcome feedback to help us improve."
    },
    {
      question: "Do you offer support or consultations?",
      answer: "We offer ongoing support through our online portal. You can also schedule consultations with our health experts to discuss your progress and any concerns."
    },
    {
      question: "How are your health experts qualified?",
      answer: "Our team consists of certified professionals with extensive experience in their respective fields, including acupuncturists, chiropractors, and naturopathic doctors."
    },
    {
      question: "What makes your approach different?",
      answer: "We take a holistic view of health and wellness, considering all aspects of your lifestyle and well-being. Our personalized approach ensures that you receive care that's tailored specifically to you."
    },
    // ... additional FAQs
  ];

  return (
    <div className="max-w-3xl mx-auto my-12">
      <h2 className="text-3xl font-bold mb-6 mx-auto text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
