/**
 * MenuItemForm.jsx
 * Links a menu item to an existing recipe and sets its selling price +
 * category + any flat extra costs (packaging, sauces). Cost/profit/
 * margin are NOT entered here — they're always calculated, never typed
 * in, so they can never drift out of sync with the underlying recipe.
 */
import { useState } from "react";
import Input from "../../../components/ui/Input.jsx";
import Select from "../../../components/ui/Select.jsx";
import Button from "../../../components/ui/Button.jsx";
import { useRecipes } from "../../recipes/hooks/useRecipes.js";

export default function MenuItemForm({ initialValues, onSubmit, onCancel, loading }) {
  const { data: recipes = [] } = useRecipes();

  const [values, setValues] = useState({
    name: initialValues?.name || "",
    recipeId: initialValues?.recipeId || recipes[0]?.id,
    category: initialValues?.category || "",
    sellingPrice: initialValues?.sellingPrice ?? "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Menu item name is required.";
    if (!values.sellingPrice || Number(values.sellingPrice) <= 0) {
      nextErrors.sellingPrice = "Enter a selling price greater than 0.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...values,
      recipeId: Number(values.recipeId),
      sellingPrice: Number(values.sellingPrice),
      extraCosts: initialValues?.extraCosts || [],
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Menu Item Name"
        value={values.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
      />
      <Select
        label="Recipe"
        options={recipes.map((r) => ({ value: r.id, label: r.name }))}
        value={values.recipeId}
        onChange={(e) => handleChange("recipeId", e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Category"
          value={values.category}
          onChange={(e) => handleChange("category", e.target.value)}
          placeholder="e.g. Burgers"
        />
        <Input
          label="Selling Price"
          type="number"
          step="0.01"
          value={values.sellingPrice}
          onChange={(e) => handleChange("sellingPrice", e.target.value)}
          error={errors.sellingPrice}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialValues ? "Save Changes" : "Add Menu Item"}
        </Button>
      </div>
    </form>
  );
}
