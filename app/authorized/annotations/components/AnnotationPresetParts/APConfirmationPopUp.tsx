import React from 'react'

type Props = {
  message: string;
  modalId: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const APConfirmationPopUp = ({ message, modalId, onConfirm, onCancel }: Props) => {
  return (
    <dialog id={modalId} className="modal">
      <div className='flex flex-col gap-2 rounded-lg bg-gray-50 dark:bg-gray-700 p-3 items-center'>
        <div className='flex flex-row justify-center'>
          <div className='text-sm font-medium text-gray-800 dark:text-base-dark'>{message}</div>
        </div>
        <form method="dialog">
          <div className='flex flex-row flex-wrap gap-2 justify-end'>
            <button onClick={onCancel} className="btn btn-sm btn-outline btn-error font-sans">Cancel</button>
            <button onClick={onConfirm} className="btn btn-sm btn-outline font-sans">Confirm</button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default APConfirmationPopUp