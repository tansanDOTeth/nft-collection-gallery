# NFT Gallery

This is a codebase spinned out of GENGEN for viewing all your tokens in a gallery with Trait Filters.

At the moment, this code is heavily coupled with MUI. If there is a community desire to decouple it, please let me know in the issues.

![GENGEN NFT Gallery](https://raw.githubusercontent.com/tansanDOTeth/gengen-nft-gallery/main/.github/images/gengen-nft-gallery-preview.png)

## Trait Filter

![Trait Filters](https://raw.githubusercontent.com/tansanDOTeth/gengen-nft-gallery/main/.github/images/trailt-filters.png)

### Terminology

`Eyewear` is a `Trait`. `Scouter` is a `Variation`.

### Filter Logical Conjunctions

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
