/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const displayTop = signal(true);
const displayHover = signal(false);
const scrollDirection = signal("down");
const displayPopup = signal(false);
const quantityProduct = signal(1);
const quantityInstallments = signal(5);
const productId = signal({});
const purchaseAvailable = signal(false);

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  displayTop,
  displayHover,
  scrollDirection,
  displayPopup,
  quantityProduct,
  productId,
  quantityInstallments,
  purchaseAvailable,
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
