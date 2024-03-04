import { invoke } from "$store/runtime.ts";

export interface Props {
  title: string;
}

async function Review({ title }: Props) {
  const url = new URL(window.location.href);
  const path = url.pathname;
  const parts = path.split("/");
  const lastPart = parts[parts.length - 1];

  const product = await invoke.shopify.loaders.ProductDetailsPage(lastPart);

  return (
    <>
      <script
        async
        src="//loox.io/widget/loox.js?shop=20c805-5.myshopify.com"
      />

      <div class="container py-[40px]">
        <h1>{title}</h1>

        <div id="looxReviews" data-loox-aggregate></div>
      </div>
    </>
  );
}

export default Review;
