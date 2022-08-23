# NFT Collection Gallery

This is a codebase spinned out of GENGEN for viewing all your tokens in a gallery with Trait Filters.

At the moment, this code is heavily coupled with MUI. If there is a community desire to decouple it, please let me know in the issues.

![GENGEN NFT Gallery](https://raw.githubusercontent.com/tansanDOTeth/gengen-nft-gallery/main/.github/images/gengen-nft-gallery-preview.png)

# Install

npm:

```bash
npm install nft-collection-gallery
```

yarn:

```bash
yarn add nft-collection-gallery
```

# Usage

Here's how to call the component in React:

```javascript
<CollectionGallery tokens={tokens} />
```

Here is an example of what data structure expected from tokens:

```javascript
[
  {
    "name": 1,
    "image": "larva-neko.png",
    "attributes": [
      {
        "trait_type": "Eyewear",
        "value": "Small Shades"
      },
      {
        "trait_type": "Background",
        "value": "Lavendar"
      },
      {
        "trait_type": "Type",
        "value": "Ape"
      },
      {
        "trait_type": "Headwear",
        "value": "Beanie"
      }
    ],
  },
  ...
]
```

# Trait Filter

![Trait Filters](https://raw.githubusercontent.com/tansanDOTeth/gengen-nft-gallery/main/.github/images/trailt-filters.png)

## Terminology

`Eyewear` is a `Trait`. `Scouter` is a `Variation`.

## Filter Logical Conjunctions

The filters use a logical AND between each `Trait`. Within each `Trait`, the filter uses a logical OR for each `Variation`.

For example, let's assume only `Headband` and `Bandana` were selected then it would show all tokens with one or the other.

Taking that example further, if `Scouter` in `Eyewear` were also selected then then it would show all tokens with the `Scouter` AND one of the `Headwear` selected.

Here is a formula expression for how it works:

```
Trait A = [Variation A, Variation B]
Trait B = [Variation C]
Trait C = [Variation D, Variation E]

Trait A && Trait B && Trait C = (Variation A || Variation B) && (Variation C) && (Variation D || Variation E)
```

# Contribution

There is an example create-react-app that you can use in `example/` to help test the build files locally. You must link certain packages for it to work.

## Linking

In order to develop locally against your local build using the `example/` directory, you will need to symlink certain `node_module/` packages.

```bash
# ./
yarn link-all
```

## Unlinking

If you want to pull the packages for `example/` as normal after linking:

```bash
yarn unlink nft-collection-gallery
yarn install --check-files
```
