export interface LocalUser {
  id: string
  displayName: string
  createdAt: string
  updatedAt: string
  lastActiveAt: string
}

export interface CreateUserInput {
  displayName: string
}

export interface UserProfile {
  id: string
  userId: string
  age: number | null
  occupation: string | null
  bio: string | null
  currentFocus: string | null
  idealDay: string | null
  reflectionStyle: string | null
  motivators: string | null
  knownStruggles: string | null
  thingsToAvoidAssuming: string | null
  onboardingCompleted: boolean
  onboardingVersion: number
  createdAt: string
  updatedAt: string
}

export interface UpdateUserProfileInput {
  age?: number | null
  occupation?: string | null
  bio?: string | null
  currentFocus?: string | null
  idealDay?: string | null
  reflectionStyle?: string | null
  motivators?: string | null
  knownStruggles?: string | null
  thingsToAvoidAssuming?: string | null
  onboardingCompleted?: boolean
}

export interface Journal {
  id: string
  entryDate: string
  content: string
  topic: string | null
  mood: string | null
  weather: string | null
  locationText: string | null
  createdAt: string
  updatedAt: string
}

export interface SaveJournalInput {
  content: string
  topic?: string | null
  mood?: string | null
  weather?: string | null
  locationText?: string | null
}

export interface JournalGoal {
  id: string
  text: string
  completed: boolean
  completedAt: string | null
  position: number
  createdAt: string
  journalEntryId: string
}

export interface GetJournalGoalsResponse {
  goals: JournalGoal[]
}

export interface CreateJournalGoalInput {
  text: string
  position?: number
}

export interface UpdateJournalGoalInput {
  completed: boolean
}

export interface PreviousJournalGoalsResponse {
  entryDate: string | null
  goals: JournalGoal[]
}

export interface StreakResponse {
  currentStreak: number
}

export interface AiEvidence {
  date: string
  excerpt: string
}

export interface AiObservation {
  title: string
  detail: string
  evidence: AiEvidence[]
}

export type ReflectionIntent =
  | 'RECURRING_PATTERNS'
  | 'MOOD_EMOTIONAL'
  | 'STRUGGLES'
  | 'WINS_PROGRESS'
  | 'GOALS'
  | 'HABITS_ROUTINES'
  | 'CHANGE_OVER_TIME'
  | 'SELF_UNDERSTANDING'
  | 'GENERAL_REFLECTION'

export interface AiReflection {
  intent: ReflectionIntent
  summary: string
  observations: AiObservation[]
  encouragement: string
  nextStep: string
}

export type AiQueryType =
  | 'previous_goals'
  | 'current_goals'
  | 'goal_progress'
  | 'current_streak'
  | 'journal_count'
  | 'recent_journal'
  | 'reflection'
  | 'daily_quote'
  | 'unsupported'

export interface AiQueryGoal {
  text: string
  completed: boolean
}

export interface AiQueryAnswerMap {
  previous_goals: { date: string | null; goals: AiQueryGoal[] }
  current_goals: { date: string; goals: AiQueryGoal[] }
  goal_progress: {
    goalCount: number
    completedGoalCount: number
    completionRate: number
    from: string | null
    to: string | null
  }
  current_streak: { currentStreak: number }
  journal_count: { journalEntryCount: number; from: string | null; to: string | null }
  recent_journal: { date: string; found: boolean; content: string | null }
  reflection: AiReflection
  daily_quote: {
    quote: { id: string; title: string; text: string; author: string; kind: 'curated' } | null
    saved: boolean
  }
  unsupported: { reason: string }
}

export type AiQueryResponse<T extends AiQueryType = AiQueryType> = {
  [K in AiQueryType]: {
    type: K
    answer: AiQueryAnswerMap[K]
    displayText: string
  }
}[T]

export interface DailyQuote {
  id: string
  title: string
  text: string
  author: string
  kind: 'curated'
}

export interface DailyQuoteResponse {
  date: string
  quote: DailyQuote
  saved: boolean
}

export interface SavedQuote {
  id: string
  text: string
  title: string
  author: string
  likedAt: string
}

export type JournalObservationType =
  | 'behavior'
  | 'emotion'
  | 'goal'
  | 'habit'
  | 'win'
  | 'struggle'
  | 'context'

export interface JournalObservation {
  id: string
  type: JournalObservationType
  content: string
  confidence: number | null
  createdAt: string
}

export interface AiKnowledge {
  profileFacts: string[]
  memories: { type: string; content: string }[]
  observations: { date: string; type: string; content: string }[]
  stillLearning: string[]
}

export type MemoryType = 'preference' | 'habit' | 'goal' | 'struggle' | 'routine' | 'context'

export interface MemoryEvidence {
  date: string
  observation: string
}

export interface MemorySuggestion {
  type: MemoryType
  content: string
  confidence: number
  evidence: MemoryEvidence[]
}

export interface StoredMemory {
  id: string
  type: string
  content: string
  status: string
  confidence: number | null
  sourceJournalId: string | null
  createdAt: string
  updatedAt: string
}

export interface JournalMedia {
  id: string
  mediaType: string
  url: string
  createdAt: string
}

