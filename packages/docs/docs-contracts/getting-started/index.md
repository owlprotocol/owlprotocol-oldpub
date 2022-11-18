---
sidebar_position: 3
slug: '/getting-started'
sidebarCollapsed: false
---

# Getting Started

One of the most common use-cases of Owl Protocol's smart contracts is when a game wants to encode more data about the NFT onto the NFT itself.
This removes the dependency for the NFT on the game, and starts to enable decentralized mechanics and features, which are expected of NFTs.

:::info
*The owner of the NFT **should always have full access to use their NFT in any way they choose**. Free from the dependencies of a centralized system.*
:::

### You may want to encode data and **state** such as the:

- Stats of the character of item
- A visual representation of a character or item
- Associate the NFT with **equipped items, enchantments, and special effects**
- Attach achievements, player statistics, and custom payload data

## Why It's Important

It's important to ensure that the critical data about the NFT, such as its visual representation, parameters, and state are on-chain because:

1. Marketplaces such as **Opensea, Blur, and Rarible** can render the full character with equipment, accessories, and cosmetics.

2. Other games, metaverses, and blockchain projects can integrate your NFTs, thus creating new mechanics, utilities, and **value for your NFTs**.

3. Gaming guilds, DAOs, and other ecosystems will give **special access, unlockable content, or benefits** to popular NFT communities and user bases.

## Initial Steps

Dynamic NFTs require a bit of planning ahead of time, although new traits can be easily added, it's much more difficult
to remove or modify traits.

However, adding more layers (options) to an **Image** trait is supported, as long as there is enough storage left,
this can be configured with the **`bitSize`** field. For more detailed information see: [IERC721Dna](/contracts/contract-guides/IERC721Dna).
