import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  AllReviews?: boolean;
  reviewStyle:
    | "Product Review Widget"
    | "Gallery Carousel Widget"
    | "Rating Widget"
    | "Cards Carousel Widget"
    | "Testimonials Carousel Widget";
}

function Review({ AllReviews, reviewStyle }: Props) {
  const { productId } = useUI();

  const id = productId.value;

  return (
    <>
      <script
        defer
        src="//loox.io/widget/loox.js?shop=20c805-5.myshopify.com"
      />

      <div class="container py-[60px]">
        {AllReviews === true && reviewStyle == "Product Review Widget" && (
          <div id="looxReviews" data-loox-aggregate></div>
        )}
        {AllReviews === false && reviewStyle == "Product Review Widget" && (
          <div id="looxReviews" data-product-id={id}></div>
        )}
        {reviewStyle === "Gallery Carousel Widget" && (
          <div id="loox-default-carousel">
            <div
              class="loox-v2-carousel-container"
              id="LOOX-V2_CAROUSEL-gallery"
              data-slide-type="gallery"
            ></div>
          </div>
        )}
        {reviewStyle === "Rating Widget" && (
          <div class="loox-rating" data-fetch data-id={id}></div>
        )}
        {reviewStyle === "Cards Carousel Widget" && (
          <div id="loox-default-carousel">
            <div
              class="loox-v2-carousel-container"
              id="LOOX-V2_CAROUSEL-card"
              data-slide-type="card"
            ></div>
          </div>
        )}
        {reviewStyle === "Testimonials Carousel Widget" && (
          <div id="loox-default-carousel">
            <div
              class="loox-v2-carousel-container"
              id="LOOX-V2_CAROUSEL-testimonial"
              data-slide-type="testimonial"
            ></div>
          </div>
        )}
      </div>
    </>
  );
}

export default Review;
