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
      const focusAreas = [row[10], row[11], row[12]].filter(Boolean);
      const practitioner = {
        // ... other properties ...
        focusAreas: focusAreas.length > 0 ? focusAreas : [],
        // ... other properties ...
      };
      practitioners.push(practitioner);
    }
  });
  return practitioners;
}

function parseZipCodes(data) {
  const zipCodes = [];
  data.forEach((row, index) => {
    if (index > 0 && row[0] !== undefined) {
      const zipCode = {
        code: row[0].toString(),
        latitude: parseFloat(row[1]),
        longitude: parseFloat(row[2])
      };
      zipCodes.push(zipCode);
    }
  });
  return zipCodes;
}
