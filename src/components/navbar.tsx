import Link from "next/link";
import { MENUITEMS } from "@/data/consts"

export default function Navbar() {
  return (
    <div className="flex flex-col justify-start">
      <nav>
        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-2 items-center justify-center text-lg font-semibold">
          {MENUITEMS.map((item) => (
            <li key={item.title} className="p-2">
              <Link
                href={item.path}
                className="hover:underline hover:underline-offset-2"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
