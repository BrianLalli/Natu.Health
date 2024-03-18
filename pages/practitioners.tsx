import React from 'react';
import PractitionerComponent from '../components/practitioners';
import DefaultLayout from './layout'; // Verify this is the correct path
import '../app/css/style.css'; // Importing global styles
import PageIllustration from '@/components/page-illustration';
import '../app/css/additional-styles/practitioners.css'

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
