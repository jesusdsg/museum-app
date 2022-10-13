import axios from "axios";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import Card from "../components/Card";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState({
    email: "",
    id: "",
    name: "",
    bookmarks: [],
  });
  const getProfile = async () => {
    await axios.get("./api/profile/", {
      withCredentials: true,
    }).then(response => {
    setUser(response.data);
   })
    .catch((error) => {
      console.log('Error', error)
      toast(error.response.data.error, { hideProgressBar: true, autoClose: 2000, type: 'error', position: 'bottom-right'})
    });
  };
  /* Loading the User profile based in cookies */
  useEffect(() => {
    getProfile();
  });

  return (
    <Layout>
      <div className="bg-white px-8 py-8 mt-8 mb-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Welcome {user.name}</h1>
        <p className="text-2xl text-slate-400">
          {user.bookmarks == undefined || user.bookmarks.length == 0
            ? "You don't have bookmarks yet"
            : "This is your bookmarks list"}
        </p>
      </div>
      <div className="grid lg:grid-cols-3 mb-20 gap-10 md:grid-cols-2 sm:grid-cols-1"> 
      {user.bookmarks.map((bookmark) => {
        const { id, title, image, createAt, website } = bookmark;
        let work = {
          id: id,
          title: title,
          subtitle: createAt,
          image: image,
          website: website
        }
        return (
          <Card work={work} mode="delete" key={id}/>
        );
      })}</div>
     
      
    </Layout>
  );
}

export default Profile;
