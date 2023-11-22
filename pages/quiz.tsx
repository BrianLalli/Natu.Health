// pages/quiz.tsx
import React from 'react';
import QuizComponent from '../components/quiz-component.client';
import DefaultLayout from './layout'; // Ensure this is the correct path
import '../app/css/style.css'; // Importing styles.css from the app folder
import PageIllustration from '@/components/page-illustration';

const QuizPage = () => {
  return (
    <DefaultLayout>
      <PageIllustration/>
      {/* Use a main tag for semantic structuring of the primary content */}
      <main className="quiz-main-content">
        <QuizComponent />
      </main>
    </DefaultLayout>
  );
};

export default QuizPage;
