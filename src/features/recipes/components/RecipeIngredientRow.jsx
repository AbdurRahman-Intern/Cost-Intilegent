/**
 * RecipeIngredientRow.jsx
 *
 * PURPOSE:
 * One line inside the Recipe Builder: pick an ingredient, enter a
 * quantity + unit, remove the line. Rendered in a list by RecipeForm.jsx.
 *
 * WHY THIS IS ITS OWN COMPONENT:
 * RecipeForm manages an ARRAY of these rows (see the comment there about
 * dynamic array state). Extracting each row into its own component
 * keeps that array-mapping code in RecipeForm trivial: it just renders
 * `<RecipeIngredientRow key={row.id} ... />` for each entry.
 */
import Select from "../../../components/ui/Select.jsx";
import Input from "../../../components/ui/Input.jsx";

const RECIPE_UNITS = ["Gram", "ML", "Piece", "Pack"];

export default function RecipeIngredientRow({ row, ingredients, onChange, onRemove }) {
  return (
    <div className="grid grid-cols-12 items-end gap-2">
      <div className="col-span-5">
        <Select
          label="Ingredient"
          options={ingredients.map((i) => ({ value: i.id, label: i.name }))}
          value={row.ingredientId}
          onChange={(e) => onChange({ ...row, ingredientId: Number(e.target.value) })}
        />
      </div>
      <div className="col-span-3">
        <Input
          label="Quantity"
          type="number"
          min="0"
          value={row.quantity}
          onChange={(e) => onChange({ ...row, quantity: Number(e.target.value) })}
        />
      </div>
      <div className="col-span-3">
        <Select
          label="Unit"
          options={RECIPE_UNITS}
          value={row.unit}
          onChange={(e) => onChange({ ...row, unit: e.target.value })}
        />
      </div>
      <div className="col-span-1">
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove ingredient"
          className="mb-0.5 flex h-10 w-10 items-center justify-center rounded-lg text-loss-500 hover:bg-loss-50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
