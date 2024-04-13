"use client";

import Image from "next/image";
import Link from "next/link";

const GlobalNav = () => (
  <div className="card bg-primary text-primary-content font-mono shadow-xl md:mx-5 md:mt-5 z-10">
    <div className="navbar">
      <div className="flex flex-row w-full justify-between">
        <Link className="btn btn-ghost normal-case text-lg" href="/">
          <Image src="/andamio.png" height={40} width={40} alt="andamio" />
          <p className="hidden md:block">Andamio</p>
        </Link>
        <ul className="menu menu-horizontal px-1">
          <li className="font-bold hidden md:block">
            <Link href={"/about"}>About</Link>
          </li>
          <li className="font-bold hidden md:block">
            <Link href={"/blog"}>Blog</Link>
          </li>
          <li className="font-bold hidden md:block">
            <Link href={"/calendar"}>Calendar</Link>
          </li>
          <li className="font-bold hidden md:block">
            <Link href={"/whitepaper"}>Whitepaper</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default GlobalNav;
