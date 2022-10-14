import React, { useState} from "react";
import axios from "axios";
import Select from "react-select";

//Filter component
function Filter({ selectOptions, works, setWorks, API, initData }) {
  const [maker, setMaker] = useState({});
  const [query, setQuery] = useState("");

  /*Input handlers*/
  const queryHandler = (event) => {
    if (event == '' && works.length == 0) {
      setWorks(...[initData]);
    } else if (event != '' && maker.value != '') {
      getWorkByArtist(maker);
    }
  };

  const selectHandler = (event) => {
      setMaker(event);
      getWorkByArtist(event);
  };

  /*Filtering data by Artist and keyword*/
  const getWorkByArtist = async (artist) => {
    if (query != ''){
      await axios
      .get(
        API +
          process.env.NEXT_PUBLIC_APIKEY +
          "&involvedMaker=" +
          artist.value +
          "&q=" +
          query
      )
      .then((response) => {
        setWorks(response.data.artObjects);
      })
      .catch((error) => {
        console.log("Error", error);
        alert(error.response.data.error);
      });
    }
    else {
      await axios
      .get(
        API +
          process.env.NEXT_PUBLIC_APIKEY +
          "&involvedMaker=" +
          artist.value
      )
      .then((response) => {
        setWorks(response.data.artObjects);
      })
      .catch((error) => {
        console.log("Error", error);
        alert(error.response.data.error);
      });
    }
    
  };

  return (
    <div className="bg-white px-8 py-8 mt-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold m-auto">Works of art</h1>
          <div className="lg:flex grid gap-4">
            <p className="text-xl mt-2 mr-5 text-slate-400 lg:w-full sm:w-1/2">
              You can find your favorite work of art by title or author here:
            </p>
            <Select
              placeholder="Select artist..."
              className="mt-1 lg:w-1/2 sm:w-full mr-5"
              options={selectOptions}
              onChange={(e) => selectHandler(e)}
              id="long-value-select" instanceId="long-value-select"
            />
            <input
              className="border-gray-400 border-2 lg:w-1/2 w-full rounded-lg px-4 py-2 placeholder:text-gray-400"
              name="search"
              type="text"
              placeholder="Search work..."
              onChange={(e) => {
                setQuery(e.target.value);
                queryHandler(e.target.value);
              }}
            />
          </div>
        </div>
  );
}

export default Filter;
