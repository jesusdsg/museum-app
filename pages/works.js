import axios from "axios";
import React, {useState} from "react";
import { Layout } from "../components/Layout";
import Card from "../components/Card";

const API = `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.APIKEY}&involvedMaker=Rembrandt+van+Rijn`;
export async function getStaticProps() {
  const res = await axios.get(API);
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
}
export default function Works({ data }) {
  const [query, setQuery] = useState("");
  let works = data.artObjects;
  return (
    <Layout><div className="px-8">
      <div className="bg-white px-8 py-8 mt-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold m-auto">Works of art</h1>
        <div className="flex">
            <p className="text-xl mt-2 mr-5 text-slate-400 w-1/2">You can find your favorite work of art by title or author here:</p> <input className="border-gray-400 border-2 w-1/2 rounded-lg px-4 py-2 placeholder:text-gray-400" name="search" type="text" placeholder="Search work..." onChange={e => setQuery(e.target.value)} />
        </div>
      
        </div>
      <div className="py-10">
        <div className="grid grid-cols-3 gap-10">
          {works
          .filter(work => work.title.toString().match(new RegExp(query, "i")) || work.principalOrFirstMaker.toString().match(new RegExp(query, "i")))
          .map((work) => {
            const { id, links, title, webImage, principalOrFirstMaker } = work;
            work = {
              id: id,
              title: title,
              subtitle: principalOrFirstMaker,
              image: webImage.url,
              website: links.web
            }
            return (
              <Card work={work} mode="save" key={id}/>
            );
          })}
        </div>
      </div>
    </div></Layout>
    
  );
}