const CURATED_QUOTES = [
  {
    id: 'frost-servant-to-servants',
    title: 'The Only Way Out',
    text: 'The only way out is through.',
    author: 'Robert Frost',
  },
  {
    id: 'dillard-writing-life',
    title: 'How We Spend Our Days',
    text: 'How we spend our days is, of course, how we spend our lives.',
    author: 'Annie Dillard',
  },
  {
    id: 'oliver-upstream',
    title: 'Attention',
    text: 'Attention is the beginning of devotion.',
    author: 'Mary Oliver',
  },
  {
    id: 'radmacher-courage',
    title: 'Courage',
    text: "Courage doesn't always roar.",
    author: 'Mary Anne Radmacher',
  },
  {
    id: 'proverb-second-best-time',
    title: 'The Second Best Time',
    text: 'The best time to plant a tree was twenty years ago. The second best time is now.',
    author: 'Chinese proverb',
  },
  {
    id: 'goethe-this-day',
    title: 'This Day',
    text: 'Nothing is worth more than this day.',
    author: 'Johann Wolfgang von Goethe',
  },
  {
    id: 'seneca-shortness-of-life',
    title: 'On Time',
    text: 'It is not that we have a short time to live, but that we waste much of it.',
    author: 'Seneca',
  },
]

type BackendStatus = 'unknown' | 'online' | 'offline'

let backendAvailability: BackendStatus = 'unknown'

function isJsonResponse(res: Response): boolean {
  const contentType = res.headers.get('content-type')
  return Boolean(contentType && contentType.includes('application/json'))
}

async function tryBackend<T>(
  apiCall: () => Promise<T>,
  fallback: () => Promise<T> | T,
): Promise<T> {
  const currentStatus: BackendStatus = backendAvailability
  if (currentStatus === 'offline') {
    return fallback()
  }

  try {
    const result = await apiCall()
    backendAvailability = 'online'
    return result
  } catch (err) {
    if (err instanceof Error && err.message === 'BACKEND_UNAVAILABLE') {
      return fallback()
    }
    const updatedStatus: BackendStatus = backendAvailability
    if (updatedStatus === 'offline') {
      return fallback()
    }
    throw err
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(path, init)
  } catch {
    backendAvailability = 'offline'
    throw new Error('BACKEND_UNAVAILABLE')
  }

  if (!isJsonResponse(res)) {
    backendAvailability = 'offline'
    throw new Error('BACKEND_UNAVAILABLE')
  }

  backendAvailability = 'online'

  if (!res.ok) {
    if (res.status >= 500) {
      backendAvailability = 'offline'
      throw new Error('BACKEND_UNAVAILABLE')
    }
    let detail = ''
    try {
      const body = (await res.json()) as { error?: unknown }
      if (typeof body?.error === 'string') detail = body.error
    } catch (e) {
      void e
    }
    throw new Error(detail || `DayBook API request failed: ${res.status} ${res.statusText}`)
  }

  return (await res.json()) as T
}

function toDayIndex(value: string): number {
  const [y, m, d] = value.split('-').map(Number)
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000)
}

function toLocalDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function localCreateUser(input: CreateUserInput): LocalUser {
  const now = new Date().toISOString()
  const rawUsers = typeof window !== 'undefined' ? localStorage.getItem('daybook_users') : null
  let userList: LocalUser[] = []
  if (rawUsers) {
    try {
      userList = JSON.parse(rawUsers)
    } catch {
      userList = []
    }
  }

  const trimmed = input.displayName.trim()
  const existing = userList.find((u) => u.displayName.toLowerCase() === trimmed.toLowerCase())
  if (existing) {
    existing.lastActiveAt = now
    existing.updatedAt = now
    localStorage.setItem('daybook_user', JSON.stringify(existing))
    localStorage.setItem('daybook_users', JSON.stringify(userList))
    return existing
  }

  const newUser: LocalUser = {
    id: 'usr_' + Math.random().toString(36).substring(2, 11),
    displayName: trimmed,
    createdAt: now,
    updatedAt: now,
    lastActiveAt: now,
  }

  userList.push(newUser)
  localStorage.setItem('daybook_users', JSON.stringify(userList))
  localStorage.setItem('daybook_user', JSON.stringify(newUser))

  const existingProfileRaw = localStorage.getItem('daybook_profile')
  if (!existingProfileRaw) {
    const profile: UserProfile = {
      id: 'prf_' + Math.random().toString(36).substring(2, 11),
      userId: newUser.id,
      age: null,
      occupation: null,
      bio: null,
      currentFocus: null,
      idealDay: null,
      reflectionStyle: 'Balanced',
      motivators: null,
      knownStruggles: null,
      thingsToAvoidAssuming: null,
      onboardingCompleted: false,
      onboardingVersion: 1,
      createdAt: now,
      updatedAt: now,
    }
    localStorage.setItem('daybook_profile', JSON.stringify(profile))
  }

  return newUser
}

function localGetCurrentUser(): LocalUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('daybook_user')
    return raw ? (JSON.parse(raw) as LocalUser) : null
  } catch {
    return null
  }
}

function localGetCurrentProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('daybook_profile')
    return raw ? (JSON.parse(raw) as UserProfile) : null
  } catch {
    return null
  }
}

