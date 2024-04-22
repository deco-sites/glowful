import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { useState } from "preact/hooks";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const selectedValue = e.currentTarget.value;

  if (selectedValue === urlSearchParams.get(SORT_QUERY_PARAM)) {
    urlSearchParams.set(SORT_QUERY_PARAM, `${selectedValue}:desc`);
  } else {
    urlSearchParams.set(SORT_QUERY_PARAM, selectedValue);
  }

  urlSearchParams.delete("startCursor");
  urlSearchParams.delete("endCursor");
  urlSearchParams.delete("page");

  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

const portugueseMappings = {
  "best:asc": "Melhor avaliado",
  "news:desc": "Mais novos",
  "name:asc": "Nome:Asc",
  "name:desc": "Nome:Desc",
  "price:asc": "Preço:Asc",
  "price:desc": "Preço:Desc",
  "relevance:desc": "Relevância:Desc",
  "release:desc": "Lançamento:Desc",
  "orders:desc": "Pedidos:Desc"
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();
  const [isAscending, setIsAscending] = useState(sort.includes("ascending"));

  const invertSort = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const currentSort = urlSearchParams.get(SORT_QUERY_PARAM);

    if (currentSort) {
      const isAscending = currentSort.includes("ascending");
      const newSort = isAscending
        ? currentSort.replace("ascending", "descending")
        : currentSort.replace("descending", "ascending");
      urlSearchParams.set(SORT_QUERY_PARAM, newSort);
      window.location.search = urlSearchParams.toString();
      setIsAscending(!isAscending);
    }
  };

  return (
    <>
      <select
        id="sort"
        name="sort"
        onInput={applySort}
        class="w-[220px] h-[36px] px-[20px] rounded-full text-[16px] text-[#878787] cursor-pointer select select-bordered"
      >
        {sortOptions
          .map(({ value, label }) => ({
            value,
            label:
              portugueseMappings[label as keyof typeof portugueseMappings] ??
              label,
          }))
          .filter(({ label }) => label)
          .map(({ value, label }) => (
            <option key={value} value={value} selected={value === sort}>
              <span class="text-sm">{label}</span>
            </option>
          ))}
      </select>

      <button class="ml-[24px]" onClick={invertSort}>
        <img
          loading="lazy"
          width="24"
          height="24"
          title="Ordenar"
          aria-label="Ordenar produtos"
          src="/icons/sort-quantidade-alt.svg"
          alt="botão em formato de funil"
          class={`${
            isAscending ? "" : "rotate-180"
          } transition-all duration-300 `}
        />
      </button>
    </>
  );
}

export default Sort;
