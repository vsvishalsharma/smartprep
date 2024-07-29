import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
function Header() {
    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Image src={'./logo.svg'} width={30} height={30} alt="logo" />
            <ul className='flex gap-6'>
                <li className='hover:text-primary hover:text-blue-600 hover:font-bold transition-all'>Dashboard</li>
                <li className='hover:text-primary hover:text-blue-600 hover:font-bold transition-all'>Questions</li>
                < li className='hover:text-primary hover:text-blue-600 hover:font-bold transition-all'>Upgrade</li>
                <li className='hover:text-primary hover:text-blue-600 hover:font-bold transition-all'>How it Works?</li>
            </ul>
            <UserButton/>
        </div>
    )
}
export default Header