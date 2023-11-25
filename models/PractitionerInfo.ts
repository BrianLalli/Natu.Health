// PractitionerInfo.ts

export interface PractitionerInfo {
    id: number;
    image: string;
    name: string;
    businessName: string;
    specialty: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    googleReviews: number;
    numberOfReviews: number;
    focusAreas: string[];
    zipCode: string;
    distance?: number;
  }
  
  