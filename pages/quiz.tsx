// pages/quiz.tsx
import React from 'react';
import QuizComponent from '../components/quiz-component.client';
import RootLayout from '../app/layout'; // Update the path as needed
// import Footer from '@/components/ui/footer';
// import PageIllustration from '@/components/page-illustration'


const QuizPage = () => {
  return (
    <RootLayout>
      {/* <PageIllustration /> */}
      <QuizComponent />
    </RootLayout>
  );
};

export default QuizPage;
