import { useEffect, useState } from 'react';
import { fetchNeoData } from './services/Api';
import Chart from './components/Chart';
import Filter from './components/Filter';

import TableView from './components/TableView';

function App() {
  const [neoData, setNeoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({ orbitingBody: 'Earth' });
  const [viewMode, setViewMode] = useState('chart');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchNeoData();
        setNeoData(data);
        setFilteredData(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des données', err);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      applyFilters();
    }, 100);

    return () => clearTimeout(debounceTimeout);
  }, [filter, neoData]);

  const applyFilters = () => {
    const { orbitingBody } = filter;

    const filtered = neoData.filter((neo) => {
      // Log pour vérifier les données
      console.log("Checking neo:", neo);
      const closeApproachData = neo.close_approach_data?.find(data => data.orbiting_body === orbitingBody);
      return !!closeApproachData;
    });

    setFilteredData(filtered);
  };

  const toggleView = () => {
    setViewMode(viewMode === 'chart' ? 'table' : 'chart');
  };

  return (
    <div className="App" style={{width:"80%",margin:"auto", marginTop:"40px"}}>
      <Filter onFilterChange={setFilter} />
      <button onClick={toggleView} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Switch to {viewMode === 'chart' ? 'Table View' : 'Chart View'}
      </button>

      {loading ? (
        <p>Loading data...</p> // Affichage pendant le chargement
      ) : filteredData.length > 0 ? (
        viewMode === 'chart' ? (
          <Chart data={filteredData} />
        ) : (
          <TableView data={filteredData} />
        )
      ) : (
        <p>Aucune donnée trouvée pour les critères de filtre.</p>
      )}
    </div>
  );
}

export default App;
