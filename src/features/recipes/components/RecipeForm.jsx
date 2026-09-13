/**
 * RecipeForm.jsx
 *
 * PURPOSE:
 * The Recipe Builder — enter a recipe name, then add/remove/edit any
 * number of ingredient lines.
 *
 * DYNAMIC ARRAY STATE:
 *
 * Each recipe ingredient is stored as an object inside an array. This
 * allows users to dynamically:
 *
 * - Add ingredients
 * - Remove ingredients
 * - Update quantities
 *
 * Example:
 *
 * [
 *   { id: 1, ingredientId: 1, quantity: 200, unit: "Gram" },
 *   { id: 2, ingredientId: 8, quantity: 1, unit: "Piece" }
 * ]
 *
 * We give each row a stable local `id` (independent of ingredientId, so
 * the same ingredient could even be added on two separate lines if a
 * recipe genuinely needed that) purely so React has a reliable `key`
 * when rows are added/removed/reordered.
 */
import { useState } from "react";
import Input from "../../../components/ui/Input.jsx";
import Button from "../../../components/ui/Button.jsx";
import RecipeIngredientRow from "./RecipeIngredientRow.jsx";
import { useIngredients } from "../../ingredients/hooks/useIngredients.js";

let nextRowId = 1000; // simple local counter for new row keys, this session only

export default function RecipeForm({ initialValues, onSubmit, onCancel, loading }) {
  const { data: ingredients = [] } = useIngredients();

  const [name, setName] = useState(initialValues?.name || "");
  const [rows, setRows] = useState(
    initialValues?.items?.length
      ? initialValues.items
      : [{ id: nextRowId++, ingredientId: ingredients[0]?.id, quantity: 100, unit: "Gram" }]
  );
  const [error, setError] = useState("");

  function updateRow(index, nextRow) {
    setRows((prev) => prev.map((row, i) => (i === index ? nextRow : row)));
  }

  function removeRow(index) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      { id: nextRowId++, ingredientId: ingredients[0]?.id, quantity: 100, unit: "Gram" },
    ]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return setError("Recipe name is required.");
    if (rows.length === 0) return setError("Add at least one ingredient.");
    setError("");
    onSubmit({ name, items: rows });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input label="Recipe Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Chicken Burger" />

      <div className="space-y-3">
        <p className="text-sm font-medium text-ink-800">Ingredients</p>
        {rows.map((row, index) => (
          <RecipeIngredientRow
            key={row.id}
            row={row}
            ingredients={ingredients}
            onChange={(nextRow) => updateRow(index, nextRow)}
            onRemove={() => removeRow(index)}
          />
        ))}
        <Button type="button" variant="ghost" size="sm" onClick={addRow}>
          + Add Ingredient
        </Button>
      </div>

      {error && <p className="text-sm text-loss-500">{error}</p>}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialValues ? "Save Recipe" : "Create Recipe"}
        </Button>
      </div>
    </form>
  );
}
