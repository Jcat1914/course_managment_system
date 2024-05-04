import React from 'react'

export const CloseModalButton = ({ closeModal }) => {
  return (
    <button
      onClick={closeModal}
      type="submit"
      className=" ml-4 rounded-md bg-gray-600 px-2 py-2 text-white opacity-25 hover:bg-gray-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="15"
        width="15"
        viewBox="0 0 384 512"
      >
        <path
          fill="#ffffff"
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </button>
  )
}

