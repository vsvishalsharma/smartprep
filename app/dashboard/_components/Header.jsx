"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
function Header() {

    const path=usePathname()
    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <div>
            <Image src={'./logo.svg'} width={30} height={30} alt="logo" />
           </div>
            <ul className='hidden md:flex gap-6'>
                <li className={` hover:text-blue-600 hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-blue-600 font-bold'}`}>Dashboard</li>
                <li className={` hover:text-blue-600 hover:font-bold transition-all  cursor-pointer ${path=='/dashboard/question' && 'text-blue-600 font-bold'}`}>Questions</li>
                < li className={` hover:text-blue-600 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade' && 'text-blue-600 font-bold'}`}>Upgrade</li>
                <li className={` hover:text-blue-600 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/work' && 'text-blue-600 font-bold'}`}>How it Works?</li>
            </ul>
            <UserButton/>
        </div>
    )
}
export default Header