import * as XLSX from "xlsx";
import { PractitionerInfo } from "../models/PractitionerInfo"; // Update the import path as necessary

interface ZipCode {
  code: string;
  latitude: number;
  longitude: number;
}

export function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (x: number): number => (x * Math.PI) / 180;
  const R = 3958.8; // Radius of Earth in miles

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

export function parsePractitionerData(data: any): { practitioners: PractitionerInfo[], zipCodes: ZipCode[] } {
  const workbook = XLSX.read(data, { type: "binary" });

  const practitionersSheet = workbook.Sheets[workbook.SheetNames[0]];
  const practitionersData = XLSX.utils.sheet_to_json(practitionersSheet, { header: 1 });

  const zipCodeSheet = workbook.Sheets[workbook.SheetNames[1]];
  const zipCodeData = XLSX.utils.sheet_to_json(zipCodeSheet, { header: 1 });

  const zipCodes = parseZipCodes(zipCodeData);
  return {
    practitioners: parsePractitioners(practitionersData, zipCodes),
    zipCodes: zipCodes,
  };
}

function parsePractitioners(data: any[], zipCodes: ZipCode[]): PractitionerInfo[] {
  const practitioners: PractitionerInfo[] = [];
  data.forEach((row, index) => {
    if (index > 0) {
      const focusAreas = [row[10], row[11], row[12]].filter(Boolean);
      const practitioner: PractitionerInfo = {
        id: row[0],
        image: row[19],
        name: row[2],
        businessName: row[1],
        specialty: row[3],
        address: `${row[15]}, ${row[16]}, ${row[17]}, ${row[18]}`,
        email: row[13],
        phone: row[14],
        website: row[9],
        googleReviews: parseFloat(row[5] || "0"),
        numberOfReviews: parseFloat(row[6] || "0"),
        focusAreas: focusAreas,
        zipCode: row[18] ? row[18].toString() : "",
        latitude: 0,
        longitude: 0,
        distance: undefined,
      };

      if (practitioner.zipCode) {
        const zipCodeData = zipCodes.find(zip => zip.code === practitioner.zipCode);
        if (zipCodeData) {
          practitioner.latitude = zipCodeData.latitude;
          practitioner.longitude = zipCodeData.longitude;
        } else {
          console.warn(`Zip code data not found for practitioner with ID ${practitioner.id}`);
        }
      }

      practitioners.push(practitioner);
    }
  });
  return practitioners;
}

function parseZipCodes(data: any[]): ZipCode[] {
  const zipCodes: ZipCode[] = [];
  data.forEach((row, index) => {
    if (index > 0 && row[0] !== undefined) {
      const zipCode: ZipCode = {
        code: row[0].toString(),
        latitude: parseFloat(row[3]),
        longitude: parseFloat(row[4]),
      };
      zipCodes.push(zipCode);
    }
  });
  return zipCodes;
}
