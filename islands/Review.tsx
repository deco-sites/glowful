import { useUI } from "../sdk/useUI.ts";

export interface Props {
  title: string;
}

function Review({ title }: Props) {
  const { productId } = useUI();

  return (
    <>
      <script
        async
        src="//loox.io/widget/loox.js?shop=20c805-5.myshopify.com"
      />

      <div>
        <h1>{title}</h1>

        <div id="looxReviews" data-product-id={productId.value}></div>
        <div id="looxReviews" data-loox-aggregate></div>
      </div>
    </>
  );
}

export default Review;
