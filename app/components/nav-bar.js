import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="absolute top-10 right-10 py-5 px-10 bg-primary rounded-md text-white">
      <ul className="flex space-x-10">
        <li>
          <Link href="/games" className="hover:text-success">
            Games
          </Link>
        </li>
        <li>
          <Link href="/games" className="hover:text-success">
            Challenge
          </Link>
        </li>
        <li>
          <Link href="/games" className="hover:text-success">
            Board
          </Link>
        </li>
        <li>
          <Link href="/games" className="hover:text-success">
            Lists
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-success">
            Reviews
          </Link>
        </li>
      </ul>
    </nav>
  )
}
