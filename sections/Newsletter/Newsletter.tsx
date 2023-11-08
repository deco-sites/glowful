import Header from "$store/components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
  background?: ImageWidget;
  layout?: {
    headerFontSize?: "Large" | "Normal";
    content?: {
      border?: boolean;
      alignment?: "Center" | "Left" | "Side to side";
      bgColor?: "Normal" | "Reverse";
    };
  };
}

const DEFAULT_PROPS: Props = {
  title: "",
  description: "",
  form: {
    placeholder: "Digite seu email",
    buttonText: "Inscrever",
    helpText:
      'Ao se inscrever, você concorda com nossa <a class="link" href="/politica-de-privacidade">Política de privacidade</a>.',
  },
  layout: {
    headerFontSize: "Large",
    content: {
      border: false,
      alignment: "Center",
    },
  },
};

export default function Newsletter(props: Props) {
  const { title, description, form, layout, background } = {
    ...DEFAULT_PROPS,
    ...props,
  };
  const isReverse = layout?.content?.bgColor === "Reverse";
  const bordered = Boolean(layout?.content?.border);

  const headerLayout = (
    <Header
      title={title}
      description={description}
      alignment={layout?.content?.alignment === "Left" ? "left" : "center"}
      colorReverse={isReverse}
      fontSize={layout?.headerFontSize}
    />
  );

  const formLayout = form && (
    <form action="/" class="flex flex-col gap-4">
      <div class="flex flex-col lg:flex-row gap-4">
        <input
          class="input input-bordered lg:w-80 bg-transparent border-2 border-white-lily placeholder:text-white-lily text-[16px] font-redhat"
          type="text"
          placeholder={form.placeholder}
        />
        <button
          class={`btn ${
            isReverse ? "btn-accent" : ""
          } px-[40px] border-0 text-white-lily text-uppercase text-[14px] tracking-[1px] font-medium bg-gradient-to-r from-[#CE0F69] to-[#FF9EBC] lg:border lg:border-white-lily lg:bg-transparent lg:from-transparent lg:to-transparent lg:hover:bg-gradient-to-r lg:hover:from-[#CE0F69] lg:hover:to-[#FF9EBC] transition-colors duration-300 lg:hover:border-transparent`}
          type="submit"
        >
          {form.buttonText}
        </button>
      </div>
      {form.helpText && (
        <div
          class="text-sm text-white-lily lg:text-[12px]"
          dangerouslySetInnerHTML={{ __html: form.helpText }}
        />
      )}
    </form>
  );

  const bgLayout = isReverse
    ? "bg-secondary text-secondary-content"
    : "bg-transparent";

  return (
    <div
      class={`${
        bordered
          ? isReverse
            ? "bg-secondary-content"
            : "bg-secondary"
          : bgLayout
      } ${bordered ? "p-4 lg:p-16" : "p-0"} bg-cover bg-no-repeat bg-center`}
      style={{ backgroundImage: `url("${background}")` }}
    >
      {(!layout?.content?.alignment ||
        layout?.content?.alignment === "Center") && (
        <div
          class={`container flex flex-col rounded p-4 gap-[40px] lg:p-16 lg:gap-12 ${bgLayout} `}
        >
          {headerLayout}
          <div class="flex justify-center">{formLayout}</div>
        </div>
      )}
      {layout?.content?.alignment === "Left" && (
        <div
          class={`container flex flex-col rounded p-4 gap-[40px] lg:p-16 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-start">{formLayout}</div>
        </div>
      )}
      {layout?.content?.alignment === "Side to side" && (
        <div
          class={`container flex flex-col rounded justify-between lg:items-center lg:flex-row p-4 gap-[40px] lg:p-16 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-center">{formLayout}</div>
        </div>
      )}
    </div>
  );
}
