import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2">
      <div class="flex flex-col justify-center items-center gap-[20px] text-primary">
        <progress
          class="progress progress-primary w-full"
          value={percent}
          max={100}
        />
        {remaining > 0 ? (
          <span class="text-[14px] lg:text-[16px] text-center lg:text-start">
            Faltam ${formatPrice(remaining, currency, locale)} para ganhar{" "}
            <strong>FRETE GRÁTIS</strong>
          </span>
        ) : (
          <span class="text-[14px] lg:text-[16px]">Você ganhou frete grátis!</span>
        )}
      </div>
    </div>
  );
}

export default FreeShippingProgressBar;
