import { NavLink, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { GapAnalysisPage } from './pages/GapAnalysisPage'
import { HomePage } from './pages/HomePage'
import { LearningPlanPage } from './pages/LearningPlanPage'
import { ProfileSetupPage } from './pages/ProfileSetupPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { useLanguage, type Language } from './i18n/LanguageContext'

const navItems = [
  { to: '/', key: 'home' },
  { to: '/profile', key: 'profile' },
  { to: '/analysis', key: 'analysis' },
  { to: '/plan', key: 'plan' },
  { to: '/resources', key: 'resources' },
  { to: '/dashboard', key: 'dashboard' },
] as const

const languages: { value: Language; labelKey: 'english' | 'chinese' }[] = [
  { value: 'en', labelKey: 'english' },
  { value: 'zh', labelKey: 'chinese' },
]

function App() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <NavLink to="/" className="text-lg font-semibold text-slate-950">
            {t.appName}
          </NavLink>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <nav className="flex flex-wrap gap-2" aria-label={t.nav.primary}>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium transition ${
                      isActive ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    }`
                  }
                >
                  {t.nav[item.key]}
                </NavLink>
              ))}
            </nav>
            <div className="flex rounded-md border border-slate-300 bg-white p-1" aria-label={t.nav.language}>
              {languages.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setLanguage(item.value)}
                  className={`rounded px-3 py-1 text-sm font-semibold ${
                    language === item.value ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.nav[item.labelKey]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfileSetupPage />} />
          <Route path="/analysis" element={<GapAnalysisPage />} />
          <Route path="/plan" element={<LearningPlanPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
