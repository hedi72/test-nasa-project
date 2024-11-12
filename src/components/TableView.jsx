import PropTypes from 'prop-types';

const TableView = ({ data }) => {

  const convertToTSV = (data) => {
    const header = ['Neo Name', 'Min Estimated Diameter(Km)', 'Max Estimated Diameter(Km)'];


    const rows = data.map((neo) => [
      `"${neo.name.trim()}"`,
      `${neo.estimated_diameter.kilometers.estimated_diameter_min || 'N/A'}`, 
      `${neo.estimated_diameter.kilometers.estimated_diameter_max || 'N/A'}`, 
    ]);

    const tsvContent = [
      header.join('\t'), 
      ...rows.map((row) => row.join('\t')), 
    ].join('\n'); 

    return tsvContent;
  };

  // Fonction pour télécharger le fichier TSV
  const downloadTSV = () => {
    const tsvContent = convertToTSV(data);
    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Créer un lien temporaire pour télécharger le fichier TSV
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'neo_data.tsv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="overflow-x-auto">
      

     
      

      <table className="min-w-full table-auto border-collapse">
        <thead >
          <tr className="bg-gray-100" style={{ textAlign: 'justify' , backgroundColor:"rgb(80 133 235)",color:"white"}}>
            <th className="px-4 py-2 border-b"></th>
            <th className="px-4 py-2 border-b">Neo Name</th>
            <th className="px-4 py-2 border-b">Min Estimated Diameter(Km)</th>
            <th className="px-4 py-2 border-b">Max Estimated Diameter(Km)</th>
            <button
        onClick={downloadTSV}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Download TSV
      </button>
          </tr>
        </thead>
        <tbody>
          {data.map((neo, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{index+1}</td>
              <td className="px-4 py-2 border-b">{neo.name}</td>
              <td className="px-4 py-2 border-b">
                {neo.estimated_diameter.kilometers.estimated_diameter_min || 'N/A'}
              </td>
              <td className="px-4 py-2 border-b">
                {neo.estimated_diameter.kilometers.estimated_diameter_max || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TableView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      estimated_diameter: PropTypes.shape({
        kilometers: PropTypes.shape({
          estimated_diameter_min: PropTypes.number,
          estimated_diameter_max: PropTypes.number,
        }),
      }),
    })
  ).isRequired,
};

export default TableView;