function localUpdateCurrentProfile(input: UpdateUserProfileInput): UserProfile {
  let profile = localGetCurrentProfile()
  const now = new Date().toISOString()
  if (!profile) {
    const user = localGetCurrentUser()
    profile = {
      id: 'prf_' + Math.random().toString(36).substring(2, 11),
      userId: user?.id || 'usr_local',
      age: null,
      occupation: null,
      bio: null,
      currentFocus: null,
      idealDay: null,
      reflectionStyle: 'Balanced',
      motivators: null,
      knownStruggles: null,
      thingsToAvoidAssuming: null,
      onboardingCompleted: false,
      onboardingVersion: 1,
      createdAt: now,
      updatedAt: now,
    }
  }

  const updated: UserProfile = {
    ...profile,
    age: input.age !== undefined ? input.age : profile.age,
    occupation: input.occupation !== undefined ? input.occupation : profile.occupation,
    bio: input.bio !== undefined ? input.bio : profile.bio,
    currentFocus: input.currentFocus !== undefined ? input.currentFocus : profile.currentFocus,
    idealDay: input.idealDay !== undefined ? input.idealDay : profile.idealDay,
    reflectionStyle: input.reflectionStyle !== undefined ? input.reflectionStyle : profile.reflectionStyle,
    motivators: input.motivators !== undefined ? input.motivators : profile.motivators,
    knownStruggles: input.knownStruggles !== undefined ? input.knownStruggles : profile.knownStruggles,
    thingsToAvoidAssuming: input.thingsToAvoidAssuming !== undefined ? input.thingsToAvoidAssuming : profile.thingsToAvoidAssuming,
    onboardingCompleted: input.onboardingCompleted !== undefined ? input.onboardingCompleted : profile.onboardingCompleted,
    updatedAt: now,
  }

  localStorage.setItem('daybook_profile', JSON.stringify(updated))
  return updated
}

function localGetJournal(entryDate: string): Journal | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(`daybook_journal_${entryDate}`)
    return raw ? (JSON.parse(raw) as Journal) : null
  } catch {
    return null
  }
}

function localSaveJournal(entryDate: string, input: SaveJournalInput): Journal {
  const existing = localGetJournal(entryDate)
  const now = new Date().toISOString()
  const journal: Journal = {
    id: existing?.id || 'jrn_' + Math.random().toString(36).substring(2, 11),
    entryDate,
    content: input.content,
    topic: input.topic !== undefined ? input.topic : (existing?.topic ?? null),
    mood: input.mood !== undefined ? input.mood : (existing?.mood ?? null),
    weather: input.weather !== undefined ? input.weather : (existing?.weather ?? null),
    locationText: input.locationText !== undefined ? input.locationText : (existing?.locationText ?? null),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  }

  localStorage.setItem(`daybook_journal_${entryDate}`, JSON.stringify(journal))
  return journal
}

function localDeleteJournal(entryDate: string): { deleted: boolean } {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`daybook_journal_${entryDate}`)
    localStorage.removeItem(`daybook_goals_${entryDate}`)
    localStorage.removeItem(`daybook_observations_${entryDate}`)
    localStorage.removeItem(`daybook_media_${entryDate}`)
  }
  return { deleted: true }
}

function localGetJournalGoals(entryDate: string): GetJournalGoalsResponse {
  if (typeof window === 'undefined') return { goals: [] }
  try {
    const raw = localStorage.getItem(`daybook_goals_${entryDate}`)
    const goals = raw ? (JSON.parse(raw) as JournalGoal[]) : []
    return { goals }
  } catch {
    return { goals: [] }
  }
}

function localCreateJournalGoal(entryDate: string, input: CreateJournalGoalInput): JournalGoal {
  const resp = localGetJournalGoals(entryDate)
  const now = new Date().toISOString()
  const goal: JournalGoal = {
    id: 'gol_' + Math.random().toString(36).substring(2, 11),
    text: input.text.trim(),
    completed: false,
    completedAt: null,
    position: input.position !== undefined ? input.position : resp.goals.length,
    createdAt: now,
    journalEntryId: entryDate,
  }
  resp.goals.push(goal)
  localStorage.setItem(`daybook_goals_${entryDate}`, JSON.stringify(resp.goals))
  return goal
}

function localUpdateJournalGoal(
  entryDate: string,
  goalId: string,
  input: UpdateJournalGoalInput,
): JournalGoal {
  const resp = localGetJournalGoals(entryDate)
  const item = resp.goals.find((g) => g.id === goalId)
  if (!item) {
    throw new Error('Goal not found')
  }
  item.completed = input.completed
  item.completedAt = input.completed ? new Date().toISOString() : null
  localStorage.setItem(`daybook_goals_${entryDate}`, JSON.stringify(resp.goals))
  return item
}

function localDeleteJournalGoal(entryDate: string, goalId: string): { deleted: boolean } {
  const resp = localGetJournalGoals(entryDate)
  const filtered = resp.goals.filter((g) => g.id !== goalId)
  localStorage.setItem(`daybook_goals_${entryDate}`, JSON.stringify(filtered))
  return { deleted: true }
}

