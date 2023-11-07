import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "../../islands/Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  alerts: string[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo Branco */
  logoBranco?: { src: ImageWidget; alt: string };

  /** @title Logo Preto */
  logoPreto?: { src: ImageWidget; alt: string };
}

function Header({ alerts, searchbar, navItems, logoBranco, logoPreto }: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  const { displayTop } = useUI();

  let bgColor;
  let logo;

  if (displayTop.value) {
    bgColor = "bg-transparent";
    logo = logoBranco;
  } else {
    bgColor = "bg-white-lily";
    logo = logoPreto;
  }

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers menu={{ items }} searchbar={searchbar} platform={platform}>
          <div class={`${bgColor} fixed w-full z-50`}>
            <Alert alerts={alerts} />
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
