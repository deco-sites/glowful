import Icon from "$store/components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  return item.children.length > 1 ? (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div class="collapse-title">{item.name}</div>
      <div class="collapse-content">
        <ul>
          {item.children?.map((node) => (
            <div class="collapse collapse-plus">
              <input type="checkbox" />
              <div class="collapse-title">{node.name}</div>
              <div class="collapse-content">
                <ul class="flex flex-col">
                  {node.children?.map((node2) => (
                    <a class="pl-5 py-3" href={node2.url}>
                      {node2.name}
                    </a>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <a class="m-4 block" href={item.url}>
      {item.name}
    </a>
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
