// import { invoke } from "$store/runtime.ts";
// import type { ProductListingPage } from "apps/commerce/types.ts";

import { useUI } from "../sdk/useUI.ts";
import { useState, useEffect } from "preact/hooks";

export interface Props {
  title: string;
}

async function Review({ title }: Props) {
  // const { productId } = useUI();
  // const [productId, setProductId] = useState();

  // const product = productDetails.value;

  // const productGroupId = product.product.isVariantOf.productGroupID;

  // const parts = productGroupId.split("/");

  // const lastPart = parts[parts.length - 1];

  // setProductId(lastPart);

  // console.log(productId);

  return (
    <>
      <div class="container py-[40px]">
        <h1>{title}</h1>

        {/* <div id="looxReviews" data-product-id={productId.value}></div> */}

        <div id="looxReviews" data-loox-aggregate></div>
      </div>

      <script
        async
        src="//loox.io/widget/loox.js?shop=20c805-5.myshopify.com"
      />
    </>
  );
}

export default Review;
