import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  AllReviews?: boolean;
  reviewStyle:
    | "Product Review Widget"
    | "Rating Widget"
    | "Cards Carousel Widget"
    | "Testimonials Carousel Widget"
    | "Gallery Carousel Widget"
    | "Popup Widget"
    | "Sidebar Widget";
}

function Review({ AllReviews, reviewStyle }: Props) {
  const { productId } = useUI();

  const id = productId.value;

  let reviewStyleSelected;

  switch (reviewStyle) {
    case "Product Review Widget":
      reviewStyleSelected = <div id="looxReviews" data-product-id={id}></div>;
      break;
    case "Rating Widget":
      reviewStyleSelected = (
        <div class="loox-rating" data-fetch data-id={id}></div>
      );
      break;
    case "Cards Carousel Widget":
      reviewStyleSelected = (
        <div id="loox-default-carousel">
          <div
            class="loox-v2-carousel-container"
            id="LOOX-V2_CAROUSEL-card"
            data-slide-type="card"
          ></div>
        </div>
      );
      break;
    case "Testimonials Carousel Widget":
      reviewStyleSelected = (
        <div id="loox-default-carousel">
          <div
            class="loox-v2-carousel-container"
            id="LOOX-V2_CAROUSEL-testimonial"
            data-slide-type="testimonial"
          ></div>
        </div>
      );
      break;
    case "Gallery Carousel Widget":
      reviewStyleSelected = (
        <div id="loox-default-carousel">
          <div
            class="loox-v2-carousel-container"
            id="LOOX-V2_CAROUSEL-gallery"
            data-slide-type="gallery"
          ></div>
        </div>
      );
      break;
    case "Popup Widget":
      reviewStyleSelected = `
    <script>
      var loox_pop_active = true;
      var loox_pop_display = {"other_pages":true};
    </script>
  `;
      break;
    case "Sidebar Widget":
      reviewStyleSelected = `<script>  var loox_floating_widget = {active: true,    display_on_other_pages: true,    position: "left",    button_text: "Reviews",    button_bg_color: "333333",    button_text_color: "FFFFFF",    hide_on_mobile: false,    display_on_home_page: true,  };</script>`;
      break;
    default:
      reviewStyleSelected = <div id="looxReviews" data-loox-aggregate></div>;
  }

  return (
    <>
      <script
        defer
        src="//loox.io/widget/loox.js?shop=20c805-5.myshopify.com"
      />

      <div class="container py-[60px]">
        {AllReviews === true ? (
          <div id="looxReviews" data-loox-aggregate></div>
        ) : (
          reviewStyleSelected
        )}
      </div>
    </>
  );
}

export default Review;
