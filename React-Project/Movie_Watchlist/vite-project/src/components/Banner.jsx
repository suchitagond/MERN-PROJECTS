import React from "react";

function Banner() {
  return (
    <div
      className="h-[20px] md:h-[80vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(https://i.ytimg.com/vi/3C0w0jj3yds/mqdefault.jpg)`,
      }}
    >
      <div className="text-white text-xl text-center w-full p-4 bg-gray-900/60">
        Avengers
      </div>
    </div>
  );
}

export default Banner;
