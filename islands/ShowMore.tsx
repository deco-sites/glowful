import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import { Product } from "apps/commerce/types.ts";
import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";

export default function ShowMore({ nextPage, layout }) {
  const products = useSignal<Product[]>([]);
  const hasNextPage = useSignal<string | undefined>("");
  const page = useSignal(1);
  const nextPageIsUndefined = useSignal(false);

  if (nextPage === undefined) {
    nextPageIsUndefined.value = true;
  }

  const loadMore = async () => {
    const url = new URL(window.location.href);

    const collectionName = url.pathname.split("/")[1];

    const pageInfo = await invoke.shopify.loaders.ProductListingPage({
      count: 1,
      pageHref: url.href,
    });

    if (pageInfo) {
      if (pageInfo.pageInfo.nextPage === undefined) {
        nextPageIsUndefined.value = true;
      } else {
        hasNextPage.value = pageInfo.pageInfo.nextPage;
      }

      products.value = [...products.value, ...pageInfo.products];

      window.history.pushState("Object", collectionName, hasNextPage.value);
    }

    page.value = page.value + 1;
  };

  return (
    <>
      {products.value?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index === 0}
          index={index}
          layout={layout}
          platform={"shopify"}
        />
      ))}

      {!nextPageIsUndefined.value && (
        <button
          class="absolute bottom-[-25px] h-[48px] px-[14px] rounded-[100px] bg-cherry-pop text-white-lily text-[16px] font-bold uppercase tracking-[2px] flex justify-center items-center shadow-2x1 hover:bg-[#111] hover:px-[30px] transition-all duration-300 "
          onClick={() => loadMore()}
          onMouseOver={(e) => {
            if (e.target instanceof HTMLElement) {
              e.target.innerHTML = `Carregar mais`;
            }
          }}
          onMouseOut={(e) => {
            if (e.target instanceof HTMLElement) {
              e.target.innerHTML = `
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M11.875 1.875C11.875 0.839466 11.0355 0 10 0C8.96447 0 8.125 0.839466 8.125 1.875V8.125H1.875C0.839466 8.125 0 8.96447 0 10C0 11.0355 0.839466 11.875 1.875 11.875H8.125L8.125 18.125C8.125 19.1605 8.96446 20 10 20C11.0355 20 11.875 19.1605 11.875 18.125V11.875H18.125C19.1605 11.875 20 11.0355 20 10C20 8.96447 19.1605 8.125 18.125 8.125H11.875V1.875Z"
              fill="white"
              />
              </svg>
              `;
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M11.875 1.875C11.875 0.839466 11.0355 0 10 0C8.96447 0 8.125 0.839466 8.125 1.875V8.125H1.875C0.839466 8.125 0 8.96447 0 10C0 11.0355 0.839466 11.875 1.875 11.875H8.125L8.125 18.125C8.125 19.1605 8.96446 20 10 20C11.0355 20 11.875 19.1605 11.875 18.125V11.875H18.125C19.1605 11.875 20 11.0355 20 10C20 8.96447 19.1605 8.125 18.125 8.125H11.875V1.875Z"
              fill="white"
            />
          </svg>
        </button>
      )}
    </>
  );
}
