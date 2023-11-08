import React, { useState } from 'react';

// This is a single FAQ item component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="flex justify-between items-center w-full p-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className="text-lg font-medium">{question}</h5>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <p className="p-5">{answer}</p>}
    </div>
  );
};

// Main FAQ component
export default function FAQ() {
  const faqs = [
    {
      question: 'How does this service work?',
      answer: 'You start by doing this and that...',
    },
    // ... more FAQs
  ];

  return (
    <div className="max-w-3xl mx-auto my-12">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
