import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function SearchButton({ colorIcon }: {
  colorIcon: string;
}) {
  const { displaySearchDrawer, displaySearchPopup } = useUI();

  return (
    <>
      <Button
        class="btn-circle btn-sm btn-ghost hidden md:flex items-center justify-center"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <Icon
          id="MagnifyingGlass"
          size={24}
          strokeWidth={0.1}
          class={`${colorIcon} text-[${colorIcon}] group-hover/hover:text-[#101820]`}
        />
      </Button>
      <Button
        class="btn-circle btn-sm btn-ghost md:hidden"
        aria-label="search icon button"
        onClick={() => {
          displaySearchDrawer.value = !displaySearchDrawer.value;
        }}
      >
        <Icon
          id="MagnifyingGlass"
          size={24}
          strokeWidth={0.1}
          class={`${colorIcon} text-[${colorIcon}] group-hover/hover:text-[#101820]`}
        />
      </Button>
    </>
  );
}
