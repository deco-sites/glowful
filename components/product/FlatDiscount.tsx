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
        className={`flex justify-center items-center h-6 p-2 lg:h-8 lg:p-3 text-center text-[14px] text-deep-beauty font-regular ${
          absolutePosition ? "absolute top-2 right-2 lg:top-4 lg:right-5" : ""
        } z-10  rounded`}
      >
        {descountPercentage}% OFF
      </span>
    );
  }
}

export default FlagDiscount;
