import { Head } from "$fresh/runtime.ts";

export interface Props {
  title: string;
}

function Review({ title }: Props) {
  return (
    <>
      <Head>
        {/* Looxs */}
        <script
          async
          src="//loox.io/widget/loox.js?shop=20c805-5.myshopify.com"
        />
      </Head>
      <div class="h-[1000px] w-full bg-red-500">
        <h2>{title}</h2>

        <div id="looxReviews" data-loox-gregate></div>
      </div>
    </>
  );
}

export default Review;
