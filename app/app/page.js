import Image from 'next/image'
import Link from 'next/link'
import TickBox from '@/components/tick-box'
import Grid from '@/components/grid'
import planet from '@/media/planet.gif'

export default function Home() {
  return (
    <div className="text-center p-40">
      <main>
        {/* <TickBox /> */}
        <Grid />
      </main>
    </div>
  )
}