function localGetPreviousJournalGoals(entryDate: string): PreviousJournalGoalsResponse {
  const dates: string[] = []
  if (typeof window !== 'undefined') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('daybook_goals_')) {
        const d = key.slice('daybook_goals_'.length)
        if (/^\d{4}-\d{2}-\d{2}$/.test(d) && d < entryDate) {
          dates.push(d)
        }
      }
    }
  }
  dates.sort().reverse()
  for (const prevDate of dates) {
    const goalsResp = localGetJournalGoals(prevDate)
    if (goalsResp.goals.length > 0) {
      return {
        entryDate: prevDate,
        goals: goalsResp.goals,
      }
    }
  }
  return {
    entryDate: null,
    goals: [],
  }
}

function localGetAllJournalDates(): string[] {
  const dates: string[] = []
  if (typeof window === 'undefined') return dates
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('daybook_journal_') && !key.startsWith('daybook_journal_text_style')) {
      const datePart = key.slice('daybook_journal_'.length)
      if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
        dates.push(datePart)
      }
    }
  }
  dates.sort()
  return dates
}

function localGetJournalDates(from: string, to: string): string[] {
  return localGetAllJournalDates().filter((d) => d >= from && d <= to)
}

function localGetCurrentStreak(): StreakResponse {
  const dates = localGetAllJournalDates()
  const todayKey = toLocalDateKey(new Date())
  const today = toDayIndex(todayKey)
  const days = new Set<number>()
  for (const d of dates) {
    const idx = toDayIndex(d)
    if (idx <= today) {
      days.add(idx)
    }
  }
  if (!days.has(today)) {
    return { currentStreak: 0 }
  }
  let streak = 0
  let cursor = today
  while (days.has(cursor)) {
    streak++
    cursor--
  }
  return { currentStreak: streak }
}

function localGetSavedQuotes(): SavedQuote[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('daybook_saved_quotes')
    return raw ? (JSON.parse(raw) as SavedQuote[]) : []
  } catch {
    return []
  }
}

function localGetDailyQuote(date?: string): DailyQuoteResponse {
  const dateKey = date || toLocalDateKey(new Date())
  const size = CURATED_QUOTES.length
  const index = ((toDayIndex(dateKey) % size) + size) % size
  const q = CURATED_QUOTES[index]
  const savedList = localGetSavedQuotes()
  const isSaved = savedList.some((sq) => sq.id === q.id || sq.text === q.text)
  return {
    date: dateKey,
    quote: {
      id: q.id,
      title: q.title,
      text: q.text,
      author: q.author,
      kind: 'curated',
    },
    saved: isSaved,
  }
}

function localSaveQuote(quoteId: string): { saved: boolean } {
  const savedList = localGetSavedQuotes()
  const q = CURATED_QUOTES.find((item) => item.id === quoteId || quoteId.endsWith(item.id))
  if (q && !savedList.some((sq) => sq.id === q.id || sq.text === q.text)) {
    const item: SavedQuote = {
      id: q.id,
      text: q.text,
      title: q.title,
      author: q.author,
      likedAt: new Date().toISOString(),
    }
    savedList.unshift(item)
    localStorage.setItem('daybook_saved_quotes', JSON.stringify(savedList))
  }
  return { saved: true }
}

function localUnsaveQuote(quoteId: string): { saved: boolean } {
  let savedList = localGetSavedQuotes()
  savedList = savedList.filter((sq) => sq.id !== quoteId && !quoteId.endsWith(sq.id) && !sq.id.endsWith(quoteId))
  localStorage.setItem('daybook_saved_quotes', JSON.stringify(savedList))
  return { saved: false }
}

function localGenerateJournalObservations(entryDate: string): JournalObservation[] {
  const journal = localGetJournal(entryDate)
  const observations: JournalObservation[] = []
  const now = new Date().toISOString()
  if (!journal || !journal.content.trim()) {
    observations.push({
      id: 'obs_' + Math.random().toString(36).substring(2, 9),
      type: 'context',
      content: 'Today is a quiet page waiting for your thoughts.',
      confidence: 0.9,
      createdAt: now,
    })
    localStorage.setItem(`daybook_observations_${entryDate}`, JSON.stringify(observations))
    return observations
  }

  const text = journal.content.toLowerCase()
  if (journal.mood) {
    observations.push({
      id: 'obs_' + Math.random().toString(36).substring(2, 9),
      type: 'emotion',
      content: `Your mood is marked as ${journal.mood}, reflecting your emotional space today.`,
      confidence: 0.95,
      createdAt: now,
    })
  }

  if (text.includes('goal') || text.includes('work') || text.includes('focus') || text.includes('plan')) {
    observations.push({
      id: 'obs_' + Math.random().toString(36).substring(2, 9),
      type: 'goal',
      content: 'You are actively channeling intention and focus into your daily priorities.',
      confidence: 0.88,
      createdAt: now,
    })
  }

  if (text.includes('happy') || text.includes('grateful') || text.includes('proud') || text.includes('good') || text.includes('accomplished')) {
    observations.push({
      id: 'obs_' + Math.random().toString(36).substring(2, 9),
      type: 'win',
      content: 'A positive tone shines through your writing, noting moments of gratitude or success.',
      confidence: 0.9,
      createdAt: now,
    })
  } else if (text.includes('tired') || text.includes('hard') || text.includes('stress') || text.includes('busy')) {
    observations.push({
      id: 'obs_' + Math.random().toString(36).substring(2, 9),
      type: 'struggle',
      content: 'You acknowledge feeling stretched or challenged, showing self-awareness and honesty.',
      confidence: 0.85,
      createdAt: now,
    })
  }

  if (observations.length === 0) {
    observations.push({
      id: 'obs_' + Math.random().toString(36).substring(2, 9),
      type: 'behavior',
      content: 'You took deliberate time out of your day to pause, reflect, and put thoughts into words.',
      confidence: 0.92,
      createdAt: now,
    })
  }

  localStorage.setItem(`daybook_observations_${entryDate}`, JSON.stringify(observations))
  return observations
}

