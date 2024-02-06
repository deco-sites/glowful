import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Question {
  titulo: string;
  /** @format html */
  descricao: string;
}

interface Props {
  /** @format html */
  title: string;
  page: ProductDetailsPage | null;
}

function Question({ titulo, descricao }: Question) {
  return (
    <details class="collapse collapse-arrow join-item border-t border-base-200">
      <summary class="collapse-title pb-[28px] lg:pb-[57px] text-lg font-semibold text-[#101820] uppercase">
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
    <div class="w-full container px-4 py-8 flex flex-col gap-4 lg:gap-8 lg:py-10 lg:px-40">
      <div class="flex flex-col gap-8 lg:gap-10">
        {descriptionJson["mais-informacoes"] && (
          <div class="card-title textHighlight text-[24px] lg:text-[32px] lg:pb-[10px] text-center justify-center">
            <p class="text-center">
              Mais <strong>Informações</strong>
            </p>
          </div>
        )}
        <div class="join join-vertical w-full">
          {descriptionJson["mais-informacoes"].map((question: any) => (
            <Question {...question} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FaqProduct;
