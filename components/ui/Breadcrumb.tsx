import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class="breadcrumbs p-0 lg:mb-[64px]">
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }, index) => (
            <li class="before:!text-[#878787] before:!opacity-100 before:!w-[9px] before:!h-[9px] before:rounded-[1px] last:before:border-t-[2px] last:before:border-r-[2px]">
              <a
                class={` capitalize ${
                  index === items.length - 1
                    ? "text-[#CE0F69] font-bold"
                    : "text-[#878787] font-semibold"
                }`}
                href={item}
              >
                {name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
