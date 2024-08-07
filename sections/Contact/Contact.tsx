import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { asset } from "$fresh/runtime.ts";

export interface Props {
  title: string;
  /**
   * @title Description
   * @format html
   */
  content: string;
  form: {
    placeholderName: string;
    placeholderEmail: string;
    placeholderSubject: string;
    /** @description Items que irão aparecer no select  */
    itensSubjects: string[];
    placeholderText: string;
    labelButton: string;
  };
  image: {
    src: ImageWidget;
    alt: string;
    preload: boolean;
  };
  layout: {
    positionImage: "Imagem a direita" | "imagem a esquerda";
  };
}

const DEFAULT_PROPS: Props = {
  title: "Nossa equipe está pronta para te ajudar.",
  content:
    "Basta preencher o formulário abaixo e nossa equipe entrará em contato o mais rápido possível. Você ainda pode entrar em contato conosco pelo email contato@glowful.com ou pelo nosso chat online.",
  form: {
    placeholderName: "Nome",
    placeholderEmail: "Email",
    placeholderSubject: "Selecione o assunto",
    itensSubjects: ["Devolução do produto, Frete gratis, Garantia"],
    placeholderText: "Mensagem",
    labelButton: "Enviar",
  },
  image: {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ae89571c-4a7c-44bf-9aeb-a341fd049d19",
    alt: "equipe",
    preload: true,
  },
  layout: {
    positionImage: "Imagem a direita",
  },
};

const LAYOUT_IMAGE = {
  "Imagem a direita": "lg:flex-row",
  "imagem a esquerda": "lg:flex-row-reverse",
};

const LAYOUT_FORM = {
  "Imagem a direita": "lg:mr-0 lg:ml-auto lg:pr-0",
  "imagem a esquerda": "lg:ml-0 lg:mr-auto lg:pl-0",
};

export default function Contact({ props }: { props: Props }) {
  const { title, content, form, image, layout } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <div
      class={`flex w-full flex-col ${
        LAYOUT_IMAGE[layout.positionImage]
      } lg:gap-16 xl:gap-0`}
    >
      <div
        class={`flex flex-col gap-6 lg:gap-6 2xl:gap-8 w-full max-w-[500px] ml-auto py-10 px-6 m-auto lg:pt-5 2xl:pt-10 lg:mr-auto justify-center lg:mt-10 2xl:mt-14 ${
          LAYOUT_FORM[layout.positionImage]
        }`}
      >
        <h2 class="text-[28px] lg:text-[40px] lg:leading-tight font-fraunces font-normal text-deep-beauty">
          {title}
        </h2>
        <span
          class="bg-transparent text-[#101820] text-[16px] font-redhat"
          dangerouslySetInnerHTML={{ __html: content }}
        >
        </span>
        <form class="w-full flex flex-col gap-4 items-center px-2 lg:p-0">
          <label for="name" class="sr-only">Nome:</label>
          <input
            id="name"
            class="h-[56px] lg:h-12 input input-bordered focus:outline-none w-full bg-transparent border-1 border-[#878787] placeholder:text-[#878787] text-[16px] font-redhat"
            type="text"
            placeholder={form.placeholderName}
            required
          >
          </input>

          <label for="email" class="sr-only">Email:</label>
          <input
            id="email"
            class="h-[56px] lg:h-12 input input-bordered focus:outline-none w-full bg-transparent border-1 border-[#878787] placeholder:text-[#878787] text-[16px] font-redhat"
            type="email"
            placeholder={form.placeholderEmail}
            required
          >
          </input>

          <label for="subject" class="sr-only">Assunto:</label>
          <select
            id="subject"
            class="h-[56px] lg:h-12 select select-primary w-full focus:outline-none bg-transparent border-1 border-[#878787] placeholder:text-[#878787] text-[#878787] text-[16px] font-redhat"
            style={{
              backgroundImage: `url(${asset("/icons/down_arrow.svg")})`,
              backgroundSize: "1.5rem auto",
              backgroundPosition: "right 0.7rem top 50%;",
            }}
            required
          >
            <option class="py-4" disabled selected>
              {form.placeholderSubject}
            </option>
            {form.itensSubjects.map((iten) => (
              <option class="py-4" value={iten}>{iten}</option>
            ))}
          </select>

          <label for="message" class="sr-only">Mensagem:</label>
          <textarea
            id="message"
            required
            class="h-[126px] lg:h-20 py-2 leading-7 input input-bordered focus:outline-none w-full bg-transparent border-1 border-[#878787] placeholder:text-[#878787] text-[16px] font-redhat"
            placeholder={form.placeholderText}
          >
          </textarea>
          <button
            class="btn max-w-44 lg:max-w-[245px] mt-4 px-[24px] w-full py-4  rounded-full border-0 text-white-lily uppercase text-[14px] lg:text-[16px] lg:mt-1 2xl:mt-4 tracking-[0.7px] font-semibold bg-deep-beauty hover:bg-[#878787] hover:text-deep-beauty"
            type="submit"
          >
            {form.labelButton}
          </button>
        </form>
      </div>
      <Picture preload={image.preload} class="w-2/4 hidden lg:flex">
        <Source
          media="(max-width: 1440px)"
          fetchPriority={image.preload ? "high" : "auto"}
          src={image.src}
          width={700}
          height={881}
        />
        <Source
          media="(min-width: 1728px)"
          fetchPriority={image.preload ? "high" : "auto"}
          src={image.src}
          width={1728}
          height={2175}
        />
        <img
          class="object-cover w-full h-full 2xl:max-h-screen"
          loading={image.preload ? "eager" : "lazy"}
          src={image.src}
          alt={image.alt}
        />
      </Picture>
    </div>
  );
}
