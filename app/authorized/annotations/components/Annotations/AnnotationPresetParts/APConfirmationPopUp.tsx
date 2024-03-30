import React from 'react'

type Props = {
  presetId: string;
  modalId: string;
  onConfirm: (id: string) => void;
  onCancel: () => void;
};

const APConfirmationPopUp = ({ presetId, modalId, onConfirm, onCancel }: Props) => {
  return (
    <dialog id={modalId} className="modal">
      <div className='flex flex-col gap-2 rounded-lg bg-gray-50 p-3'>
        <div className='flex flex-row justify-center'>
          <div className='text-sm font-medium text-gray-900'>Confirm preset deletion:</div>
        </div>
        <form method="dialog">
          <div className='flex flex-row flex-wrap gap-2 justify-end'>
            <button onClick={onCancel} className="btn btn-sm btn-outline btn-error font-sans">Cancel</button>
            <button onClick={() => onConfirm(presetId)} className="btn btn-sm btn-outline font-sans">Confirm</button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default APConfirmationPopUp