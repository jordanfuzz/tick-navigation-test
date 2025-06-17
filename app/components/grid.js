'use client'

import React, { useEffect, useState, useRef } from 'react'

const emptyGrid = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]

const right = [0, 1]
const left = [0, -1]
const up = [-1, 0]
const down = [1, 0]

export default function Grid() {
  const [grid, setGrid] = useState(emptyGrid)
  const [playerLocation, setPlayerLocation] = useState([2, 2])
  const [path, setPath] = useState([])

  const pathRef = useRef(path)
  const playerLocationRef = useRef(playerLocation)

  useEffect(() => {
    playerLocationRef.current = playerLocation
  }, [playerLocation])

  useEffect(() => {
    pathRef.current = path
  }, [path])

  const addToPath = direction => {
    setPath(prevPath => {
      let newRow, newCol

      if (!prevPath.length) {
        const [row, col] = playerLocationRef.current
        newRow = row + direction[0]
        newCol = col + direction[1]
      } else {
        newRow = prevPath[prevPath.length - 1][0] + direction[0]
        newCol = prevPath[prevPath.length - 1][1] + direction[1]
      }
      // Ensure the new position is within bounds
      if (
        newRow < 0 ||
        newRow >= grid.length ||
        newCol < 0 ||
        newCol >= grid[0].length
      ) {
        return prevPath
      }

      // Check if the new position is already in the path
      if (prevPath.some(loc => loc[0] === newRow && loc[1] === newCol)) {
        return prevPath
      }

      return [...prevPath, [newRow, newCol]]
    })
  }
  const handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowRight':
        addToPath(right)
        break
      case 'ArrowLeft':
        addToPath(left)
        break
      case 'ArrowUp':
        addToPath(up)
        break
      case 'ArrowDown':
        addToPath(down)
        break
      case 'Enter':
        console.log('Path:', pathRef.current)
        console.log('Player Location:', playerLocation)
        break
      case 'Escape':
        setPath([])
        pathRef.current = []
        break
      default:
        break
    }
  }
  useEffect(() => {
    setGrid(emptyGrid)

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (pathRef.current.length === 0) return

      setPlayerLocation(pathRef.current[0])
      setPath(pathRef.current.slice(1))
      pathRef.current = pathRef.current.slice(1)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div className="inline-grid grid-cols-5">
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className="border p-4 h-20 w-20"
              style={{
                backgroundColor:
                  playerLocation[0] === rowIndex &&
                  playerLocation[1] === cellIndex
                    ? 'black'
                    : path.some(
                          loc => loc[0] === rowIndex && loc[1] === cellIndex
                        )
                      ? 'blue'
                      : 'lightgray',
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  )
}
