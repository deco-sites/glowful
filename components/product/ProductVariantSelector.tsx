import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
// import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  const { quantityProduct } = useUI();

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-[16px] font-fraunces font-semibold">
            Opções disponíveis:
          </span>
          <ul class="flex flex-row flex-wrap gap-[10px]">
            {Object.entries(possibilities[name]).map(([value, link]) => {
              return (
                <li>
                  <a
                    href={link}
                    class="px-[19px] flex items-center justify-center border leading-normal hover:bg-cherry-pop hover:text-white-lily hover:border-cherry-pop active:bg-cherry-pop active:text-white-lily focus:bg-cherry-pop focus:text-white-lily focus:border-cherry-pop transition-colors"
                    onClick={() => (quantityProduct.value = 1)}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
