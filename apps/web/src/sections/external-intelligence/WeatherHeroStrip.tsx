import { useState, useEffect } from 'react'
import { Sun, CloudSun, Cloud, CloudRain, CloudLightning, Snowflake, Sparkles } from 'lucide-react'
import type { WeatherDay } from '@/interface'
import { externalWeatherDays } from '@/mocks'

// ── These are the ONLY permitted hard-coded hex values in this file ──────────
// They represent weather condition atmospheres, not UI tokens.
const WEATHER_GRADIENTS = {
  light: {
    sunny: 'linear-gradient(135deg, #DBEAFE 0%, #FEF9C3 50%, #E0E7FF 100%)',
    cloudy: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 50%, #E8EDF2 100%)',
    rainy: 'linear-gradient(135deg, #BFDBFE 0%, #C7D2FE 50%, #A5B4FC 100%)',
    stormy: 'linear-gradient(135deg, #94A3B8 0%, #64748B 50%, #475569 100%)',
    snowy: 'linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 50%, #EFF6FF 100%)',
  },
  dark: {
    sunny: 'linear-gradient(135deg, #1E3A5F 0%, #2D3561 50%, #1A2744 100%)',
    cloudy: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #1E293B 100%)',
    rainy: 'linear-gradient(135deg, #1E3A5F 0%, #1E2D5A 50%, #1A1F3D 100%)',
    stormy: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
    snowy: 'linear-gradient(135deg, #1E3A5F 0%, #1E3463 50%, #1E2D5A 100%)',
  },
} as const
// ─────────────────────────────────────────────────────────────────────────────

type WeatherCondition = keyof typeof WEATHER_GRADIENTS.light

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_COMPONENTS: Record<string, React.ComponentType<any>> = {
  '☀️': Sun,
  '⛅': CloudSun,
  '🌤️': CloudSun,
  '☁️': Cloud,
  '🌧️': CloudRain,
  '⛈️': CloudLightning,
  '❄️': Snowflake,
  '🌨️': Snowflake,
}

const ICON_COLORS: Record<string, string> = {
  '☀️': 'var(--status-warning)',
  '⛅': 'var(--text-secondary)',
  '🌤️': 'var(--text-secondary)',
  '☁️': 'var(--text-muted)',
  '🌧️': 'var(--accent-cool)',
  '⛈️': 'var(--text-muted)',
  '❄️': 'var(--accent-cool)',
  '🌨️': 'var(--accent-cool)',
}

function getConditionKey(icon: string): WeatherCondition {
  if (icon === '☀️') return 'sunny'
  if (icon === '⛅' || icon === '🌤️' || icon === '☁️') return 'cloudy'
  if (icon === '🌧️') return 'rainy'
  if (icon === '⛈️') return 'stormy'
  if (icon === '❄️' || icon === '🌨️') return 'snowy'
  return 'sunny'
}

function WeatherDayCard({ day, isToday }: { day: WeatherDay; isToday?: boolean }) {
  const IconComponent = ICON_COMPONENTS[day.icon] ?? Sun
  const iconColor = ICON_COLORS[day.icon] ?? 'var(--status-warning)'

  return (
    <div
      className="flex flex-col items-center justify-center px-2 py-1.5 rounded-lg flex-1 min-w-0"
      style={{
        background: isToday ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.28)',
        border: `1px solid ${isToday ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.45)'}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <span
        className="text-[10px] font-bold uppercase tracking-wide"
        style={{ color: isToday ? 'var(--accent-cool)' : 'var(--text-secondary)' }}
      >
        {day.day}
      </span>
      <IconComponent size={17} style={{ color: iconColor, opacity: 0.85, marginTop: 3 }} />
      <span
        className="text-sm font-semibold tabular-nums mt-1"
        style={{ color: 'var(--text-primary)' }}
      >
        {day.high}°
      </span>
      <span className="text-[10px] tabular-nums" style={{ color: 'var(--text-muted)' }}>
        {day.low}°
      </span>
    </div>
  )
}

const AI_ALERT =
  'Rain forecast Sat–Sun. Recommend promoting indoor packages and spa offers to drive bookings.'

export function WeatherHeroStrip() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  const today = externalWeatherDays[0]
  const condition = getConditionKey(today.icon)
  const gradient = WEATHER_GRADIENTS[isDark ? 'dark' : 'light'][condition]
  const TodayIcon = ICON_COMPONENTS[today.icon] ?? Sun
  const conditionLabel = condition.charAt(0).toUpperCase() + condition.slice(1)

  return (
    <div
      className="shrink-0 rounded-xl overflow-hidden"
      style={{ height: 136, background: gradient }}
    >
      <div className="flex flex-col h-full">
        {/* Main content row */}
        <div className="flex flex-1 min-h-0 items-stretch px-6 pt-4 pb-2 gap-5 overflow-hidden">
          {/* LEFT — Current conditions */}
          <div className="flex flex-col justify-center w-[200px] shrink-0">
            <div className="flex items-end gap-2">
              <span
                className="font-semibold tabular-nums leading-none"
                style={{
                  fontSize: '2.75rem',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                }}
              >
                {today.high}°C
              </span>
              <TodayIcon
                size={24}
                style={{
                  color: ICON_COLORS[today.icon] ?? 'var(--status-warning)',
                  opacity: 0.85,
                  marginBottom: 4,
                }}
              />
            </div>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Today · {conditionLabel} · City Center
            </p>
            <span
              className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide w-fit"
              style={{
                background: 'rgba(255,255,255,0.40)',
                color: 'var(--text-primary)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--status-success)' }}
              />
              Good for Travel
            </span>
          </div>

          {/* Divider */}
          <div
            className="w-px self-stretch my-1 shrink-0"
            style={{ background: 'rgba(0,0,0,0.08)' }}
          />

          {/* RIGHT — 7-day forecast cards */}
          <div className="flex items-stretch gap-1.5 flex-1 overflow-hidden min-w-0">
            {externalWeatherDays.map((day, idx) => (
              <WeatherDayCard key={day.day} day={day} isToday={idx === 0} />
            ))}
          </div>
        </div>

        {/* AI alert footer strip */}
        <div
          className="px-6 py-1.5 flex items-center gap-2"
          style={{
            borderTop: '1px solid rgba(0,0,0,0.06)',
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Sparkles size={12} style={{ color: 'var(--accent-violet)' }} />
          <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              AI Weather Alert:
            </span>{' '}
            {AI_ALERT}
          </p>
        </div>
      </div>
    </div>
  )
}
