import axios from "axios";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import Card from "../components/Card";
import Filter from "../components/Filter";

const API = `https://www.rijksmuseum.nl/api/nl/collection?key=`;
let data;

export default function Works() {
  const [works, setWorks] = useState([]);
  /*Loading the main array to handle data*/
  const loadData = async () => {
    if (!loaded) {
      await axios
        .get(API + process.env.NEXT_PUBLIC_APIKEY + "&ps=20")
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

  useEffect(() => {
    loadData();
    setLoaded(true);
  }, [works]);

  const [loaded, setLoaded] = useState(false);
  const [selectOptions] = useState([]);
  const [initData, setInitData] = useState([]);

  return (
    <Layout>
      <div className="px-8">
        <Filter selectOptions={selectOptions} works={works} setWorks={setWorks} API={API} initData={initData} />
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
