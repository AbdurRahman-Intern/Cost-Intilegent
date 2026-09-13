/**
 * ConfirmModal.jsx
 *
 * A specialized Modal for "are you sure?" moments (deleting an
 * ingredient, recipe, or menu item). Built ON TOP OF Modal.jsx rather
 * than duplicating overlay logic — this is composition in action:
 * Modal handles the chrome, ConfirmModal handles the specific content
 * and the two action buttons.
 */
import Modal from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal open={open} title={title} onClose={onCancel} size="sm">
      <p className="text-sm text-ink-700/80">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" loading={loading} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