function localGetJournalObservations(entryDate: string): JournalObservation[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(`daybook_observations_${entryDate}`)
    if (raw) {
      return JSON.parse(raw) as JournalObservation[]
    }
  } catch {
    void 0
  }
  return localGenerateJournalObservations(entryDate)
}

function localGetJournalMedia(entryDate: string): JournalMedia[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(`daybook_media_${entryDate}`)
    return raw ? (JSON.parse(raw) as JournalMedia[]) : []
  } catch {
    return []
  }
}

function localSaveJournalMedia(entryDate: string, dataUrl: string): JournalMedia {
  const list = localGetJournalMedia(entryDate)
  const item: JournalMedia = {
    id: 'med_' + Math.random().toString(36).substring(2, 9),
    mediaType: 'image',
    url: dataUrl,
    createdAt: new Date().toISOString(),
  }
  list.push(item)
  localStorage.setItem(`daybook_media_${entryDate}`, JSON.stringify(list))
  return item
}

function localDeleteJournalMedia(entryDate: string, mediaId: string): { deleted: boolean } {
  let list = localGetJournalMedia(entryDate)
  list = list.filter((m) => m.id !== mediaId)
  localStorage.setItem(`daybook_media_${entryDate}`, JSON.stringify(list))
  return { deleted: true }
}

function localQueryAI(question: string, selectedJournalDate?: string): AiQueryResponse {
  const q = question.toLowerCase()
  const todayKey = selectedJournalDate || toLocalDateKey(new Date())

  if (q.includes('quote')) {
    const daily = localGetDailyQuote(todayKey)
    return {
      type: 'daily_quote',
      answer: {
        quote: daily.quote,
        saved: daily.saved,
      },
      displayText: `${daily.quote.text}\n\n${daily.quote.title} - ${daily.quote.author}`,
    }
  }

  if (q.includes('streak')) {
    const streak = localGetCurrentStreak()
    return {
      type: 'current_streak',
      answer: streak,
      displayText: streak.currentStreak > 0
        ? `You have an active streak of ${streak.currentStreak} day${streak.currentStreak === 1 ? '' : 's'}. Keep the momentum going!`
        : 'You do not have an active streak today yet. Write an entry to start your streak!',
    }
  }

  if (q.includes('goal')) {
    const goalsResp = localGetJournalGoals(todayKey)
    const goals = goalsResp.goals.map((g) => ({ text: g.text, completed: g.completed }))
    return {
      type: 'current_goals',
      answer: {
        date: todayKey,
        goals,
      },
      displayText: goals.length > 0
        ? `You have ${goals.length} goal${goals.length === 1 ? '' : 's'} recorded for today.`
        : 'No goals recorded for today yet. You can add them in the Book or Goals view.',
    }
  }

  const reflection: AiReflection = {
    intent: q.includes('mood') ? 'MOOD_EMOTIONAL' : (q.includes('pattern') ? 'RECURRING_PATTERNS' : 'GENERAL_REFLECTION'),
    summary: 'Looking through your journal, you demonstrate self-reflection and steady intention.',
    observations: [
      {
        title: 'Mindful Reflection',
        detail: 'You consistently take time to articulate your thoughts and pause during the day.',
        evidence: [{ date: todayKey, excerpt: 'Your daily entry records intentional progress.' }],
      },
      {
        title: 'Clarity of Purpose',
        detail: 'Writing down what happens each day helps you build quiet clarity over time.',
        evidence: [{ date: todayKey, excerpt: 'Building consistency one step at a time.' }],
      },
    ],
    encouragement: 'Keep writing each day. The habit of reflection builds clarity and calm.',
    nextStep: 'Take five minutes this evening to write down one gratitude from today.',
  }

  return {
    type: 'reflection',
    answer: reflection,
    displayText: `${reflection.summary}\n\n${reflection.encouragement}`,
  }
}

function localAnalyzeWithAI(question: string): AiReflection {
  const queryResp = localQueryAI(question)
  if (queryResp.type === 'reflection') {
    return queryResp.answer
  }
  return {
    intent: 'GENERAL_REFLECTION',
    summary: queryResp.displayText,
    observations: [
      {
        title: 'Reflection Insight',
        detail: queryResp.displayText,
        evidence: [],
      },
    ],
    encouragement: 'Keep journaling every day to deepen your self-awareness.',
    nextStep: 'Revisit your goals and celebrate what you have accomplished.',
  }
}

