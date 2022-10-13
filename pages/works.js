import axios from "axios";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import Card from "../components/Card";
import Select from "react-select";

const API = `https://www.rijksmuseum.nl/api/nl/collection?key=`;
let data;

export default function Works() {
  const [works, setWorks] = useState([]);
  /*Loading the main array to handle data*/
  const loadData = async () => {
    if (!loaded) {
      await axios
        .get(API + process.env.NEXT_PUBLIC_APIKEY + "&ps=10")
        .then(async (response) => {
          data = await response.data;
          setWorks(...[data.artObjects]);
          setInitData(...[data.artObjects]);
          if (data.facets) {
            setArtists(data.facets[0].facets);
          }
        })
        .catch((error) => {
          console.log("Error", error);
          return error.response.data.error;
        });
    }
  };
  /*Load the artist object in async selector*/
  const setArtists = async (facets) => {
    if (!loaded) {
      if (Array.isArray(facets)) {
        facets.forEach((element) => {
          selectOptions.push({ value: element.key, label: element.key });
        });
      }
    }
  };

  /*Filtering data by Artist and keyword*/
  const getWorkByArtist = async (artist) => {
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
  };

  /*Input handlers*/
  const queryHandler = (event) => {
    if (event == '' && works.length == 0) {
      setWorks(...[initData]);
    } else if (event != '' && maker.value != '') {
      getWorkByArtist(maker);
    }
  };

  const selectHandler = (event) => {
    if (query != '') {
      setMaker(event);
      getWorkByArtist(event);
    }
  };

  useEffect(() => {
    loadData();
    setLoaded(true);
  }, [works]);

  const [maker, setMaker] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [selectOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [initData, setInitData] = useState([]);

  return (
    <Layout>
      <div className="px-8">
        <div className="bg-white px-8 py-8 mt-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold m-auto">Works of art</h1>
          <div className="lg:flex sm:inline-block">
            <p className="text-xl mt-2 mr-5 text-slate-400 lg:w-full sm:w-1/2">
              You can find your favorite work of art by title or author here:
            </p>
            <input
              className="border-gray-400 border-2 lg:w-1/2 w-full rounded-lg px-4 py-2 mr-5 placeholder:text-gray-400"
              name="search"
              type="text"
              placeholder="Search work..."
              onChange={(e) => {
                setQuery(e.target.value);
                queryHandler(e.target.value);
              }}
            />
            <Select
              placeholder="Select artist..."
              className="mt-1 lg:w-1/2 sm:w-full"
              options={selectOptions}
              onChange={(e) => selectHandler(e)}
            />
          </div>
        </div>
        <div className="py-10">
          <div className="grid lg:grid-cols-3 gap-10 md:grid-cols-2 sm:grid-cols-1">
            {works.length > 0 ? (
              works.map((work) => {
                const { id, links, title, webImage, principalOrFirstMaker } =
                  work;
                work = {
                  id: id,
                  title: title,
                  subtitle: principalOrFirstMaker,
                };
                if (links) work.website = links.web;
                if (webImage) work.image = webImage.url;
                return <Card work={work} mode="save" key={id} />;
              })
            ) : (
              <div className="w-full py-10 px-2">
                <h3 className="text-2xl text-red-700">Not results found</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
