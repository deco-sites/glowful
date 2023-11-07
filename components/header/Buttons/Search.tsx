import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function SearchButton() {
  const { displaySearchDrawer, displaySearchPopup, displayTop } = useUI();

  let colorIcon;

  if (displayTop.value) {
    colorIcon = "text-white-lily";
  } else {
    colorIcon = "text-deep-beauty";
  }

  return (
    <>
      <Button
        class="btn-circle btn-sm btn-ghost hidden sm:block"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <Icon
          id="MagnifyingGlass"
          size={24}
          strokeWidth={0.1}
          class={colorIcon}
        />
      </Button>
      <Button
        class="btn-circle btn-sm btn-ghost sm:hidden"
        aria-label="search icon button"
        onClick={() => {
          displaySearchDrawer.value = !displaySearchDrawer.value;
        }}
      >
        <Icon
          id="MagnifyingGlass"
          size={24}
          strokeWidth={0.1}
          class={colorIcon}
        />
      </Button>
    </>
  );
}
