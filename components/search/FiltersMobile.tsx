import Icon from "$store/components/ui/Icon.tsx";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  FilterRange,
  ProductListingPage,
} from "apps/commerce/types.ts";
import FilterRangePrice from "$store/islands/FilterRangePrice.tsx";
import ClearFilter from "$store/islands/ClearFilter.tsx";
import { useState } from "preact/hooks";
import PriceFilter from "$store/islands/PriceFilter.tsx";

export interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

const isRange = (filter: Filter): filter is FilterRange =>
  filter["@type"] === "FilterRange";

function FiltersMobile({ filters }: Props) {
  const selectedValues = filters
    .filter(isToggle)
    .flatMap((filter) => filter.values.filter((value) => value.selected));

  const [filtersSelecteds, setFiltersSelecteds] = useState<string[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedFilters = Array.from(params.keys());
    return selectedFilters;
  });

  const handleClick = (url: string) => {
    if (!filtersSelecteds.includes(url)) {
      setFiltersSelecteds([...filtersSelecteds, url]);
    } else {
      setFiltersSelecteds(
        filtersSelecteds.filter((selectedUrl) => selectedUrl !== url)
      );
    }
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    filtersSelecteds.forEach((url) => {
      const searchParams = new URLSearchParams(url.split("?")[1]);
      searchParams.forEach((value, key) => {
        params.append(key, value);
      });
    });

    const finalUrl = `${window.location.pathname}?${params.toString()}`;

    window.location.href = finalUrl;
  };

  return (
    <ul class="flex flex-col gap-[32px] p-4 px-[24px]">
      <li class="flex flex-col gap-[24px]">
        <div class="flex p-[8px] justify-between border-b border-b-[#CCC]">
          <span class="text-[18px  ] text-[#1a1a1a] font-bold">FILTROS</span>

          <ClearFilter />
        </div>
        <div class="flex gap-[16px] flex-wrap ">
          <PriceFilter />

          {selectedValues.map((item) => (
            <a
              key={item.value}
              className="rounded-[16px] bg-[#F4F4F4] text-[14px] text-[#666] flex items-center gap-[8px] px-[16px] py-[8px]"
              href={item.url}
            >
              {item.label}
              <div className="rotate-45 w-[20px] h-[20px]">
                <Icon id="Plus" size={20} strokeWidth={1} />
              </div>
            </a>
          ))}
        </div>
      </li>

      {filters.filter(isRange).map((filter) => (
        <li class="flex flex-col gap-[24px] ">
          <details class="collapse collapse-arrow join-item rounded-none ">
            <summary class="collapse-title min-h-[21px] p-0 pb-[8px] lg:pb-[57px] text-[16px] font-bold text-[#101020] border-b border-[#CCC] uppercase after:!top-[30%]">
              {filter.label}
            </summary>
            <div class="collapse-content lg:pb-[30px] pl-0 pt-[16px]">
              <FilterRangePrice />
            </div>
          </details>
        </li>
      ))}

      {filters.filter(isToggle).map((filter) => (
        <li class="flex flex-col gap-[24px]">
          <details class="collapse collapse-arrow join-item rounded-none ">
            <summary class="collapse-title min-h-[21px] p-0 pb-[8px] lg:pb-[57px] text-[16px] font-bold text-[#101020] border-b border-[#CCC] uppercase after:!top-[30%]">
              {filter.label}
            </summary>

            <div class="collapse-content lg:pb-[30px] pl-0 pt-[16px]">
              {filter.values.map((item, index) => (
                <button
                  onClick={() => {
                    handleClick(item.url);
                    filter.values.map((selected, indexSelected) => {
                      index === indexSelected &&
                        (item.selected = !item.selected);
                    });
                  }}
                  href={item.url}
                  class="flex items-center gap-2"
                >
                  <div
                    aria-checked={filtersSelecteds.includes(item.url)}
                    class="checkbox !rounded-full h-[20px] w-[20px]"
                  />
                  <span class="text-[18px] text-[#666]">{item.label}</span>
                  {item.quantity > 0 && (
                    <span class="text-[18px] text-[#666]">
                      ({item.quantity})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </details>
        </li>
      ))}

      {filtersSelecteds.length > 0 && (
        <li className="flex flex-col gap-[24px]">
          <button onClick={handleApplyFilters}>Aplicar</button>
        </li>
      )}
    </ul>
  );
}

export default FiltersMobile;
