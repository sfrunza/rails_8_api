import { ModalKeys } from "@/slices/modal-slice";
import EditDepositModal from "./edit-deposit-modal";
import EditMoveSizeModal from "./edit-move-size-modal";
import EditPackingModal from "./edit-packing-modal";
import ExtraStopModal from "./extra-stop-modal";

export const modalsMap: { [key in ModalKeys]: React.FC<any> } = {
  editDeposit: EditDepositModal,
  editMoveSize: EditMoveSizeModal,
  editPacking: EditPackingModal,
  extraStop: ExtraStopModal,
  closeRequest: () => null,
};
