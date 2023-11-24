import * as XLSX from 'xlsx';

export function parsePractitionerData(data) {
  const workbook = XLSX.read(data, { type: 'binary' });

  // Process MVP Practitioners Sheet
  const practitionersSheet = workbook.Sheets[workbook.SheetNames[0]];
  const practitionersData = XLSX.utils.sheet_to_json(practitionersSheet, { header: 1 });

  // Process Zip Code Infrastructure Sheet
  const zipCodeSheet = workbook.Sheets[workbook.SheetNames[1]];
  const zipCodeData = XLSX.utils.sheet_to_json(zipCodeSheet, { header: 1 });

  return {
    practitioners: parsePractitioners(practitionersData),
    zipCodes: parseZipCodes(zipCodeData)
  };
}

function parsePractitioners(data) {
  const practitioners = [];
  data.forEach((row, index) => {
    if (index > 0) { // Skip the header row
      const practitioner = {
        id: row[0],
        image: row[19], // Placeholder for image URL or path
        name: row[2], // Clinician/s
        businessName: row[1], // Clinic/s
        specialty: row[3], // Specialty (corrected field name)
        address: ` ${row[15]}, ${row[16]}, ${row[17]}`, // Full address
        email: row[13], // Email Address
        phone: row[14], // Phone Number
        website: row[9], // Website
        googleReviews: parseFloat(row[5] || '0'), // Google Reviews
        numberOfReviews: parseFloat(row[6] || '0'),
        focusAreas: [row[10], row[11], row[12]].filter(Boolean), // Combining all focus areas
        zipCode: row[18] // Assuming Zip Code is in the 19th column
      };
      practitioners.push(practitioner);
    }
  });
  return practitioners;
}

function parseZipCodes(data) {
  const zipCodes = [];
  data.forEach((row, index) => {
    if (index > 0) { // Skip the header row
      const zipCode = {
        code: row[0],
        latitude: parseFloat(row[3]),
        longitude: parseFloat(row[4])
      };
      zipCodes.push(zipCode);
    }
  });
  return zipCodes;
}
