import * as XLSX from 'xlsx';

export function parsePractitionerData(data) {
  const workbook = XLSX.read(data, { type: 'binary' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Assuming the first sheet is 'MVP Practitioners'

  // Convert the worksheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Parse the data
  const practitioners = [];
  jsonData.forEach((row, index) => {
    if (index > 0) { // Skip the header row
      const practitioner = {
        image: '', // You can set the image URL or path
        name: row[1], // Clinician/s
        businessName: row[0], // Clinic/s
        address: row[12], // Physical Address
        email: row[12], // Email Address
        phone: row[11], // Phone Number
        website: row[2], // Website
        googleReviews: parseFloat(row[3] || '0'), // Google Reviews (you can parse this if available)
        focusArea: row[9], // Focus Areas 1
      };
      practitioners.push(practitioner);
    }
  });

  return practitioners;
}
