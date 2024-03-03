import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Lilita_One } from "next/font/google";

const font = Lilita_One({ weight: "400", subsets: ["latin"] });

const NavBar = () => {
  return (
    <div className="sticky top-0 w-full bg-white/30 backdrop-blur-sm">
      <div className=" mx-auto max-w-5xl px-6">
        <div className="flex h-16 w-full items-center justify-between">
          <div className="flex items-baseline">
            <Link href="/" className="me-5">
              <div
                className={`${font.className} text-xl dark:text-amber-50 lg:text-3xl`}
              >
                Tekuno<span className="text-purple-500">Burogu</span>
              </div>
            </Link>
            <Link href="/tags">
              <div
                className={`${font.className} text-base dark:text-amber-50 lg:text-xl`}
              >
                #Tags
              </div>
            </Link>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
