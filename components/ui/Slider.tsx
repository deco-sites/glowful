import type { ComponentChildren, JSX } from "preact";

function Dot({
  index,
  children,
  bgWhite = true,
  classes = " w-[42px]  disabled:w-[84px]",
}: {
  index: number;
  children: ComponentChildren;
  bgWhite?: boolean;
  classes: string;
}) {
  return (
    <button
      data-dot={index}
      aria-label={`go to slider item ${index}`}
      class={`focus:outline-none group h-[8px] rounded opacity-60 disabled:opacity-100 transition-all
      ${
        bgWhite
          ? "bg-[#FFFFFF] disabled:bg-[#FFFFFF]"
          : "bg-[#E4E4E4] disabled:bg-[#CE0F69]"
      } ${classes}`}
    >
      {children}
    </button>
  );
}

function Slider(props: JSX.IntrinsicElements["ul"]) {
  return <ul data-slider {...props} />;
}

function Item({
  index,
  ...props
}: JSX.IntrinsicElements["li"] & { index: number }) {
  return <li data-slider-item={index} {...props} />;
}

function NextButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="next" aria-label="Next item" {...props} />;
}

function PrevButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="prev" aria-label="Previous item" {...props} />;
}

Slider.Dot = Dot;
Slider.Item = Item;
Slider.NextButton = NextButton;
Slider.PrevButton = PrevButton;

export default Slider;
