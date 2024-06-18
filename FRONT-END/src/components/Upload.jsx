import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('/api/storages')
      .then(response => setImages(response.data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  return (
    <div>
      {images.map(image => (
        <div key={image._id}>
          <img src={image.url} alt={image.title} />
          <p>{image.title} - {image.folder}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
