// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let nfts = require("../data/collection.json");

const get_all_traits = (nft_arr) => {
  let all_traits = {};
  for (let i = 0; i < nft_arr.length; i++) {
    let nft = nft_arr[i];
    if (nft) {
      let { attributes } = nft;
      attributes = attributes.filter(
        (attribute) =>
          attribute["trait_type"] &&
          attribute["value"] &&
          attribute["value"] != "None"
      );
      for (let j = 0; j < attributes.length; j++) {
        let attribute = attributes[j];
        let { trait_type, value } = attribute;
        if (trait_type && value && value !== "None") {
          if (all_traits[trait_type]) {
            // trait exists
            all_traits[trait_type].sum++;
            if (all_traits[trait_type][value]) {
              // trait exists, value exists
              all_traits[trait_type][value]++;
            } else {
              // trait exists, value doesn't
              all_traits[trait_type][value] = 1;
            }
          } else {
            // trait or value don't exist
            all_traits[trait_type] = { [value]: 1, sum: 1 };
          }
        }
      }
    }
  }
  return { all_traits };
};

let { all_traits } = get_all_traits(nfts);

const filter_nft_attributes = (nft) => {
  nft["attributes"] = nft["attributes"].filter(
    (attribute) =>
      attribute["trait_type"] &&
      attribute["value"] &&
      attribute["value"] != "None"
  );
};

export const getNFT = (id) => {
  // Retrieve nft for id
  let result = nfts.filter((nft) => nft.token_id === id);
  if (result) {
    //nft.link = (nft.id.slice(0, 8) + '-' + nft.id.slice(8,12) + "-" + nft.id.slice(12,16) + "-" + nft.id.slice(16,20) + "-" + nft.id.slice(20,28));
    return { ...result[0] };
  }
};

const filterNFT = (nft, traits) => {
  if (traits.length > 0 && nft) {
    let { attributes } = nft;
    let traits_count = traits.length;
    attributes = attributes.filter(
      (attribute) =>
        attribute["trait_type"] &&
        attribute["value"] &&
        attribute["value"] != "None"
    );
    for (let i = 0; i < attributes.length; i++) {
      let { trait_type, value } = attributes[i];
      for (let j = 0; j < traits.length; j++) {
        if (trait_type == traits[j] || value == traits[j]) traits_count--;
      }
    }

    if (traits_count == 0) return true;
    else return false;
  }
  return true;
};

export const getFilters = (traits) => {
  let nftcollection = nfts.filter((nft) => filterNFT(nft, traits));
  let { all_traits: traits_tmp } = get_all_traits(nftcollection);
  return { all_traits: traits_tmp };
};

export const filterNFTQuery = (nft, query) => {
  if (query) {
    if (nft.token_id.toString().includes(query)) {
      return true;
    }
    return false;
  }
  return true;
};

export const getNFTs = (page_id, sort_by, order, traits, query) => {
  let nftcollection = nfts
    .filter((nft) => filterNFTQuery(nft, query))
    .sort((x, y) =>
      order === "asc" ? x[sort_by] - y[sort_by] : y[sort_by] - x[sort_by]
    )
    .filter((nft) => filterNFT(nft, traits));
  let nftdata = nftcollection.slice(page_id * 54, page_id * 54 + 54);
  let pages = Math.ceil(nftcollection.length / 54);

  return { nfts: nftdata, pages };
};
