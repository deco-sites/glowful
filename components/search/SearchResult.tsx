import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import NotFound from "$store/components/ui/NotFound.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

interface NotFound {
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };
  highlight?: string;
  title?: string;
  description?: string;
  link: {
    text: string;
    href: string;
  };
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;
  notFound?: NotFound;
}

function Result({
  page,
  layout,
  cardLayout,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const offset = pageInfo.currentPage * perPage;

  return (
    <>
      <div class="container md:max-w-full px-4 sm:py-10">
        <div class="flex flex-col sm:flex-row gap-[50px]">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden lg:block w-min min-w-[270px]">
              <Breadcrumb itemListElement={breadcrumb?.itemListElement} />

              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex flex-col flex-grow">
            <SearchControls
              sortOptions={sortOptions}
              filters={filters}
              displayFilter={layout?.variant === "drawer"}
            />

            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns }}
            />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="join">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronLeft" size={24} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost join-item">
              Page {pageInfo.currentPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronRight" size={24} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...useOffer(product.offers),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, notFound, ...props }: Props) {
  const pageContent = page?.products.length == 0 ? false : true;

  if (pageContent) {
    return <Result {...props} page={page} />;
  } else {
    return <NotFound {...notFound} />;
  }
}

export default SearchResult;
