import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  title: string;
  AllReviews?: boolean;
}

function Review({ title, AllReviews }: Props) {
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

      <div>
        <h1>{title}</h1>

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
