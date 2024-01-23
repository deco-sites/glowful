import { useState } from "preact/hooks";
import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
// import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  product: Product;
}

interface SelectedOption {
  value: string;
  link: string;
}

interface SelectedOptions {
  [name: string]: SelectedOption;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  const { quantityProduct } = useUI();

  // Estado para armazenar as opções selecionadas
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    () => {
      // Inicializa as opções selecionadas com o primeiro valor de cada categoria
      const initialSelectedOptions: SelectedOptions = {};

      Object.keys(possibilities).forEach((name) => {
        const [firstValue, firstLink] = Object.entries(possibilities[name])[0];
        initialSelectedOptions[name] = { value: firstValue, link: firstLink };
      });

      return initialSelectedOptions;
    },
  );

  const handleOptionSelect = (name: string, value: string, link: string) => {
    setSelectedOptions({ ...selectedOptions, [name]: { value, link } });
    quantityProduct.value = 1;
  };

  return (
    <ul className="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li key={name} className="flex items-center gap-2">
          <span className="text-[16px] font-fraunces font-semibold">
            Sabor:
          </span>
          <select
            class="py-[12px] px-[16px] pr-[24px] bg-[#F4F4F4] rounded-[50px] border border-[#CCC] font-bold outline-none"
            value={selectedOptions[name]?.value || ""}
            onChange={(e) => {
              const value = (e.target as HTMLSelectElement).value;
              const link = possibilities[name][value];
              if (link !== undefined) {
                handleOptionSelect(name, value, link);
              }
            }}
          >
            {Object.entries(possibilities[name]).map(([value, link]) => (
              <option class="font-bold" key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
