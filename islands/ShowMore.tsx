import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import { Product } from "apps/commerce/types.ts";
import ProductCard, {
    Layout as CardLayout,
  } from "$store/components/product/ProductCard.tsx";

export default function ShowMore({ nextPage }) {
  const products = useSignal<Product[]>([]);
  const page = useSignal(1);

  const loadMore = async () => {
    const url = new URL(window.location.href + nextPage);
    const searchParams = url.searchParams;
    const startCursor = searchParams.get("startCursor") || "";
    console.log(nextPage);

    const pageInfo = await invoke.shopify.loaders.ProductListingPage({
      count: 2,
      page: page.value,
      startCursor,
      collectionName: url.pathname.split("/")[1],
    });

    if (pageInfo) {
      products.value = [...products.value, ...pageInfo.products];
    }

    page.value = page.value + 1;

    console.log(products);
  };

  return (
    <>
      {products.value?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index === 0}
          index={index}
          platform={"shopify"}
        />
      ))}
      <button onClick={() => loadMore()}>
        Show More
      </button>
    </>
  );
}
