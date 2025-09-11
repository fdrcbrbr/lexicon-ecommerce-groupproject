import Link from "next/link";
import { MENUITEMS } from "@/data/consts";
export default function Footer() {
  return (
    <>
      <footer className="min-h-30 bg-gray-200 ">
        <section className=" flex flex-col text-center mt-8">
          <Link href="/">
            <h2 className="text-black font-extrabold hover:text-gray-700 text-4xl mt-8">
              SHOP.CO
            </h2>
          </Link>
          <p className="text-gray-600 text-balance mt-4">
            We have clothes that suits your style and wich you're proud to wear.
            From women to men.
          </p>
        </section>
        <section className="flex justify-center gap-4 mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="black"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="border-1  border-black rounded-full px-2 bg-neutral-50 hover:bg-neutral-200"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="white"
            stroke="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="border-1 border-black rounded-full px-2 bg-black hover:bg-neutral-200 hover:fill-black "
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="border-1  border-black rounded-full px-2 bg-neutral-50 hover:bg-neutral-200"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </section>
        <ul className="gap-7 flex-wrap hidden md:flex place-content-center text-black mt-2">
          {MENUITEMS.map((link, index) => (
            <li
              className="p-2 font-bold hover:text-gray-700 hover:underline"
              key={index}
            >
              <Link href={link.path}>{link.title.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
        <div className="bg-gray-600 mt-4 hidden md:flex h-2 w-svh justify-self-center shadow-xl shadow-black/50"></div>
        <p className="text-center text-gray-600 mt-4">
          Shop.co 2000-2025, All Rights Reserved
        </p>
      </footer>
    </>
  );
}
