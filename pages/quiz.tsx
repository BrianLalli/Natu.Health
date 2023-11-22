// pages/quiz.tsx
import React from 'react';
import QuizComponent from '../components/quiz-component.client';
import DefaultLayout from './layout'; // Ensure this is the correct path
import '../app/css/style.css'; // Importing styles.css from the app folder

const QuizPage = () => {
  return (
    <DefaultLayout>
      {/* Use a main tag for semantic structuring of the primary content */}
      <main className="quiz-main-content">
        <QuizComponent />
      </main>
    </DefaultLayout>
  );
};

export default QuizPage;
