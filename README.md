# A Next JS with typescript-webshop

Language: Swedish <br>
This is a frontend using the CMS from the repo: [https://github.com/Shinyn/commercecraft](https://github.com/Shinyn/commercecraft).<br>
_To fully utilize this webshop, you will need to download and install the CMS._<br>
Here Hakim can showcase the store Hakim livs from the other repo, with all products, categories etc, aswell as placing orders after buying them.
If you want to use the store Hakim Livs you will have to contact us to recieve the STOREID, otherwise you may use the CMS and create your own login and store as down below:

_We want to note that some information is hardcoded for Hakim livs_

## Getting Started

### Installation

#### Repo

You can clone the repo from github to get all the repositories files easily from githubs page.

#### .env

You need to have a .env in your rootfile to be able to run the program fully. Create a file and name it `.env `, then add the following parameters:

```
NEXT_PUBLIC_BACKEND_URL= *the backend url where you have your CMS running*
NEXT_PUBLIC_STOREID = *the store_id from the CMS, found in the Dashboard after downloading and installing:  [https://github.com/Shinyn/commercecraft](https://github.com/Shinyn/commercecraft).*
```

#### Node packages

Install all the nodepackages:

```bash
npm i
```

### To run the program on your localhost:

Run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser, aswell as the CMS on another localhost, to see the result. _Don't forget to add the URL to the backend in your .env._

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Folderstructure

### app

This folder contains:

- The page and layout for the store's landingpage.
- The folder _checkout_ contains the page-route checkout aswell as it's layout.
- The folder _zustand_ contains the necessary states that are needed for the app to work.

### components

This folder contains:

- Components used for the page.
- Inside the _ui_ folders are shadcn_ui components that are used globally.

## Hardcoded information for now

Inside this Website are different hardcoded informations for Hakim livs. This is:

- The footers storeinformation, _found in the Footer.tsx_
- The navs Logo-link _found in the Nav.tsx_
- The checkouts shipping and payment found in the _folder checkout_ at _page.tsx_.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
