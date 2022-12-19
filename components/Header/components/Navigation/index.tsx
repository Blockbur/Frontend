import Link from 'next/link'

export function Navigation() {
  const navigationItems = [
    { name: 'HOME', href: '/' },
    { name: 'MINT', href: '/mint' },
    { name: 'JOIN US', href: '/mint' },
  ]

  return (
    <ul className="flex items-center gap-11 text-lg font-semibold">
      {navigationItems.map((navItem) => {
        const isMintItem = navItem.name.includes('MINT')

        return (
          <li
            key={navItem.name}
            className={
              isMintItem
                ? `bg-clip-text bg-purple-gradient text-transparent`
                : `text-white`
            }
          >
            <Link href={navItem.href}>{navItem.name}</Link>
          </li>
        )
      })}
    </ul>
  )
}
