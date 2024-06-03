import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import Image from "apps/website/components/Image.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;

  logoPreto: {
    src: string;
    alt: string;
  };
}

const Aside = ({
  title,
  onClose,
  children,
  logoPreto,
}: {
  title: string;
  onClose?: () => void;
  children: ComponentChildren;
  logoPreto: { src: string; alt: string };
}) =>
  title === "Menu"
    ? (
      <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y divide-base-200 max-w-[100vw] px-4 w-[85%]">
        <div class="flex justify-between items-center py-2">
          {onClose && (
            <Button class="btn btn-ghost p-0" onClick={onClose}>
              <Icon
                id="XMark"
                size={24}
                strokeWidth={1}
                class="text-[#878787]"
              />
            </Button>
          )}
          <a
            href="/"
            aria-label="Store logo"
          >
            <Image
              src={logoPreto.src}
              alt={logoPreto.alt}
              width={126}
              height={16}
            />
          </a>
          <div class="h-[1px] w-[1px] bg-transparent"></div>
        </div>
        <Suspense
          fallback={
            <div class="w-screen flex items-center justify-center">
              <span class="loading loading-ring" />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    )
    : (
      <div class="bg-base-100 grid grid-rows-[auto_1fr] max-h-full lg:h-full divide-y max-w-[100vw] z-[60]">
        <Suspense
          fallback={
            <div class="w-screen flex items-center justify-center">
              <span class="loading loading-ring" />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    );

function Drawers({ menu, searchbar, children, platform, logoPreto }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <Drawer // left drawer
      open={displayMenu.value || displaySearchDrawer.value}
      onClose={() => {
        displayMenu.value = false;
        displaySearchDrawer.value = false;
      }}
      aside={
        <Aside
          onClose={() => {
            displayMenu.value = false;
            displaySearchDrawer.value = false;
          }}
          title={displayMenu.value ? "Menu" : "Buscar"}
          logoPreto={logoPreto}
        >
          {displayMenu.value && <Menu {...menu} />}
          {searchbar && displaySearchDrawer.value && (
            <div class="w-screen overflow-hidden">
              <Searchbar props={searchbar} colorIcon={"#101820"} />
            </div>
          )}
        </Aside>
      }
    >
      <Drawer // right drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => (displayCart.value = false)}
        aside={
          <Aside title="CARRINHO" onClose={() => (displayCart.value = false)}>
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
