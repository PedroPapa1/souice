import { useEffect, useState } from "react";
import { fetchEntries } from "../services/contentful";
export function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const result = await fetchEntries("category");
        setCategories(result);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setLoading(false);
      }
    }
    getCategories();
  }, []);

  if (loading) {
    return <p>Carregando categorias...</p>;
  }

  return (
    <div>
      <h2>Categorias de Sorvetes</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.fields.title}</li>
        ))}
      </ul>
    </div>
  );
}
