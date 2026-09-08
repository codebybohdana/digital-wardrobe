interface PhotoPlaceholderProps {
  iconClassName?: string
}

export function PhotoPlaceholder({ iconClassName = 'h-10 w-10' }: PhotoPlaceholderProps) {
  return (
    <div className="flex h-full w-full items-center justify-center text-stone-300">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className={iconClassName}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3a2 2 0 0 1 2 2 5 5 0 0 1 5 5l2 7a1 1 0 0 1-1 1.3H4a1 1 0 0 1-1-1.3l2-7a5 5 0 0 1 5-5 2 2 0 0 1 2-2Z"
        />
      </svg>
    </div>
  )
}
