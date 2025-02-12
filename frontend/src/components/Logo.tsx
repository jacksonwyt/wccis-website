import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '../utils/routes';

const Logo = () => {
  return (
    <Link 
      href={ROUTES.HOME}
      className="block relative"
    >
      <div className="relative w-[150px] h-[70px]">
        <Image
          src="/images/logo.png"
          alt="WCCIS Logo"
          fill
          priority
          sizes="180px"
        />
      </div>
    </Link>
  );
};

export default Logo;