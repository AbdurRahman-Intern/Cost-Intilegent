/**
 * IngredientsPage.jsx
 *
 * PURPOSE:
 * List, search, add, edit, and delete ingredients.
 *
 * DATA FLOW:
 *   useIngredients() (React Query)
 *          ↓
 *   IngredientsPage (owns search text + which modal is open)
 *          ↓
 *   IngredientTable / IngredientForm / ConfirmModal
 *
 * WHY useMemo FOR FILTERING:
 * We recompute the filtered list only when `ingredients` or `search`
 * actually change, not on every render (e.g. not when an unrelated
 * modal's internal state changes). For a list this small it's a minor
 * optimization, but it's the correct habit for lists that could grow
 * to hundreds of rows.
 */
import { useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader.jsx";
import SearchInput from "../../components/common/SearchInput.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/ui/Modal.jsx";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import IngredientTable from "./components/IngredientTable.jsx";
import IngredientForm from "./components/IngredientForm.jsx";
import {
  useIngredients,
  useCreateIngredient,
  useUpdateIngredient,
  useDeleteIngredient,
} from "./hooks/useIngredients.js";

export default function IngredientsPage() {
  const { data: ingredients, isLoading, isError, refetch } = useIngredients();
  const createIngredient = useCreateIngredient();
  const updateIngredient = useUpdateIngredient();
  const deleteIngredient = useDeleteIngredient();

  const [search, setSearch] = useState("");
  const [formModal, setFormModal] = useState({ open: false, ingredient: null });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredIngredients = useMemo(() => {
    if (!ingredients) return [];
    const query = search.trim().toLowerCase();
    if (!query) return ingredients;
    return ingredients.filter(
      (i) => i.name.toLowerCase().includes(query) || i.supplier.toLowerCase().includes(query)
    );
  }, [ingredients, search]);

  function handleSubmitForm(values) {
    if (formModal.ingredient) {
      updateIngredient.mutate(
        { id: formModal.ingredient.id, data: values },
        { onSuccess: () => setFormModal({ open: false, ingredient: null }) }
      );
    } else {
      createIngredient.mutate(values, {
        onSuccess: () => setFormModal({ open: false, ingredient: null }),
      });
    }
  }

  function handleConfirmDelete() {
    deleteIngredient.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  }

  return (
    <div>
      <PageHeader
        title="Ingredients"
        description="The raw materials behind every recipe and menu item."
        actions={<Button onClick={() => setFormModal({ open: true, ingredient: null })}>+ Add Ingredient</Button>}
      />

      <Card padded={false} className="overflow-hidden">
        <div className="border-b border-ink-900/8 p-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name or supplier..." />
        </div>

        {isLoading && <LoadingSpinner label="Loading ingredients..." />}

        {isError && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm text-loss-500">Something went wrong. Please try again.</p>
            <Button variant="secondary" onClick={() => refetch()}>Retry</Button>
          </div>
        )}

        {!isLoading && !isError && (
          <IngredientTable
            ingredients={filteredIngredients}
            onEdit={(ingredient) => setFormModal({ open: true, ingredient })}
            onDelete={setDeleteTarget}
          />
        )}
      </Card>

      <Modal
        open={formModal.open}
        title={formModal.ingredient ? "Edit Ingredient" : "Add Ingredient"}
        onClose={() => setFormModal({ open: false, ingredient: null })}
      >
        <IngredientForm
          initialValues={formModal.ingredient}
          onSubmit={handleSubmitForm}
          onCancel={() => setFormModal({ open: false, ingredient: null })}
          loading={createIngredient.isPending || updateIngredient.isPending}
        />
      </Modal>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete ingredient?"
        message={`This will permanently remove "${deleteTarget?.name}". This cannot be undone.`}
        loading={deleteIngredient.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
