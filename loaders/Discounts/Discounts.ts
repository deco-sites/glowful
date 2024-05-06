import { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props {
  product?: ProductDetailsPage | null;
  // adicionar a api no loader secret
  API_ADMIN?: string;
}

export interface Discounts {
  discounts: {
    title: string;
    status: string;
    minimumRequirement: string;
    value: number;
  }[];
}

export default async function loader(props: Props): Promise<Discounts> {
  const { product, API_ADMIN } = props;

  const productID = product?.product.isVariantOf?.productGroupID;

  const url = "https://20c805-5.myshopify.com/admin/api/2023-10/graphql.json";
  const accessToken = API_ADMIN || "";

  const query = `query {
	discountNodes(first: 250) {
		edges {
			node {
				discount {
					... on DiscountAutomaticBasic {
						title
						status
						minimumRequirement {
							... on DiscountMinimumQuantity {
								greaterThanOrEqualToQuantity
							}
						}
						customerGets {
							items {
								... on DiscountProducts {
									products(first: 250) {
										edges {
											node {
												id
											}
										}
									}
								}
							}
							value {
								... on DiscountOnQuantity {
									quantity {
										quantity
									}
								}
								... on DiscountPercentage {
									percentage
								}
								... on DiscountAmount {
									amount {
										amount
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({ query }),
  };

  const res = await fetch(url, options);

  const { data } = await res.json();

  const allDiscounts = data.discountNodes.edges.filter(
    (discount: any) => discount.node.discount.status === "ACTIVE"
  );

  const productsWithDiscounts = allDiscounts.filter((discount: any) => {
    const products = discount.node.discount.customerGets.items.products;

    return (
      products &&
      products.edges.some((product: any) => product.node.id === productID)
    );
  });

  const discounts = productsWithDiscounts.map((discount: any) => ({
    title: discount.node.discount.title,
    status: discount.node.discount.status,
    minimumRequirement: parseInt(
      discount.node.discount.minimumRequirement.greaterThanOrEqualToQuantity
    ),
    value: discount.node.discount.customerGets.value.percentage,
  }));

  discounts.sort((a, b) => a.minimumRequirement - b.minimumRequirement);

  return {
    discounts,
  };
}
