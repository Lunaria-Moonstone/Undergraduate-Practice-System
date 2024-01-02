'use client'

import { ReactNode } from "react"

export default function Navbar(props: any) {
  const { nav_items }: { nav_items: Array<string> } = props
  const btns: ReactNode = <></>
  for (let item of nav_items) {
    
  }

  return (
    <>
      <div className="list-group">
        <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
          The current button
        </button>
        <button type="button" className="list-group-item list-group-item-action">A second button item</button>
        <button type="button" className="list-group-item list-group-item-action">A third button item</button>
        <button type="button" className="list-group-item list-group-item-action">A fourth button item</button>
      </div>
    </>
  )
}