import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Question {
  titulo: string;
  /** @format html */
  descricao: string;
}

interface Props {
  /** @format html */
  title?: string;
  page: ProductDetailsPage | null;
}

function Question({ titulo, descricao }: Question) {
  return (
    <details class="collapse collapse-arrow join-item border-t border-base-200 last:border-b ">
      <summary class="collapse-title pb-[20px] text-[16px] font-bold text-[#101820] uppercase">
        {titulo}
      </summary>
      <div
        class="collapse-content lg:pb-[30px]"
        dangerouslySetInnerHTML={{ __html: descricao }}
      />
    </details>
  );
}

function FaqProduct({ title, page }: Props) {
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product } = page;

  const description = product.description || product.isVariantOf?.description;
  const descriptionJson = description && JSON.parse(description);

  return (
    <>
      <div class="w-full px-4 py-8 flex flex-col gap-4 lg:gap-8 lg:py-10">
        <div class="flex flex-col gap-8 lg:gap-10">
          <div class="join join-vertical w-full">
            {descriptionJson["mais-informacoes"].map((question: any) => (
              <Question {...question} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FaqProduct;
