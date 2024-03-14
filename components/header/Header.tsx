import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "../../islands/Alert.tsx";
import Navbar from "../../islands/Header/Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  idWidgetRebuy: string;
  alerts?: {
    alert: string;
    /** @format color */
    background?: string;
    /** @format color */
    color?: string;
  }[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo Branco */
  logoBranco: { src: ImageWidget; alt: string; textColor?: string };

  /** @title Logo Preto */
  logoPreto: { src: ImageWidget; alt: string; textColor?: string };
}

function Header({
  idWidgetRebuy,
  alerts,
  searchbar,
  navItems,
  logoBranco,
  logoPreto,
}: Props) {
  const { idWidget } = useUI();
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <header style={{ height: headerHeight }}>
      <Drawers
        menu={{ items }}
        searchbar={searchbar}
        platform={platform}
        idWidgetRebuy={idWidgetRebuy}
      >
        <div className="fixed w-full z-50">
          <Alert alerts={alerts} />
          <Navbar
            items={items}
            searchbar={searchbar && { ...searchbar, platform }}
            platform={platform}
            logoPreto={logoPreto}
            logoBranco={logoBranco}
          />
        </div>
      </Drawers>
    </header>
  );
}

export default Header;
