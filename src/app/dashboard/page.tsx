import Navbar from "@/components/navbar/navbar.component";

export default function Page() {
  const nav_items: Array<string> = ['1', '2']
  return (
    <>
      <Navbar nav_items={nav_items} />
    </>
  )
}