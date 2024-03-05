// import { invoke } from "$store/runtime.ts";
// import type { ProductListingPage } from "apps/commerce/types.ts";

import { useUI } from "../sdk/useUI.ts";

export interface Props {
  title: string;
}

async function Review({ title }: Props) {
  const { productDetails } = useUI();

  const product = productDetails.value;

  const productGroupId = product.product.isVariantOf.productGroupID;

  console.log("GRUPOID", productGroupId);

  const parts = productGroupId.split("/");

  const lastPart = parts[parts.length - 1];

  console.log("PARTS", lastPart);
  return (
    <>
      <script
        async
        src="//loox.io/widget/loox.js?shop=20c805-5.myshopify.com"
      />

      <div class="container py-[40px]">
        <h1>{title}</h1>

        <div id="looxReviews" data-product-id={lastPart}></div>
      </div>
    </>
  );
}

export default Review;
