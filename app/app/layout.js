import './globals.css'
// import NavBar from '@/components/nav-bar'
// import { useRouter } from 'next/router'

export const metadata = {
  title: 'Tick Navigation',
  description: 'Live by the cube, die by the cube',
}

export default function RootLayout({ children }) {
  // const router = useRouter()
  // const isLandingPage = router.pathname === '/'

  return (
    <html lang="en">
      <body>
        {/* {!isLandingPage && <NavBar />} */}
        <div className="p-20">{children}</div>
      </body>
    </html>
  )
}
