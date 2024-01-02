function FlagDiscount({
  listPrice = 0,
  price = 0,
  absolutePosition = false,
}: {
  listPrice: number;
  price: number;
  absolutePosition?: boolean;
}) {
  const oldPrice = listPrice ?? 0;
  const currentPrice = price ?? 0;

  if (oldPrice === currentPrice) {
    return <span></span>;
  } else {
    const descountPercentage = (
      ((oldPrice - currentPrice) / oldPrice) *
      100
    ).toFixed(0);

    return (
      <span
        className={`flex justify-center items-center px-[20px] py-[5px] text-white-lily bg-[#CE0F69] text-center text-[14px] font-semibold leading-[130%] tracking-[1px] ${
          absolutePosition ? "absolute top-[20px] right-[20px]" : ""
        } z-10 rounded-[8px]`}
      >
        {descountPercentage}% OFF
      </span>
    );
  }
}

export default FlagDiscount;
