import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  AllReviews?: boolean;
}

function Review({ AllReviews }: Props) {
  const { productId } = useUI();

  console.log("PRODUCTID", productId.value);

  const id = productId.value;

  console.log("ID", id);

  return (
    <>
      <script
        async
        src="//loox.io/widget/loox.js?shop=20c805-5.myshopify.com"
      />

      <div class="container py-[60px]">
        {AllReviews === true ? (
          <div id="looxReviews" data-loox-aggregate></div>
        ) : (
          <div id="looxReviews" data-product-id={id}></div>
        )}
      </div>
    </>
  );
}

export default Review;
