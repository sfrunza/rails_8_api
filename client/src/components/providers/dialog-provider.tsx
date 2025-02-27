import { closeModal } from "@/slices/modal-slice";
import { useAppDispatch, useAppSelector } from "@/store";
import { modalsMap } from "@/components/modals/modals-map";
import { Dialog } from "../ui/dialog";

export default function DialogProvider() {
  const dispatch = useAppDispatch();
  const currentModal = useAppSelector((state) => state.modal.currentModal); // Allow passing additional props for modals

  const handleClose = () => {
    dispatch(closeModal());
  };

  // Retrieve the component from modalsMap
  const DialogComponent = currentModal ? modalsMap[currentModal] : null;

  return (
    <Dialog
      open={!!DialogComponent} // Open only if there's a valid modal
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose(); // Close modal when dialog is dismissed
      }}
    >
      {DialogComponent ? <DialogComponent onClose={handleClose} /> : null}
    </Dialog>
  );
}
