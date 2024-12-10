import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <h1>Ticket Mangament System</h1>
        <Link to="/UserValues">
        <button>Start</button>
        </Link>
        

        <Link to="/Configuration">
        <button>Configure</button>
        </Link>
    </div>
  )
}
