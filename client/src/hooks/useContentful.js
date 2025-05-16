import { useState, useEffect } from "react";

export function useContentful() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        `https://cdn.contentful.com/spaces/${
          import.meta.env.VITE_CONTENTFUL_SPACE_ID
        }/environments/master/entries?content_type=category&access_token=${
          import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
        }`
      );
      const data = await response.json();
      setCategories(data.items);
    }

    async function fetchProducts() {
      const response = await fetch(
        `https://cdn.contentful.com/spaces/${
          import.meta.env.VITE_CONTENTFUL_SPACE_ID
        }/environments/master/entries?content_type=produto&access_token=${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`
      );
      const data = await response.json();

      const assets = data.includes?.Asset || [];

      const enrichedProducts = data.items.map((item) => {
        const imageId = item.fields.image?.sys?.id;
        const imageAsset = assets.find((asset) => asset.sys.id === imageId);

        const imageUrl = imageAsset?.fields?.file?.url;

        return {
          ...item,
          fields: {
            ...item.fields,
            image: {
              ...item.fields.image,
              fields: {
                file: {
                  url: imageUrl,
                },
              },
            },
          },
        };
      });

      setProducts(enrichedProducts);
    }

    fetchCategories();
    fetchProducts();
  }, []);

  return { categories, products };
}
