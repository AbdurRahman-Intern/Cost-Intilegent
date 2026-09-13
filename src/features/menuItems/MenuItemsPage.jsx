/**
 * MenuItemsPage.jsx
 * List, search, add, edit, delete menu items. Uses the enriched
 * useMenuItemsWithCosts() hook so cost/profit/margin are always
 * up to date with the latest ingredient prices — change Chicken's price
 * on the Ingredients page and this table's numbers change too, because
 * they're calculated fresh from current data, never stored separately.
 */
import { useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader.jsx";
import SearchInput from "../../components/common/SearchInput.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/ui/Modal.jsx";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import MenuItemTable from "./components/MenuItemTable.jsx";
import MenuItemForm from "./components/MenuItemForm.jsx";
import { useMenuItemsWithCosts, useCreateMenuItem, useUpdateMenuItem, useDeleteMenuItem } from "./hooks/useMenuItems.js";

export default function MenuItemsPage() {
  const { menuItems, isLoading } = useMenuItemsWithCosts();
  const createMenuItem = useCreateMenuItem();
  const updateMenuItem = useUpdateMenuItem();
  const deleteMenuItem = useDeleteMenuItem();

  const [search, setSearch] = useState("");
  const [formModal, setFormModal] = useState({ open: false, item: null });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? menuItems.filter((i) => i.name.toLowerCase().includes(query)) : menuItems;
  }, [menuItems, search]);

  function handleSubmitForm(values) {
    if (formModal.item) {
      updateMenuItem.mutate(
        { id: formModal.item.id, data: values },
        { onSuccess: () => setFormModal({ open: false, item: null }) }
      );
    } else {
      createMenuItem.mutate(values, { onSuccess: () => setFormModal({ open: false, item: null }) });
    }
  }

  return (
    <div>
      <PageHeader
        title="Menu Items"
        description="Every item you sell, with its true cost and profit."
        actions={<Button onClick={() => setFormModal({ open: true, item: null })}>+ Add Menu Item</Button>}
      />

      <Card padded={false} className="overflow-hidden">
        <div className="border-b border-ink-900/8 p-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search menu items..." />
        </div>
        {isLoading ? (
          <LoadingSpinner label="Loading menu items..." />
        ) : (
          <MenuItemTable
            items={filteredItems}
            onEdit={(item) => setFormModal({ open: true, item })}
            onDelete={setDeleteTarget}
          />
        )}
      </Card>

      <Modal
        open={formModal.open}
        title={formModal.item ? "Edit Menu Item" : "Add Menu Item"}
        onClose={() => setFormModal({ open: false, item: null })}
      >
        <MenuItemForm
          initialValues={formModal.item}
          onSubmit={handleSubmitForm}
          onCancel={() => setFormModal({ open: false, item: null })}
          loading={createMenuItem.isPending || updateMenuItem.isPending}
        />
      </Modal>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete menu item?"
        message={`This will permanently remove "${deleteTarget?.name}".`}
        loading={deleteMenuItem.isPending}
        onConfirm={() => deleteMenuItem.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) })}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
