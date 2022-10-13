import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Welcome() {
  return (
    <div>
      <div className="p-8 h-screen flex">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold py-8">Welcome to Museumapp!</h1>
          <p className="text-2xl text-slate-400 w-80">
            You can access here and have access to the entire art collection,
            get your favorites!
          </p>
          <Link href="/login">
            <a
              className="text-center rounded-lg pointer w-1/2 mt-10 px-4 py-4 font-bold text-white ease-in duration-300 bg-red-700 hover:bg-slate-200 hover:text-black"
              type="submit"
            >
              Lets' go!
            </a>
          </Link>
        </div>
        <div className="mt-10 w-1/2 h-20 rounded-lg">
          <Image
            className="rounded-lg"
            src="https://lh6.ggpht.com/DSAxEe2dAM2Kf7jo44IMnhtiv4yIU_Sl-FCvMql3u-EzVJYokp_MrdZNjT3QTPiJz42wTG-PxCBweRFOTsNQFUdXZQ=s0"
            width={1200}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
