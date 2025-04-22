import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "../utils/routes";

const Logo = () => {
  return (
    <Link href={ROUTES.HOME} className="relative block w-[150px] h-[70px]">
      <Image
        src="/images/logo.png"
        alt="WCCIS Logo"
        fill
        style={{ objectFit: "contain" }}
        priority
        sizes="180px"
      />
    </Link>
  );
};

export default Logo;
