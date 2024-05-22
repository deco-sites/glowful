import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import FiltersMobile from "$store/islands/FiltersMobile.tsx";
import Sort from "$store/islands/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props = Pick<ProductListingPage, "filters" | "sortOptions"> & {
  displayFilter?: boolean;
};

function SearchControls({ filters, displayFilter, sortOptions }: Props) {
  const open = useSignal(false);

  const handleClearFilters = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    window.location.href = baseUrl;
  };

  return (
    <Drawer
      class=""
      loading="lazy"
      open={open.value}
      onClose={() => (open.value = false)}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full w-full divide-y  overflow-y-hidden">
            <div class="flex justify-between items-center py-[10px] px-[24px]">
              <Button
                onClick={() => handleClearFilters()}
                class="p-2 bg-transparent border-0 text-[14px] italic font-fraunces text-[#878787] underline"
              >
                Limpar
              </Button>
              <h1>
                <span class="font-bold text-[18px] font-[#1a1a1a]">
                  FILTRAR POR
                </span>
              </h1>
              <Button
                class="bg-transparent border-none"
                onClick={() => (open.value = false)}
              >
                <Icon
                  id="XMark"
                  size={24}
                  strokeWidth={1}
                  class="text-[#878787]"
                />
              </Button>
            </div>
            <div class="flex-grow overflow-auto border-[#CCC] pt-[32px]">
              <FiltersMobile filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-end mb-4 p-4 lg:mb-[40px] lg:gap-4 lg:flex-row lg:h-[53px]">
        <div class="flex flex-row items-center justify-center flex-wrap gap-[10px] lg:gap-4">
          <Button
            class={
              displayFilter
                ? "btn-ghost"
                : "font-normal bg-transparent h-[36px] px-[20px] rounded-[50px] border-1 border-[#CCC] text-[14px] text-[#878787]  lg:hidden"
            }
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
          </Button>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
