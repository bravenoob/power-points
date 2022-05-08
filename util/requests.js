import { json2query } from ".";
import { config } from "../config";

let basePath =
  config.env == "local"
    ? `http://${config.LOCAL_API_URL}`
    : `https://${config.API_URL}`;

export const getNFT = async (id) => {
  const res = await fetch(`${basePath}/api/nft?id=${id}`);
  const data = await res.json();
  return data;
};

export const getNFTs = async (query) => {
  const res = await fetch(`${basePath}/api/nfts?${json2query(query)}`);
  const data = await res.json();
  return data;
};

export const getFilters = async (query) => {
  const res = await fetch(`${basePath}/api/filters?${json2query(query)}`);
  const data = await res.json();
  return data;
};

export const getPriceInfo = async (id) => {
  const res = await fetch(
    `https://marketplace-api.tankwars.zone/api/v1/items/${id}`
  );
  const data = await res.json();
  return data;
};
