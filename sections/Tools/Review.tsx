export interface Props {
  title: string;
}

function Review({ title }: Props) {
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
