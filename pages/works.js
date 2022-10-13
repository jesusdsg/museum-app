import axios from "axios";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import Card from "../components/Card";
import Select from "react-select";

const API = `https://www.rijksmuseum.nl/api/nl/collection?key=`;
export async function getStaticProps() {
  const res = await axios.get(API + process.env.NEXT_PUBLIC_APIKEY + "&ps=10");
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
}

export default function Works({ data }) {
  const [works, setWorks] = useState(data.artObjects);
  /*
    Load the artist object in async selector
  */
  const setArtists = async (facets) => {
    if (!loaded) {
      if (Array.isArray(facets)) {
        facets.forEach((element) => {
          selectOptions.push({ value: element.key, label: element.key });
        });
      }
    }
  };

  const getWorkByArtist = async (artist) => {
    await axios
      .get(
        API + process.env.NEXT_PUBLIC_APIKEY + "&involvedMaker=" + artist.value + "&q=" + query
      )
      .then((response) => {
        setWorks(response.data.artObjects);
      })
      .catch((error) => {
        console.log("Error", error);
        alert(error.response.data.error);
      });
  };

  const queryHandler = () => {
    if (query == '' && works.length == 0){
      setWorks(data.artObjects)
    }
    else if (query != '' && maker.value != ''){
      getWorkByArtist(maker)
    }
  }

  const selectHandler = (e) => {
    if (query != '') {
      setMaker(e);
      getWorkByArtist(e);
    }
  };

  useEffect(() => {
    setArtists(data.facets[0].facets);
    setLoaded(true);
  }, [works]);
  const [maker, setMaker] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [selectOptions] = useState([]);
  const [query, setQuery] = useState("");
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
              onChange={(e) => {setQuery(e.target.value); queryHandler()}}
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
            {works.length > 0
              ? works.map((work) => {
                  const { id, links, title, webImage, principalOrFirstMaker } =
                    work;
                  work = {
                    id: id,
                    title: title,
                    subtitle: principalOrFirstMaker,
                    website: links.web,
                  };
                  if (webImage) (work.image = webImage.url);
                  return <Card work={work} mode="save" key={id} />;
                })
              : ""}
          </div>
        </div>
      </div>
    </Layout>
  );
}
