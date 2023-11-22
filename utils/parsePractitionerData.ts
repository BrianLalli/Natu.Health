import * as XLSX from 'xlsx';

export function parsePractitionerData(data) {
  const workbook = XLSX.read(data, { type: 'binary' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]; 

  // Convert the worksheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Parse the data
  const practitioners = [];
  jsonData.forEach((row, index) => {
    if (index > 0) { // Skip the header row
      const practitioner = {
        image: row[18], // Placeholder for image URL or path
        name: row[1], // Clinician/s
        businessName: row[0], // Clinic/s
        specialty: row[2], // Specialty (corrected field name)
        address: ` ${row[14]}, ${row[15]}, ${row[16]}`, // Full address
        email: row[12], // Email Address
        phone: row[13], // Phone Number
        website: row[3], // Website
        googleReviews: parseFloat(row[4] || '0'), // Google Reviews
        numberOfReviews: parseFloat(row[5] || '0'),
        focusAreas: [row[9], row[10], row[11]].filter(Boolean), // Combining all focus areas
      };
      practitioners.push(practitioner);
    }
  });

  return practitioners;
}
