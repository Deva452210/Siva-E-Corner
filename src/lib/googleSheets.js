import Papa from "papaparse";

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQPbP5NSY7x7i-8FX6FdYyEqsPPKqYlMHOiBMY2tHy29JcqXcNf41rxyalFzBLccllMhlgnD6-M2Kbs/pub?output=csv";

export async function fetchServicesData() {
  try {
    const response = await fetch(CSV_URL, {
      cache: 'no-store' // Never cache, always fetch fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Transform parsed data
          const transformedData = results.data.map(item => ({
            ...item,
            id: parseInt(item.id, 10),
            documentsRequired: item.documentsRequired 
              ? item.documentsRequired.split("|").map(s => s.trim()) 
              : []
          }));
          resolve(transformedData);
        },
        error: (error) => {
          console.error("CSV Parse Error:", error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching services data:", error);
    // Return empty array as fallback
    return [];
  }
}
