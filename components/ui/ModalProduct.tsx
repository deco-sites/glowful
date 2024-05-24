import { useEffect, useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { Product } from "apps/commerce/types.ts";
import PurchaseOptions from "$store/components/product/PurchaseOptions.tsx";

interface Props {
  product: Product;
  isOpen: boolean;
  closeModal: () => void;
}

export default function ModalProduct({
  product,
  isOpen,
  closeModal,
}: Props) {
  const { isVariantOf } = product;
  const images = isVariantOf?.image;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeModal();
      } else if (event.key === "ArrowLeft" && isOpen) {
        handlePrevImage();
      } else if (event.key === "ArrowRight" && isOpen) {
        handleNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  // Calculando o total de imagens
  const totalImages = images?.length;

  return (
    <>
      {isOpen && (
        <div className="bg-[#111] bg-opacity-50 fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
          <div
            className="modal-container bg-[#fff] rounded-[15px] overflow-hidden max-w-md lg:max-w-4xl w-full mx-4 p-5 lg:p-[50px] relative"
            style={{ boxShadow: "5px 10px 10px -5px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-header flex justify-between items-center mb-[50px]">
              <h2 className="text-[24px] font-bold">{isVariantOf?.name}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#878787"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="modal-body flex flex-col lg:flex-row gap-5 lg:gap-[60px]">
              <div className="lg:w-1/2 relative">
                <Slider class="h-full relative overflow-hidden">
                  {images.length > 1 && currentImageIndex !== 0 && (
                    <Slider.PrevButton
                      onClick={handlePrevImage}
                      class="absolute top-1/2 transform -translate-y-1/2 left-2 z-10 bg-[#fff] rounded-full shadow-lg p-2 cursor-pointer"
                    >
                      <Icon size={22} id="ChevronLeft" strokeWidth={2} />
                    </Slider.PrevButton>
                  )}
                  {images.length > 1 &&
                    currentImageIndex !== images.length - 1 && (
                    <Slider.NextButton
                      onClick={handleNextImage}
                      class="absolute top-1/2 transform -translate-y-1/2 right-2 z-10 bg-[#fff] rounded-full shadow-lg p-2 cursor-pointer"
                    >
                      <Icon size={24} id="ChevronRight" strokeWidth={2} />
                    </Slider.NextButton>
                  )}
                  {images.map((image, index) => (
                    <Slider.Item
                      index={index}
                      key={index}
                      class={`${
                        index === currentImageIndex ? "" : "hidden"
                      } transition-opacity duration-300`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        width={320}
                        height={400}
                        class="object-cover w-full h-full"
                      />
                    </Slider.Item>
                  ))}
                </Slider>
                <div className="absolute bottom-4 right-4 bg-[#fff] rounded-full py-1 px-4 text-black font-bold">
                  {currentImageIndex + 1}/{totalImages}
                </div>
              </div>
              <div className="mx-3 lg:mx-0 lg:w-1/2 lg:px-4">
                <PurchaseOptions product={product} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
