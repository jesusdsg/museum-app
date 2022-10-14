

## Welcome to Museumapp

Hi I'm Jesus :nerd_face: and this is my repo for the code challenge offered by PrevalentWare.

The following project is developed in React with the NextJS framework.
So when you download it you will need the typical commands to start it

```bash
npm i
# to install dependencies or 
npm install
# then you can run it using:
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Features

The tools used in the project will be listed below:

- Axios for HTTP requests.
- TailwindCSS for styles.
- Custom Scrolltop component.
- Mysql Database for storage data.
- Toastify for notifications.
- Vercel for deployment.

You can check out the [Live Demo](https://museum-app-gamma.vercel.app/) - your feedback and contributions are welcome!

```
 username or email: admin
 password: root
```

Please be patient the database host is free :smile:

### Local recommendations

Make sure you have a database manager like mysql installed.
In the directory ``` ./config/db.js ``` you will find the next structure:
```
host: process.env.NEXT_PUBLIC_DB_HOST,
user: process.env.NEXT_PUBLIC_DB_USER,
password: process.env.NEXT_PUBLIC_DB_PASSWORD,
port: process.env.NEXT_PUBLIC_DB_PORT,
database: process.env.NEXT_PUBLIC_DB_NAME
    
```
Where you need to config and set the .env variables to load the specific parameters from you SQL connection.

I Hope this works fine for you :robot:
