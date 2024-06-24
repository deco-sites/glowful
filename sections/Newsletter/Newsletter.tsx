import Header from "$store/components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Form {
  placeholder?: string;
  buttonText?: string;
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  /** @format color */
  color?: string;
  form?: Form;
}

const DEFAULT_PROPS: Props = {
  title: "",
  description: "",
  form: {
    placeholder: "Digite seu email",
    buttonText: "Inscrever",
  },
};

export default function Newsletter(props: Props) {
  const {
    title,
    description,
    form,
    color,
  } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  const headerLayout = (
    <div class="flex flex-col gap-6 lg:gap-8 w-full">
      <h3
        class="text-[26px]  lg:text-[38px] xl:text-[40px] font-fraunces font-normal leading-[50%] text-deep-beauty"
        style={{ color: color ? color : "#101820" }}
      >
        {title}
      </h3>
      <p
        class="lg:text-[20px] leading-[150%] text-deep-beauty"
        style={{ color: color ? color : "#101820" }}
      >
        {description}
      </p>
    </div>
  );

  const formLayout = form && (
    <form action="/" class="flex gap-2 w-full">
      <input
        class={`w-full border-b bg-transparent border-deep-beauty pl-2 placeholder:text-[#101820] text-base text-deep-beauty`}
        type="text"
        placeholder={form.placeholder}
        style={{
          color: color ? color : "#101820",
          borderColor: color ? color : "#101820",
        }}
      />
      <button
        class={`btn px-6 py-3.5 rounded-full border-0 text-white-lily uppercase text-sm tracking-[0.7px] font-semibold bg-deep-beauty hover:bg-white-lily hover:text-deep-beauty`}
        style={{ backgroundColor: color ? color : "#101820" }}
        type="submit"
      >
        {form.buttonText}
      </button>
    </form>
  );

  return (
    <>
      {/* Desktop */}
      <div
        class={`hidden lg:block p-0 bg-peach-skin`}
      >
        <div
          class={`container max-w-[1200px] flex flex-col rounded justify-between lg:items-end lg:flex-row px-6 py-[60px] gap-10 lg:py-[90px] lg:gap-[70px]`}
        >
          {headerLayout}
          {formLayout}
        </div>
      </div>

      {/* Mobile */}
      <div
        class={`block lg:hidden p-0 bg-peach-skin`}
      >
        <div
          class={`container max-w-[1200px] flex flex-col rounded justify-between lg:items-end lg:flex-row px-6 py-[60px] gap-10 lg:py-[90px] lg:gap-[70px]`}
        >
          {headerLayout}
          {formLayout}
        </div>
      </div>
    </>
  );
}
