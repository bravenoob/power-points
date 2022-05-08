# How to use

Once you have deployed, you need to change the following for your use:

Using locally:

1. Install packages

```
yarn install
```

2. Change the JSON in `data/collection.json` to your collection.json. If there is an error, raise it as an issue. JSON follows [opensea standards](https://docs.opensea.io/docs/metadata-standards)

3. Change `config/index.js`:

- `env` : If you're using locally set it to `local`, while deploying set it to `prod`.
- `LOCAL_API_URL`: Port at which app is running locally. Default value of `http://localhost:3000`
- `API_URL`: Your vercel URL (when you deploy)
- `COLLECTION_NAME`: Opensea collection name "OneDayPunks" is an example
- `COLLECTION_TITLE`: This is for the website title (for SEO)
- `COLLECTION_DESCRIPTION`: og:description (for SEO)
- `COLLECTION_IMG_LINK`: og:image for website (for SEO)

[Reference for SEO](https://www.heymeta.com/url/odp-rarity.vercel.app)

4. Running it locally

```
yarn run dev
```

# Stack

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
