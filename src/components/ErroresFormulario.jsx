import React from 'react'

export default function ErroresFormulario({children}) {
  return (
    <div className='bg-red-200 text-red-600 font-medium text-center mb-2 p-2 rounded'>
        {children}
    </div>
  )
}
