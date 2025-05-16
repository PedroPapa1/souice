import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchEntries(contentType) {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
    });
    return entries.items.map((entry) => entry.fields);
  } catch (error) {
    console.error("Erro ao buscar entradas:", error);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const entries = await client.getEntries({
      content_type: "category",
    });
    return entries.items.map((entry) => entry.fields);
  } catch (error) {
    console.error("Erro ao buscar categorias do Contentful:", error);
    return [];
  }
}

export async function fetchProducts() {
  try {
    const entries = await client.getEntries({
      content_type: "produto",
    });
    return entries.items.map((entry) => entry.fields);
  } catch (error) {
    console.error("Erro ao buscar produtos do Contentful:", error);
    return [];
  }
}
