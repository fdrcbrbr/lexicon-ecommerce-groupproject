import { useState, useEffect } from "react";
import { buildCategoryMatrix } from "@/lib/helpers";

interface NestedDropdownFormProps {
  defaultValue?: string;
}

export default function NestedDropdownForm({ defaultValue }: NestedDropdownFormProps) {
  const [mainCategory, setMainCategory] = useState<string | "">("");
  const [subCategory, setSubCategory] = useState("");

  const categories = buildCategoryMatrix();

  useEffect(() => {
    if (defaultValue) {
      const [main, sub] = defaultValue.split("|");
      if (main && categories[main]) {
        setMainCategory(main);
        setSubCategory(sub || "");
      }
    }
  }, [defaultValue, categories]);

  return (
  <div className="space-y-4">
    <div className="flex flex-col gap-2">
      <label className="font-medium">Main category:</label>
      <select
        name="mainCategory"
        value={mainCategory}
        required
        onChange={(e) => {
          setMainCategory(e.target.value);
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