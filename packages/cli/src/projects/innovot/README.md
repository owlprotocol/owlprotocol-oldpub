# innovot

Client NFT collection for ThreadHaus - Innovot

---

## TODO (Manny)

Edit the `tokens/` folder and create new `X.json` files that define the attributes of each token id. The "attributes" field defines the set values for the parent nft traits that are **static**, and the "children" field defines attached NFTs that will be minted and attached to the NFT before the release. The "children" field can also be empty if the token id should be minted without attachments.

## NFT Collections

Owl Protocol's nested equipment mechanic enables attaching and detaching of NFTs. A `parent` NFT can have its own **static** traits that **CANNOT** be changed. Users can that attach supported `child` NFTs which **change** the rendered attributes of the parent as well as its resulting image.

Traits that **CANNOT** change should be on the `parent`.
Traits that can be removed/added and traded should be on a `child` collection. Each child (eg. shirt, hat) is it's own collection in it's own right. When a user attaches a child they transfer the NFT to the parent NFT. Transferring the NFT in this state will transfer **BOTH** the parent and the attached NFT.

## Project Structure

-   `/layers`: Innovot collection layers
-   `/tokens`: Token ids to mint
-   `collection.json`: Defines the collection encoding, including traits and child NFTs

## Parent Traits

Traits assigned to the main Innovot collection.

-   Class: Type of base NFT
-   Background: Background color
-   Light: Light
-   Base: Base stand (same for all)
-   Glasses

## Children

Child NFTs that can be attached to parent NFTs. Before release these, could be attached to the parent collection to transfer parent NFTs with an existing bundle of child NFTs.

-   Shirt
-   Hat