function localGetAiKnowledge(): AiKnowledge {
  const profile = localGetCurrentProfile()
  const facts: string[] = []
  if (profile) {
    if (profile.occupation) facts.push(`Occupation: ${profile.occupation}`)
    if (profile.currentFocus) facts.push(`Focus: ${profile.currentFocus}`)
    if (profile.reflectionStyle) facts.push(`Reflection Style: ${profile.reflectionStyle}`)
    if (profile.motivators) facts.push(`Motivators: ${profile.motivators}`)
  }
  return {
    profileFacts: facts,
    memories: [],
    observations: [],
    stillLearning: ['Daily habits and morning routines', 'Longer term goals across weeks'],
  }
}

function localGetMemories(status?: 'active' | 'archived'): StoredMemory[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('daybook_memories')
    if (!raw) return []
    const list = JSON.parse(raw) as StoredMemory[]
    if (status) return list.filter((m) => m.status === status)
    return list
  } catch {
    return []
  }
}

function localConfirmMemory(input: {
  type: MemoryType
  content: string
  confidence?: number
  sourceJournalId?: string | null
}): { memory: StoredMemory; duplicate: boolean } {
  const list = localGetMemories()
  const existing = list.find((m) => m.content.toLowerCase() === input.content.toLowerCase())
  if (existing) {
    return { memory: existing, duplicate: true }
  }
  const now = new Date().toISOString()
  const memory: StoredMemory = {
    id: 'mem_' + Math.random().toString(36).substring(2, 9),
    type: input.type,
    content: input.content,
    status: 'active',
    confidence: input.confidence ?? 0.9,
    sourceJournalId: input.sourceJournalId ?? null,
    createdAt: now,
    updatedAt: now,
  }
  list.unshift(memory)
  localStorage.setItem('daybook_memories', JSON.stringify(list))
  return { memory, duplicate: false }
}

function localUpdateMemory(
  memoryId: string,
  patch: { content?: string; status?: 'active' | 'archived' },
): StoredMemory {
  const list = localGetMemories()
  const item = list.find((m) => m.id === memoryId)
  if (!item) {
    throw new Error('Memory not found')
  }
  if (patch.content !== undefined) item.content = patch.content
  if (patch.status !== undefined) item.status = patch.status
  item.updatedAt = new Date().toISOString()
  localStorage.setItem('daybook_memories', JSON.stringify(list))
  return item
}

function localGenerateMemorySuggestions(): MemorySuggestion[] {
  const profile = localGetCurrentProfile()
  const suggestions: MemorySuggestion[] = []
  if (profile?.currentFocus) {
    suggestions.push({
      type: 'goal',
      content: profile.currentFocus,
      confidence: 0.95,
      evidence: [{ date: toLocalDateKey(new Date()), observation: 'From profile current focus' }],
    })
  }
  if (profile?.reflectionStyle) {
    suggestions.push({
      type: 'preference',
      content: `Prefers ${profile.reflectionStyle} reflection style`,
      confidence: 0.9,
      evidence: [{ date: toLocalDateKey(new Date()), observation: 'From profile settings' }],
    })
  }
  return suggestions
}

