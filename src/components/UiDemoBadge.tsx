import { useState, useRef, useEffect } from 'react'

interface UiDemoBadgeProps {
  className?: string
  showExplanation?: boolean
}

export function UiDemoBadge({ className = '', showExplanation = true }: UiDemoBadgeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => {
          if (showExplanation) {
            setIsOpen((prev) => !prev)
          }
        }}
        className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide bg-[#6eafe9]/15 text-[#2463a8] hover:bg-[#6eafe9]/25 hover:text-[#1a4f8a] border border-[#6eafe9]/30 transition-all select-none shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6eafe9]"
        title="Interactive UI Demo (Click to learn more)"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ee6] animate-pulse" />
        <span>UI Demo</span>
      </button>

      {showExplanation && isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 sm:w-72 p-3.5 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4f8ee6]" />
            <h4 className="text-xs font-bold text-slate-800">
              Interactive UI Demo Mode
            </h4>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500 mb-2">
            DayBook is running in client-side preview mode. Entries, onboarding answers, goals, and reflections are saved securely in your browser local storage.
          </p>
          <div className="text-[10px] text-[#4f8ee6] font-medium bg-[#eef6fd] px-2.5 py-1.5 rounded-lg">
            No cloud account or backend server required.
          </div>
        </div>
      )}
    </div>
  )
}
