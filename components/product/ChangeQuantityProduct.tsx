import { useUI } from "$store/sdk/useUI.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  inventoryLevel: number;
  price: number;
}

function ChangeQuantityProduct({ inventoryLevel, price }: Props) {
  const { quantityProduct } = useUI();

  return (
    <div class="w-[105px] flex justify-center items-center bg-white-lily rounded-full">
      <div class="flex items-center gap-[14px] px-[12px]">
        <button 
          onClick={() =>
            (quantityProduct.value =
              quantityProduct.value != 1 ? quantityProduct.value - 1 : 1)
          }
        >
          <Icon id="Sub" size={20} strokeWidth={1} class="text-[#000]" />
        </button>
        <span class="font-bold">{quantityProduct.value}</span>
        <button
          onClick={() =>
            (quantityProduct.value =
              inventoryLevel > quantityProduct.value
                ? quantityProduct.value + 1
                : inventoryLevel)
          }
        >
          <Icon id="Add" size={20} strokeWidth={1} class="text-[#000]" />
        </button>
      </div>
    </div>
  );
}

export default ChangeQuantityProduct;
