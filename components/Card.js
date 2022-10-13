import React from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

//Favorite or bookmark component
function Card({ work, mode }) {
  const saveFavorite = async (work) => {
    await axios
      .post("/api/profile", work)
      .then((response) => {
        if (response.status == 200) {
          toast(response.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success', position: 'bottom-right'})
        }
      })
      .catch((error) => {
        console.log("Error", error);
        toast(error.response.data.error, { hideProgressBar: true, autoClose: 2000, type: 'error', position: 'bottom-right'})
      });
  };
  const removeFavorite = async (id) => {
    await axios
      .delete("/api/" + id)
      .then((response) => {
        if (response.status == 200) {
          toast(response.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success', position: 'bottom-right'})
        }
      })
      .catch((error) => {
        console.log("Error", error);
        toast(error.response.data.error, { hideProgressBar: true, autoClose: 2000, type: 'error', position: 'bottom-right'})
        
      });
  };
  return (
    <div className="px-8 py-8 bg-white shadow-lg rounded-lg">
      <div>
        <div className="h-14">
          <h3 className="text-md font-bold truncate">{work.title}</h3>
          <h3 className="text-sm text-gray-500 pb-2">{work.subtitle}</h3>
        </div>
           <Image
          width={0}
          height={0}
          src={work.image}
          alt="poster"
          sizes="100vw"
          className="w-full h-auto rounded-lg"
        />
        <br />
        <div className="mt-4 flex gap-4 text-center">
          <a
            href={work.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm w-1/2 px-4 py-2 font-bold text-black ease-in duration-300 bg-slate-200 hover:bg-slate-300 hover:text-black pointer"
          >
            Website
          </a>
          {mode == "save" ? (
            <button
              onClick={() => saveFavorite(work)}
              rel="noreferrer"
              className="rounded-sm w-1/2 px-4 py-2 font-bold text-white ease-in duration-300 bg-red-700 hover:bg-slate-200 hover:text-black pointer"
            >
              Favorite
            </button>
          ) : (
            <button
              onClick={() => removeFavorite(work.id)}
              rel="noreferrer"
              className="rounded-sm w-1/2 px-4 py-2 font-bold text-white ease-in duration-300 bg-red-700 hover:bg-slate-200 hover:text-black pointer"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
