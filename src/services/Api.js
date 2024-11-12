const API_KEY = 'DEMO_KEY'; // Replace with your actual API key from NASA
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/neo/browse';

export const fetchNeoData = async () => {
  try {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}`);
    console.log('Response status:', response.status); // Log the status code
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Log the response data
    return data.near_earth_objects;
  } catch (error) {
    console.error('Failed to fetch NEO data:', error);
    throw error;
  }
};
// const BASE_URL = '/data.json'; // Assurez-vous que ce chemin est correct

// export const fetchNeoData = async () => {
//   try {
//     const response = await fetch(BASE_URL);
//     console.log('Response status:', response.status); // Log le code de statut
//     if (!response.ok) {
//       throw new Error(`Network response was not ok. Status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     console.log('Fetched data:', data); // Log des données récupérées
//     return data.near_earth_objects; // Retourne la liste des objets NEO
//   } catch (error) {
//     console.error('Failed to fetch NEO data:', error);
//     // Afficher un message d'erreur dans l'interface utilisateur
//     alert('Erreur lors de la récupération des données. Veuillez vérifier le fichier JSON et le chemin.');
//     throw error;
//   }
// };
