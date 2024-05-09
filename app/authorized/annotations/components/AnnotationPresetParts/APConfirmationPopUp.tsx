import React from 'react';

type Props = {
  message: string;
  modalId: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const APConfirmationPopUp = ({
  message,
  modalId,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="flex flex-col items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
        <div className="flex flex-row justify-center">
          <div className="dark:text-base-dark text-sm font-medium text-gray-800">
            {message}
          </div>
        </div>
        <form method="dialog">
          <div className="flex flex-row flex-wrap justify-end gap-2">
            <button
              onClick={onCancel}
              className="btn btn-error btn-outline btn-sm font-sans"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="btn btn-outline btn-sm font-sans"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default APConfirmationPopUp;
