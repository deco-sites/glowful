import Avatar from "$store/components/ui/Avatar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  FilterRange,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import FilterRangePrice from "$store/islands/FilterRangePrice.tsx";
import ClearFilter from "$store/islands/ClearFilter.tsx";
import PriceFilter from "$store/islands/PriceFilter.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

const isRange = (filter: Filter): filter is FilterRange =>
  filter["@type"] === "FilterRange";

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <a href={url} class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class="checkbox !rounded-full h-[20px] w-[20px]"
      />
      <span class="text-[18px] text-[#666]">{label}</span>
      {quantity > 0 && (
        <span class="text-[18px] text-[#666]">({quantity})</span>
      )}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection =
    key === "tamanho" || key === "cor" ? "flex-row" : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "filter.v.price") {
          const range = parseRange(item.value);

          return (
            range && (
              <ValueItem
                {...item}
                label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
              />
            )
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const selectedValues = filters
    .filter(isToggle)
    .flatMap((filter) => filter.values.filter((value) => value.selected));

  return (
    <ul class="flex flex-col gap-[64px] p-4">
      <li class="flex flex-col gap-[24px]">
        <div class="flex p-[8px] justify-between border-b border-b-[#CCC]">
          <span class="text-[18px] text-[#1a1a1a] font-bold">FILTROS</span>

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
          <span class="text-[18px] text-[#1a1a1a] font-bold border-b border-b-[#CCC] p-[8px]">
            {filter.label}
          </span>
          <FilterRangePrice />
        </li>
      ))}

      {filters.filter(isToggle).map((filter) => (
        <li class="flex flex-col gap-[24px]">
          <span class="text-[18px] text-[#1a1a1a] font-bold border-b border-b-[#CCC] p-[8px]">
            {filter.label}
          </span>
          <FilterValues {...filter} />
        </li>
      ))}
    </ul>
  );
}

export default Filters;
