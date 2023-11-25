import * as XLSX from "xlsx";

// Haversine formula to calculate distance in miles
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 3958.8; // Earth's radius in miles (approximately 6371 km)

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function parsePractitionerData(data) {
  const workbook = XLSX.read(data, { type: "binary" });

  // Process MVP Practitioners Sheet
  const practitionersSheet = workbook.Sheets[workbook.SheetNames[0]];
  const practitionersData = XLSX.utils.sheet_to_json(practitionersSheet, {
    header: 1,
  });

  // Process Zip Code Infrastructure Sheet
  const zipCodeSheet = workbook.Sheets[workbook.SheetNames[1]];
  const zipCodeData = XLSX.utils.sheet_to_json(zipCodeSheet, { header: 1 });

  const zipCodes = parseZipCodes(zipCodeData); // Parse zip codes data

  return {
    practitioners: parsePractitioners(practitionersData, zipCodes), // Pass zip codes data to parsePractitioners
    zipCodes: zipCodes, // Return zip codes data as well
  };
}

function parsePractitioners(data, zipCodes) {
  const practitioners = [];
  data.forEach((row, index) => {
    if (index > 0) {
      // Skip the header row
      const focusAreas = [row[10], row[11], row[12]].filter(Boolean);
      const practitioner = {
        id: row[0],
        image: row[19], // Placeholder for image URL or path
        name: row[2], // Clinician/s
        businessName: row[1], // Clinic/s
        specialty: row[3], // Specialty
        address: `${row[15]}, ${row[16]}, ${row[17]}`, // Full address
        email: row[13], // Email Address
        phone: row[14], // Phone Number
        website: row[9], // Website
        googleReviews: parseFloat(row[5] || "0"), // Google Reviews
        numberOfReviews: parseFloat(row[6] || "0"),
        focusAreas: focusAreas, // Combining all focus areas
        zipCode: row[18] ? row[18].toString() : null, // Convert zipCode to string if exists
        latitude: 0, // Initialize latitude to 0
        longitude: 0, // Initialize longitude to 0
      };

      // Find latitude and longitude for practitioner's zip code
      if (practitioner.zipCode) {
        const zipCodeData = zipCodes.find(zip => zip.code === practitioner.zipCode);
        if (zipCodeData) {
          practitioner.latitude = zipCodeData.latitude;
          practitioner.longitude = zipCodeData.longitude;
          console.warn(`Zip code data not found for practitioner with ID ${practitioner.id}`);
        }
      }

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
        latitude: parseFloat(row[3]),
        longitude: parseFloat(row[4]),
      };
      zipCodes.push(zipCode);
    }
  });
  return zipCodes;
}
