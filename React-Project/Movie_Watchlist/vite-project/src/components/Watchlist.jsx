import React, { useEffect, useState } from "react";
import genreids from "../utility/genre";

function Watchlist({ watchlist, setWatchlist,handleRemoveFromWatchlist }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currentGenre, setcurrentGenre] = useState(["All Genres"]);

  let handleFilter = (genre) => {
    setcurrentGenre(genre);
  };

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let increasingRating = () => {
    let sortIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist([...sortIncreasing]);
  };
  let decreasingRating = () => {
    let sortDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchlist([...sortDecreasing]);
  };

  let increasingPopularity = () => {
    let sortIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.popularity - movieB.popularity;
    });
    setWatchlist([...sortIncreasing]);
  };
  let decreasingPopularity = () => {
    let sortDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.popularity - movieA.popularity;
    });
    setWatchlist([...sortDecreasing]);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
    // console.log(temp);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => handleFilter(genre)}
              className={
                currentGenre == genre
                  ? "flex justify-center hover:cursor-pointer bg-blue-400 rounded-xl text-white font-bold items-center h-[3rem] w-[9rem] mx-4"
                  : "flex justify-center hover:cursor-pointer bg-gray-400/50 rounded-xl text-white font-bold items-center h-[3rem] w-[9rem] mx-4"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
        />
      </div>

      <div className="ovrflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <th>Name</th>
            <th className="flex justify-center">
              <div
                onClick={increasingRating}
                className="p-2 hover:cursor-pointer"
              >
                <i class="fa-solid fa-arrow-up"></i>
              </div>
              <div className="p-2">Ratings</div>
              <div
                onClick={decreasingRating}
                className="p-2 hover:cursor-pointer"
              >
                <i class="fa-solid fa-arrow-down"></i>
              </div>
            </th>
            <th>
              <div className="flex justify-center items-center">
                <div
                  className="p-2 hover:cursor-pointer"
                  onClick={increasingPopularity}
                >
                  <i class="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Popularity</div>
                <div
                  className="p-2 hover:cursor-pointer"
                  onClick={decreasingPopularity}
                >
                  <i class="fa-solid fa-arrow-down"></i>
                </div>
              </div>
            </th>
            <th>Genre</th>
          </thead>

          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currentGenre == "All Genres") {
                  return true;
                } else {
                  return genreids[movieObj.genre_ids[0]] == currentGenre;
                }
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-4 py-6">
                      <img
                        className="h-[rem] w-[10rem] "
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt=""
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td onClick={()=>handleRemoveFromWatchlist(movieObj)} className="text-red-800 hover:cursor-pointer">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
