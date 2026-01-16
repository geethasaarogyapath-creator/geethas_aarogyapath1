import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-blue-500 py-3 sm:py-4 md:py-5 flex justify-between items-center px-3 sm:px-5'>
      <b className='text-white text-sm sm:text-base md:text-lg'>Arogyapath</b>
      <img 
        className='h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full' 
        src="https://res.cloudinary.com/dgvzeqveu/image/upload/v1768581453/Screenshot_2026-01-15_215539_mzrgnb.png" 
        alt="profile" 
      />
    </div>
  )
}

export default Navbar
