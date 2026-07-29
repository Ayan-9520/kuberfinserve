export type CertificateTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond'

export type AcademyNavItem = {
  label: string
  path: string
  icon: string
  description?: string
}

export type LearningLevel = {
  id: number
  slug: string
  title: string
  focus: string
  description: string
  videoCount: number
  durationHours: number
  quizCount: number
  progress: number
  certificate: CertificateTier
  courseSlug: string
}

export type Lesson = {
  id: string
  title: string
  durationMin: number
  type: 'video' | 'reading' | 'practice'
  completed?: boolean
  summary: string
  transcript: string
}

export type Module = {
  id: string
  title: string
  lessons: Lesson[]
}

export type Course = {
  slug: string
  title: string
  level: number
  subtitle: string
  overview: string
  durationHours: number
  videoCount: number
  progress: number
  certificate: CertificateTier
  modules: Module[]
  resources: { title: string; type: string; size: string }[]
  assignments: { title: string; dueHint: string; status: 'Pending' | 'Submitted' | 'Graded' }[]
}

export type QuizQuestion = {
  id: string
  type: 'mcq' | 'case' | 'scenario'
  prompt: string
  options: string[]
  correctIndex: number
  explanation: string
}

export type ToolkitItem = {
  id: string
  category: string
  title: string
  format: string
  description: string
}

export type DownloadItem = {
  id: string
  category: string
  title: string
  format: string
  description: string
}

export type SalesScript = {
  id: string
  category: string
  title: string
  channel: string
  body: string
}

export type CrmLesson = {
  id: string
  title: string
  description: string
  steps: string[]
}

export type LeaderboardEntry = {
  rank: number
  name: string
  city: string
  role: string
  score: number
  metric: string
}

export type CommunityPost = {
  id: string
  author: string
  role: string
  title: string
  excerpt: string
  replies: number
  likes: number
  tag: string
}

export type PartnerProfile = {
  name: string
  email: string
  phone: string
  city: string
  role: string
  partnerCode: string
  tier: CertificateTier
  learningProgress: number
  learningHours: number
  commissionMonth: string
  referralLink: string
  kycStatus: 'Verified' | 'Pending' | 'Incomplete'
}
