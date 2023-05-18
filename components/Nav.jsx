
import Image from "next/image"
import Link from "next/link"


function Nav() {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image src="images/logo.svg" width={30} height={30} alt="promptopia Logo" className="object-contain"  />
           
        </Link>
    </nav>
  )
}

export default Nav