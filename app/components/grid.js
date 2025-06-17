'use client'

import React, { useEffect, useState, useRef } from 'react'

const emptyGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const right = [0, 1]
const left = [0, -1]
const up = [-1, 0]
const down = [1, 0]

export default function Grid() {
  const [grid, setGrid] = useState(emptyGrid)
  const [hasEnemy, setHasEnemy] = useState(true)
  const [playerLocation, setPlayerLocation] = useState([4, 4])
  const [enemyLocation, setEnemyLocation] = useState([0, 0])
  const [path, setPath] = useState([])
  const [speed, setSpeed] = useState(500)

  const pathRef = useRef(path)
  const playerLocationRef = useRef(playerLocation)
  const enemyLocationRef = useRef(enemyLocation)
  const hasEnemyRef = useRef(hasEnemy)
  const intervalRef = useRef(null)

  useEffect(() => {
    playerLocationRef.current = playerLocation
  }, [playerLocation])

  useEffect(() => {
    hasEnemyRef.current = hasEnemy
  }, [hasEnemy])

  useEffect(() => {
    enemyLocationRef.current = enemyLocation
  }, [enemyLocation])

  useEffect(() => {
    pathRef.current = path
  }, [path])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (hasEnemyRef.current) setEnemyLocation(getEnemyNextMove())
      if (pathRef.current.length === 0) return

      setPlayerLocation(pathRef.current[0])
      setPath(pathRef.current.slice(1))
      pathRef.current = pathRef.current.slice(1)
    }, speed)

    return () => clearInterval(intervalRef.current)
  }, [speed, hasEnemy])

  const getEnemyNextMove = () => {
    const [enemyRow, enemyCol] = enemyLocationRef.current
    const [playerRow, playerCol] = playerLocationRef.current

    let newRow = enemyRow
    let newCol = enemyCol

    const moveRowFirst = Math.random() > 0.5

    if (moveRowFirst) {
      if (enemyRow < playerRow - 1 && enemyRow + 1 < grid.length)
        return [newRow + 1, newCol]
      else if (enemyRow > playerRow + 1 && enemyRow - 1 >= 0)
        return [newRow - 1, newCol]

      if (enemyCol < playerCol - 1 && enemyCol + 1 < grid[0].length)
        return [newRow, newCol + 1]
      else if (enemyCol > playerCol + 1 && enemyCol - 1 >= 0)
        return [newRow, newCol - 1]
    } else {
      if (enemyCol < playerCol - 1 && enemyCol + 1 < grid[0].length)
        return [newRow, newCol + 1]
      else if (enemyCol > playerCol + 1 && enemyCol - 1 >= 0)
        return [newRow, newCol - 1]

      if (enemyRow < playerRow - 1 && enemyRow + 1 < grid.length)
        return [newRow + 1, newCol]
      else if (enemyRow > playerRow + 1 && enemyRow - 1 >= 0)
        return [newRow - 1, newCol]
    }

    return [newRow, newCol]
  }

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

  const handleToggleEnemy = checked => {
    if (checked) {
      setHasEnemy(true)
      setEnemyLocation([0, 0])
    } else {
      setHasEnemy(false)
      setEnemyLocation(null)
    }
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

  return (
    <div>
      <label className="inline-block mb-2">Tick Speed:</label>
      <select
        className="mb-4 block p-2 border rounded m-auto text-blue-600"
        value={speed}
        onChange={e => {
          setSpeed(Number(e.target.value))
          if (hasEnemy) setEnemyLocation([0, 0])
          e.target.blur()
        }}
      >
        <option value={100}>.1 seconds</option>
        <option value={200}>.2 seconds</option>
        <option value={500}>.5 seconds</option>
        <option value={1000}>1 second</option>
      </select>
      <div className="mb-4">
        <input
          type="checkbox"
          id="hasEnemy"
          checked={hasEnemy}
          onChange={e => handleToggleEnemy(e.target.checked)}
        />
        <label className="inline-block m-2">Enemy enabled</label>
      </div>
      <div className="inline-grid grid-cols-9">
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
                      : enemyLocation &&
                          enemyLocation[0] === rowIndex &&
                          enemyLocation &&
                          enemyLocation[1] === cellIndex
                        ? 'red'
                        : 'lightgray',
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  )
}
