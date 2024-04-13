import React from 'react'
import { Input } from '../input'

const Password = () => {
  return (
    <div>
      <div>
        <div>Old password</div>
        <Input/>
      </div>
      <div>
        <div>New password</div>
        <Input/>
      </div>
      <div className='h-8 w-16 bg-black text-white rounded-r-full rounded-l-full px-3 py-1 mt-4'>Save</div>
    </div>
  )
}

export default Password