export async function getCurrentUser(): Promise<LocalUser | null> {
  return tryBackend(
    async () => {
      let res: Response
      try {
        res = await fetch('/api/users/current')
      } catch {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      if (!isJsonResponse(res)) {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      backendAvailability = 'online'
      if (res.status === 404) return null
      if (!res.ok) {
        if (res.status >= 500) {
          backendAvailability = 'offline'
          throw new Error('BACKEND_UNAVAILABLE')
        }
        throw new Error(`Failed to load current user: ${res.status} ${res.statusText}`)
      }
      const data = (await res.json()) as { user: LocalUser }
      return data.user
    },
    () => localGetCurrentUser(),
  )
}

export async function createUser(input: CreateUserInput): Promise<LocalUser> {
  return tryBackend(
    async () => {
      const data = await request<{ user: LocalUser }>('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      return data.user
    },
    () => localCreateUser(input),
  )
}

export async function getCurrentProfile(): Promise<UserProfile | null> {
  return tryBackend(
    async () => {
      let res: Response
      try {
        res = await fetch('/api/users/current/profile')
      } catch {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      if (!isJsonResponse(res)) {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      backendAvailability = 'online'
      if (res.status === 404) return null
      if (!res.ok) {
        if (res.status >= 500) {
          backendAvailability = 'offline'
          throw new Error('BACKEND_UNAVAILABLE')
        }
        throw new Error(`Failed to load current profile: ${res.status} ${res.statusText}`)
      }
      return (await res.json()) as UserProfile
    },
    () => localGetCurrentProfile(),
  )
}

export async function updateCurrentProfile(input: UpdateUserProfileInput): Promise<UserProfile> {
  return tryBackend(
    () =>
      request<UserProfile>('/api/users/current/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }),
    () => localUpdateCurrentProfile(input),
  )
}

export async function getJournal(entryDate: string): Promise<Journal | null> {
  return tryBackend(
    async () => {
      let res: Response
      try {
        res = await fetch(`/api/journals/${encodeURIComponent(entryDate)}`)
      } catch {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      if (!isJsonResponse(res)) {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      backendAvailability = 'online'
      if (!res.ok) {
        if (res.status >= 500) {
          backendAvailability = 'offline'
          throw new Error('BACKEND_UNAVAILABLE')
        }
        throw new Error(`Failed to load journal: ${res.status} ${res.statusText}`)
      }
      const data = (await res.json()) as { journal: Journal | null }
      return data.journal
    },
    () => localGetJournal(entryDate),
  )
}

export async function saveJournal(entryDate: string, input: SaveJournalInput): Promise<Journal> {
  return tryBackend(
    async () => {
      const data = await request<{ journal: Journal }>(`/api/journals/${encodeURIComponent(entryDate)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      return data.journal
    },
    () => localSaveJournal(entryDate, input),
  )
}

export async function deleteJournal(entryDate: string): Promise<{ deleted: boolean }> {
  return tryBackend(
    () =>
      request<{ deleted: boolean }>(`/api/journals/${encodeURIComponent(entryDate)}`, {
        method: 'DELETE',
      }),
    () => localDeleteJournal(entryDate),
  )
}

export async function getJournalGoals(entryDate: string): Promise<GetJournalGoalsResponse> {
  return tryBackend(
    async () => {
      let res: Response
      try {
        res = await fetch(`/api/journals/${encodeURIComponent(entryDate)}/goals`)
      } catch {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      if (!isJsonResponse(res)) {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      backendAvailability = 'online'
      if (!res.ok) {
        if (res.status >= 500) {
          backendAvailability = 'offline'
          throw new Error('BACKEND_UNAVAILABLE')
        }
        throw new Error(`Failed to load journal goals: ${res.status} ${res.statusText}`)
      }
      return (await res.json()) as GetJournalGoalsResponse
    },
    () => localGetJournalGoals(entryDate),
  )
}

export async function createJournalGoal(
  entryDate: string,
  input: CreateJournalGoalInput,
): Promise<JournalGoal> {
  return tryBackend(
    async () => {
      const data = await request<{ goal: JournalGoal }>(
        `/api/journals/${encodeURIComponent(entryDate)}/goals`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        },
      )
      return data.goal
    },
    () => localCreateJournalGoal(entryDate, input),
  )
}

export async function updateJournalGoal(
  entryDate: string,
  goalId: string,
  input: UpdateJournalGoalInput,
): Promise<JournalGoal> {
  return tryBackend(
    async () => {
      const data = await request<{ goal: JournalGoal }>(
        `/api/journals/${encodeURIComponent(entryDate)}/goals/${encodeURIComponent(goalId)}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        },
      )
      return data.goal
    },
    () => localUpdateJournalGoal(entryDate, goalId, input),
  )
}

export async function deleteJournalGoal(
  entryDate: string,
  goalId: string,
): Promise<{ deleted: boolean }> {
  return tryBackend(
    () =>
      request<{ deleted: boolean }>(
        `/api/journals/${encodeURIComponent(entryDate)}/goals/${encodeURIComponent(goalId)}`,
        {
          method: 'DELETE',
        },
      ),
    () => localDeleteJournalGoal(entryDate, goalId),
  )
}

export async function getPreviousJournalGoals(
  entryDate: string,
): Promise<PreviousJournalGoalsResponse> {
  return tryBackend(
    async () => {
      let res: Response
      try {
        res = await fetch(`/api/journals/${encodeURIComponent(entryDate)}/goals/previous`)
      } catch {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      if (!isJsonResponse(res)) {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      backendAvailability = 'online'
      if (!res.ok) {
        if (res.status >= 500) {
          backendAvailability = 'offline'
          throw new Error('BACKEND_UNAVAILABLE')
        }
        throw new Error(`Failed to load previous goals: ${res.status} ${res.statusText}`)
      }
      return (await res.json()) as PreviousJournalGoalsResponse
    },
    () => localGetPreviousJournalGoals(entryDate),
  )
}

export async function getJournalDates(from: string, to: string): Promise<string[]> {
  return tryBackend(
    async () => {
      const params = new URLSearchParams({ from, to })
      const data = await request<{ dates: string[] }>(`/api/journals/dates?${params.toString()}`)
      return data.dates
    },
    () => localGetJournalDates(from, to),
  )
}

export async function getCurrentStreak(): Promise<StreakResponse> {
  return tryBackend(
    async () => {
      let res: Response
      try {
        res = await fetch('/api/stats/streak')
      } catch {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      if (!isJsonResponse(res)) {
        backendAvailability = 'offline'
        throw new Error('BACKEND_UNAVAILABLE')
      }
      backendAvailability = 'online'
      if (!res.ok) {
        if (res.status >= 500) {
          backendAvailability = 'offline'
          throw new Error('BACKEND_UNAVAILABLE')
        }
        throw new Error(`Failed to load streak: ${res.status} ${res.statusText}`)
      }
      return (await res.json()) as StreakResponse
    },
    () => localGetCurrentStreak(),
  )
}

export async function analyzeWithAI(question: string, signal?: AbortSignal): Promise<AiReflection> {
  return tryBackend(
    async () => {
      const data = await request<{ reflection: AiReflection }>('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
        signal,
      })
      return data.reflection
    },
    () => localAnalyzeWithAI(question),
  )
}

export async function queryAI(
  question: string,
  selectedJournalDate?: string,
  signal?: AbortSignal,
): Promise<AiQueryResponse> {
  return tryBackend(
    () =>
      request<AiQueryResponse>('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          ...(selectedJournalDate ? { selectedJournalDate } : {}),
        }),
        signal,
      }),
    () => localQueryAI(question, selectedJournalDate),
  )
}

export async function getDailyQuote(date?: string): Promise<DailyQuoteResponse> {
  return tryBackend(
    () => {
      const params = date ? `?${new URLSearchParams({ date })}` : ''
      return request<DailyQuoteResponse>(`/api/quotes/daily${params}`)
    },
    () => localGetDailyQuote(date),
  )
}

export async function getSavedQuotes(): Promise<SavedQuote[]> {
  return tryBackend(
    async () => {
      const data = await request<{ quotes: SavedQuote[] }>('/api/quotes/saved')
      return data.quotes
    },
    () => localGetSavedQuotes(),
  )
}

export async function saveQuote(quoteId: string): Promise<{ saved: boolean }> {
  return tryBackend(
    () =>
      request<{ saved: boolean }>(`/api/quotes/${encodeURIComponent(quoteId)}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      }),
    () => localSaveQuote(quoteId),
  )
}

export async function unsaveQuote(quoteId: string): Promise<{ saved: boolean }> {
  return tryBackend(
    () =>
      request<{ saved: boolean }>(`/api/quotes/${encodeURIComponent(quoteId)}/save`, {
        method: 'DELETE',
      }),
    () => localUnsaveQuote(quoteId),
  )
}

export async function getJournalObservations(
  entryDate: string,
  signal?: AbortSignal,
): Promise<JournalObservation[]> {
  return tryBackend(
    async () => {
      const data = await request<{ observations: JournalObservation[] }>(
        `/api/journals/${encodeURIComponent(entryDate)}/observations`,
        { signal },
      )
      return data.observations
    },
    () => localGetJournalObservations(entryDate),
  )
}

export async function generateJournalObservations(
  entryDate: string,
): Promise<JournalObservation[]> {
  return tryBackend(
    async () => {
      const data = await request<{ observations: JournalObservation[] }>(
        `/api/journals/${encodeURIComponent(entryDate)}/observations/generate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: '{}',
        },
      )
      return data.observations
    },
    () => localGenerateJournalObservations(entryDate),
  )
}

export async function getAiKnowledge(): Promise<AiKnowledge> {
  return tryBackend(
    () => request<AiKnowledge>('/api/ai/knowledge'),
    () => localGetAiKnowledge(),
  )
}

export async function generateMemorySuggestions(signal?: AbortSignal): Promise<MemorySuggestion[]> {
  return tryBackend(
    async () => {
      const data = await request<{ suggestions: MemorySuggestion[] }>('/api/memories/suggestions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
        signal,
      })
      return data.suggestions
    },
    () => localGenerateMemorySuggestions(),
  )
}

export async function getMemories(status?: 'active' | 'archived'): Promise<StoredMemory[]> {
  return tryBackend(
    async () => {
      const params = status === undefined ? '' : `?status=${status}`
      const data = await request<{ memories: StoredMemory[] }>(`/api/memories${params}`)
      return data.memories
    },
    () => localGetMemories(status),
  )
}

export async function confirmMemory(input: {
  type: MemoryType
  content: string
  confidence?: number
  sourceJournalId?: string | null
}): Promise<{ memory: StoredMemory; duplicate: boolean }> {
  return tryBackend(
    () =>
      request<{ memory: StoredMemory; duplicate: boolean }>('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }),
    () => localConfirmMemory(input),
  )
}

export async function updateMemory(
  memoryId: string,
  patch: { content?: string; status?: 'active' | 'archived' },
): Promise<StoredMemory> {
  return tryBackend(
    async () => {
      const data = await request<{ memory: StoredMemory }>(`/api/memories/${encodeURIComponent(memoryId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      })
      return data.memory
    },
    () => localUpdateMemory(memoryId, patch),
  )
}

export async function getJournalMedia(
  entryDate: string,
  signal?: AbortSignal,
): Promise<JournalMedia[]> {
  return tryBackend(
    async () => {
      const data = await request<{ media: JournalMedia[] }>(
        `/api/journals/${encodeURIComponent(entryDate)}/media`,
        { signal },
      )
      return data.media
    },
    () => localGetJournalMedia(entryDate),
  )
}

export async function saveJournalMedia(entryDate: string, dataUrl: string): Promise<JournalMedia> {
  return tryBackend(
    async () => {
      const data = await request<{ media: JournalMedia }>(
        `/api/journals/${encodeURIComponent(entryDate)}/media`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl }),
        },
      )
      return data.media
    },
    () => localSaveJournalMedia(entryDate, dataUrl),
  )
}

export async function deleteJournalMedia(
  entryDate: string,
  mediaId: string,
): Promise<{ deleted: boolean }> {
  return tryBackend(
    () =>
      request<{ deleted: boolean }>(
        `/api/journals/${encodeURIComponent(entryDate)}/media/${encodeURIComponent(mediaId)}`,
        { method: 'DELETE' },
      ),
    () => localDeleteJournalMedia(entryDate, mediaId),
  )
}
