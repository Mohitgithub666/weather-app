import React, { useEffect, useState } from "react";
import "./Home.css";
import { MdOutlineWbSunny } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { FaCloud } from "react-icons/fa";
import { IoRainy } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { GiUndergroundCave } from "react-icons/gi";
import { IoSpeedometerSharp } from "react-icons/io5";
import { FaStreetView } from "react-icons/fa";
import axios from "axios";

export const Home = () => {
  const [search, setSearch] = useState("india");
  const [location, setLocation] = useState("india");
  const [error, setError] = useState(false);
  const temprature = 25;
  useEffect(() => {
    (async () => {
      try {
        setError(false);
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=4d84425624a4198f15f68ce00d82794c`
        );
        console.log(res.data.main);
        setLocation(res.data.main);
      } catch (error) {
        setError(true);
      }
    })();
  }, [search]);

  return (
    <>
      <main>
        <div className="container  main-con">
          <div className="box-cont">
            <form>
              <p>
                <MdLocationPin />
              </p>
              <input
                type="Search"
                placeholder="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </form>
            {error ? (
              <h1> no data found</h1>
            ) : (
              <>
                <div className="temp">
                  <div className="icon-con">
                    <FaStreetView />
                  </div>
                  <div className="data-con">
                    <h1>{search}</h1>
                    <h2>{location.temp}°Cel</h2>
                    <p>
                      {location.temp >= 30 ? <MdOutlineWbSunny /> : <FaCloud />}
                    </p>
                  </div>
                </div>
                <div className="day-tem">
                  <div className="box-1">
                    <p>
                      {location.temp >= 30 ? <MdOutlineWbSunny /> : <FaCloud />}
                    </p>
                    <h1>Min :{location.temp_min}°Cel </h1>
                  </div>
                  <div className="box-1">
                    <p>
                      {location.temp >= 30 ? <MdOutlineWbSunny /> : <FaCloud />}
                    </p>
                    <h1> Max : {location.temp_max}°Cel</h1>
                  </div>
                  <div className="box-1">
                    <p>
                      <WiHumidity />
                    </p>
                    <h1>Humidity: {location.humidity}%</h1>
                  </div>
                  <div className="box-1">
                    <p>
                      <GiUndergroundCave />
                    </p>
                    <h1>grnd_level: {location.grnd_level}</h1>
                  </div>
                  <div className="box-1">
                    <p>
                      <IoSpeedometerSharp />
                    </p>
                    <h1>pressure: {location.pressure}</h1>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
