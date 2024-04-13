import React from 'react'

const Help = () => {
  return (

    <div >
      <div className='flex gap-2'>
      <div>Full Name</div>
      <input type="text" placeholder='Name' />
      </div>
      <div>
        <div>Email</div>
        <input type="text" placeholder='Email' />
      </div>
      <div>
        <div>Message</div>
        <input type="text" placeholder='Write' />
      </div>
    </div>
  )
}

export default Help