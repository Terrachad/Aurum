'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = ({user} : SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className='sidebar'>
      <nav className='flex flex-col gap-4'>
          <Link href='/' className='mb-12 cursor-pointer items-center gap-2'>
              <Image
                src='/icons/aurum-logo.svg'
                width={100}
                height={100}
                alt='Aurum Logo'
              />
          </Link>
          {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

          return (
            <Link href={item.route} key={item.label}
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
            >
              <div className="relative size-6">
                <Image 
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({
                    'brightness-[3] invert-0': isActive
                  })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          )
        })}

        user
      </nav>
      FOOTER
    </section>
  )
}

export default SideBar