import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Home' },
  { to: '/wardrobe', label: 'Wardrobe' },
  { to: '/outfits', label: 'Outfits' },
  { to: '/returns', label: 'Returns' },
]

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 border-t border-line bg-paper">
      <ul className="mx-auto flex max-w-md">
        {tabs.map((tab) => (
          <li key={tab.to} className="flex-1">
            <NavLink
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1.5 py-3 text-[11px] tracking-[0.08em] uppercase transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-ink-faint'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {tab.label}
                  <span className={`h-px w-3 transition-colors duration-200 ${isActive ? 'bg-ink' : 'bg-transparent'}`} />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
