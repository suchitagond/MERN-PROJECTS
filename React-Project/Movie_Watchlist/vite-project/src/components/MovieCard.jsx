import React from "react";
import Watchlist from "./Watchlist";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchlist(movieObj)}
          className="m-2 p-1 bg-gray-900/60 rounded-lg"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddToWatchlist(movieObj)}
          className="m-2 p-1 bg-gray-900/60 rounded-lg"
        >
          &#128512;
        </div>
      )}

      <div className="text-white w-full p-2 bg-gray-900/60 text-xl text-center">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
