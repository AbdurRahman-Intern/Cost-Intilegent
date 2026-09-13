/**
 * RecipesPage.jsx
 * List, search, create, edit, and delete recipes. Structurally almost
 * identical to IngredientsPage.jsx — once you understand one feature's
 * page/hook/component split, the rest of the app follows the same
 * pattern. That consistency is a deliberate architecture choice.
 */
import { useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader.jsx";
import SearchInput from "../../components/common/SearchInput.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/ui/Modal.jsx";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import RecipeTable from "./components/RecipeTable.jsx";
import RecipeForm from "./components/RecipeForm.jsx";
import { useRecipes, useCreateRecipe, useUpdateRecipe, useDeleteRecipe } from "./hooks/useRecipes.js";
import { useIngredientsMap } from "../ingredients/hooks/useIngredients.js";

export default function RecipesPage() {
  const { data: recipes, isLoading } = useRecipes();
  const { ingredientsById } = useIngredientsMap();
  const createRecipe = useCreateRecipe();
  const updateRecipe = useUpdateRecipe();
  const deleteRecipe = useDeleteRecipe();

  const [search, setSearch] = useState("");
  const [formModal, setFormModal] = useState({ open: false, recipe: null });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    const query = search.trim().toLowerCase();
    return query ? recipes.filter((r) => r.name.toLowerCase().includes(query)) : recipes;
  }, [recipes, search]);

  function handleSubmitForm(values) {
    if (formModal.recipe) {
      updateRecipe.mutate(
        { id: formModal.recipe.id, data: values },
        { onSuccess: () => setFormModal({ open: false, recipe: null }) }
      );
    } else {
      createRecipe.mutate(values, { onSuccess: () => setFormModal({ open: false, recipe: null }) });
    }
  }

  return (
    <div>
      <PageHeader
        title="Recipes"
        description="Build recipes from ingredients to power menu item costing."
        actions={<Button onClick={() => setFormModal({ open: true, recipe: null })}>+ Create Recipe</Button>}
      />

      <Card padded={false} className="overflow-hidden">
        <div className="border-b border-ink-900/8 p-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search recipes..." />
        </div>
        {isLoading ? (
          <LoadingSpinner label="Loading recipes..." />
        ) : (
          <RecipeTable
            recipes={filteredRecipes}
            ingredientsById={ingredientsById}
            onEdit={(recipe) => setFormModal({ open: true, recipe })}
            onDelete={setDeleteTarget}
          />
        )}
      </Card>

      <Modal
        open={formModal.open}
        title={formModal.recipe ? "Edit Recipe" : "Create Recipe"}
        onClose={() => setFormModal({ open: false, recipe: null })}
        size="lg"
      >
        <RecipeForm
          initialValues={formModal.recipe}
          onSubmit={handleSubmitForm}
          onCancel={() => setFormModal({ open: false, recipe: null })}
          loading={createRecipe.isPending || updateRecipe.isPending}
        />
      </Modal>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete recipe?"
        message={`This will permanently remove "${deleteTarget?.name}".`}
        loading={deleteRecipe.isPending}
        onConfirm={() => deleteRecipe.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) })}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
