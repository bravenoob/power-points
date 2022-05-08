import React from "react";
import { formatIpfsUrl, formatPrice, ipfs2http } from "../util";
import { config } from "../config";

export const NFT = (nft) => {
  return (
    <>
      <a
        className="text-left w-24
        cursor-pointer rounded-md shadow-xs
        mr-3 mb-3 sm:mr-4 hover:underline text-center"
        href={`/${nft.token_id}`}
      >
        <img
          src={formatIpfsUrl(nft.image)}
          className="rounded-md h-auto bg-white"
        />
        <div className="rounded-b-md py-2 px-2">
          <h3 className="text-xs text-gray-600">
            #{nft.token_id} | RP: {nft.rarity_power} {nft.buy}
            {nft?.buy && (
              <div className="py-4 px-2 w-full rounded-md text-lg mt-4 bg-green-100 text-green-500">
                <span>{`Ξ ${formatPrice(nft?.price)}`}</span>
              </div>
            )}
          </h3>
        </div>
      </a>
    </>
  );
};
