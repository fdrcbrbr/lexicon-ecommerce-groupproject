import { useState, useEffect } from "react";

type CategoryKey = "men" | "women" | "accessories";

const categories: Record<CategoryKey, string[]> = {
  men: ["Shirts", "Pants", "Shoes"],
  women: ["Dresses", "Skirt", "Heels"],
  accessories: ["Watches", "Bags", "Jewelry"],
};

interface NestedDropdownFormProps {
  defaultValue?: string;
}

export default function NestedDropdownForm({ defaultValue }: NestedDropdownFormProps) {
  const [mainCategory, setMainCategory] = useState<CategoryKey | "">("");
  const [subCategory, setSubCategory] = useState("");

  useEffect(() => {
    if (defaultValue) {
      const [main, sub] = defaultValue.split("|");
      if (main && categories[main as CategoryKey]) {
        setMainCategory(main as CategoryKey);
        setSubCategory(sub || "");
      }
    }
  }, [defaultValue]);

  return (
  <div className="space-y-4">
    <div className="flex flex-col gap-2">
      <label className="font-medium">Main category:</label>
      <select
        name="mainCategory"
        value={mainCategory}
        required
        onChange={(e) => {
          setMainCategory(e.target.value as CategoryKey);
          setSubCategory("");
        }}
        className="p-2 border rounded"
      >
        <option value="">Select a category</option>
        {Object.keys(categories).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    {mainCategory && mainCategory in categories && (
      <div className="flex flex-col gap-2">
        <label className="font-medium">Subcategory</label>
        <select
          name="subCategory"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a subcategory:</option>
          {categories[mainCategory].map((subCat) => (
            <option key={subCat} value={subCat}>
              {subCat}
            </option>
          ))}
        </select>
      </div>
    )}

    {/* Hidden field */}
    <input
      type="hidden"
      name="category"
      value={mainCategory ? `${mainCategory}|${subCategory}` : ""}
    />
  </div>
  );
}