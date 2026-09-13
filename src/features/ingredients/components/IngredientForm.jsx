/**
 * IngredientForm.jsx
 *
 * PURPOSE:
 * A single form component reused for BOTH "Add Ingredient" and "Edit
 * Ingredient" — the only difference is whether `initialValues` is
 * passed in. This avoids maintaining two nearly-identical forms.
 *
 * WHY LOCAL useState INSTEAD OF A FORM LIBRARY:
 * The brief asks us to prefer local state over extra dependencies
 * unless truly necessary. For a 4-field form, a form library (like
 * react-hook-form) would add more boilerplate than it saves. For much
 * larger forms, that trade-off flips — worth knowing as your forms grow.
 */
import { useState } from "react";
import Input from "../../../components/ui/Input.jsx";
import Select from "../../../components/ui/Select.jsx";
import Button from "../../../components/ui/Button.jsx";

const UNIT_OPTIONS = ["KG", "Gram", "Liter", "ML", "Piece", "Pack"];

export default function IngredientForm({ initialValues, onSubmit, onCancel, loading }) {
  const [values, setValues] = useState({
    name: initialValues?.name || "",
    unit: initialValues?.unit || "KG",
    currentPrice: initialValues?.currentPrice ?? "",
    supplier: initialValues?.supplier || "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  // Simple, explicit client-side validation. Real field-level rules
  // (e.g. server-side uniqueness checks) will come from Laravel later —
  // see the TODO below.
  function validate() {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Ingredient name is required.";
    if (!values.currentPrice || Number(values.currentPrice) <= 0) {
      nextErrors.currentPrice = "Enter a price greater than 0.";
    }
    if (!values.supplier.trim()) nextErrors.supplier = "Supplier is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...values, currentPrice: Number(values.currentPrice) });
    // TODO: once Laravel is connected, surface server-side validation
    // errors here too (e.g. duplicate ingredient name), merged into
    // the `errors` state above.
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Ingredient Name"
        value={values.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        placeholder="e.g. Chicken"
      />
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Unit"
          options={UNIT_OPTIONS}
          value={values.unit}
          onChange={(e) => handleChange("unit", e.target.value)}
        />
        <Input
          label="Current Price"
          type="number"
          step="0.01"
          value={values.currentPrice}
          onChange={(e) => handleChange("currentPrice", e.target.value)}
          error={errors.currentPrice}
          placeholder="0.00"
        />
      </div>
      <Input
        label="Supplier"
        value={values.supplier}
        onChange={(e) => handleChange("supplier", e.target.value)}
        error={errors.supplier}
        placeholder="e.g. Al Safi Meats"
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialValues ? "Save Changes" : "Add Ingredient"}
        </Button>
      </div>
    </form>
  );
}
