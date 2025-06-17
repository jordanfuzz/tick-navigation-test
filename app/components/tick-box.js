'use client'

import React, { useEffect, useState } from 'react'

const colors = ['red', 'green']

export default function ColorChanger() {
  const [bgColor, setBgColor] = useState(colors[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor(prev => {
        const currentIndex = colors.indexOf(prev)
        const nextIndex = (currentIndex + 1) % colors.length
        return colors[nextIndex]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
        width: '100px',
        height: '100px',
      }}
    ></div>
  )
}
