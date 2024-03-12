// // pages/quiz.tsx
// import React from 'react';
// import PractitionerComponent from '../components/practitioners';
// import DefaultLayout from './layout'; // Ensure this is the correct path
// import '../app/css/style.css'; // Importing styles.css from the app folder
// import PageIllustration from '@/components/page-illustration';

// const QuizPage = () => {
//   return (
//     <DefaultLayout>
//       <PageIllustration/>
//       {/* Use a main tag for semantic structuring of the primary content */}
//       <main className="quiz-main-content">
//         <PractitionerComponent />
//       </main>
//     </DefaultLayout>
//   );
// };

// export default QuizPage;

// Assuming this is practitioners.tsx
import React from 'react';
import PractitionerComponent from '../components/practitioners';
import DefaultLayout from './layout'; // Verify this is the correct path
import '../app/css/style.css'; // Importing global styles
import PageIllustration from '@/components/page-illustration';

const PractitionersPage = () => {
  return (
    <DefaultLayout>
      <PageIllustration/>
      <main className="main-content">
        <PractitionerComponent />
      </main>
    </DefaultLayout>
  );
};

export default PractitionersPage;
