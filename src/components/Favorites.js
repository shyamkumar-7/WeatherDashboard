import React from 'react';

function Favorites({ favorites, setCity, removeFavorite }) {
  return (
    <div className="favorites">
      <h3>Favorite Cities</h3>
      {favorites.map((fav) => (
        <div key={fav.id}>
          <span onClick={() => setCity(fav.name)}>{fav.name}</span>
          <button onClick={() => removeFavorite(fav)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
