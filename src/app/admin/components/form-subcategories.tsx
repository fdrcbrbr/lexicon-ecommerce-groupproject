import { useState } from "react";

type CategoryKey = "men" | "women" | "accessories";

const categories: Record<CategoryKey, string[]> = {
  men: ["Shirts", "Pants", "Shoes"],
  women: ["Dresses", "Skirt", "Heels"],
  accessories: ["Watches", "Bags", "Jewelry"],
};

export default function NestedDropdownForm() {
  const [mainCategory, setMainCategory] = useState<CategoryKey | "">("");
  const [subCategory, setSubCategory] = useState("");

  return (
    <div>
      <div>
        <label>Main category:</label>
        <select
          value={mainCategory}
          onChange={(e) => {
            setMainCategory(e.target.value as CategoryKey);
            setSubCategory("");
          }}
        >
          <option value="">Seleziona una categoria</option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {mainCategory && mainCategory in categories && (
        <div>
          <label>Sottocategoria:</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">Seleziona una sottocategoria</option>
            {categories[mainCategory].map((subCat) => (
              <option key={subCat} value={subCat}>
                {subCat}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}