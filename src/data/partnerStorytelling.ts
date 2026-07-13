export const PARTNER_JOURNEY_STAGES = [
  {
    level: 'Registered Partner',
    scene: 'Person registering online on KuberOne',
    description: 'Create your profile and access the platform',
  },
  {
    level: 'Certified Partner',
    scene: 'Receiving certification from Kuber Academy',
    description: 'Complete training and earn your certification',
  },
  {
    level: 'Business Partner',
    scene: 'Serving your first customer successfully',
    description: 'Close your first deal and start earning',
  },
  {
    level: 'Senior Business Partner',
    scene: 'Managing a growing customer portfolio',
    description: 'Scale your business with repeat customers',
  },
  {
    level: 'Executive Partner',
    scene: 'Leading a small business team',
    description: 'Build and mentor your first team',
  },
  {
    level: 'Principal Partner',
    scene: 'Running multiple business verticals',
    description: 'Expand across products and markets',
  },
  {
    level: 'City Partner',
    scene: 'Managing city operations with AI dashboard',
    description: 'Lead your city\'s partner ecosystem',
  },
  {
    level: 'Regional Partner',
    scene: 'Monitoring multiple cities on digital map',
    description: 'Oversee regional business growth',
  },
  {
    level: 'State Partner',
    scene: 'Leading statewide business ecosystem',
    description: 'Shape financial distribution across a state',
  },
  {
    level: 'National Partner',
    scene: 'Strategic leadership across India',
    description: 'Drive national business strategy',
  },
  {
    level: 'Executive Council',
    scene: 'Boardroom strategy meeting',
    description: 'Influence platform direction and policy',
  },
  {
    level: "Chairman's Circle",
    scene: 'Exclusive annual leadership summit and awards',
    description: 'Highest recognition and legacy status',
  },
] as const

export const GROWTH_TREE_STEPS = [
  { label: 'Learning', description: 'Academy training & certification' },
  { label: 'Customers', description: 'Build trusted relationships' },
  { label: 'Products', description: 'Offer multiple financial solutions' },
  { label: 'Business', description: 'Grow your own distribution business' },
  { label: 'Leadership', description: 'Mentor teams and expand markets' },
  { label: 'Rewards', description: 'Earn recognition and achievements' },
  { label: 'Long-term Success', description: 'Create lasting wealth and legacy' },
] as const

export const CAREER_PATHS = [
  {
    id: 'professional',
    title: 'Financial Professional',
    steps: ['Financial Professional', 'Loan Specialist', 'Business Partner', 'Regional Partner', 'National Partner'],
  },
  {
    id: 'graduate',
    title: 'Fresh Graduate',
    steps: ['Fresh Graduate', 'Certified Advisor', 'Business Partner', 'City Partner', 'State Partner'],
  },
  {
    id: 'strategic',
    title: 'Builder / CA / Insurance Advisor',
    steps: ['Strategic Business Partner', 'Principal Partner', 'Executive Council', "Chairman's Circle"],
  },
] as const

export const STORY_SECTIONS = [
  {
    id: 'business',
    eyebrow: 'Build Your Business',
    title: 'Start Small. Build Big.',
    subtitle:
      'One person building a successful financial business using KuberOne technology — serving customers across India from anywhere.',
    caption: 'Start Small.\nBuild Big.',
    variant: 'dark' as const,
    reverse: false,
  },
  {
    id: 'leadership',
    eyebrow: 'Build Your Leadership',
    title: 'Lead Teams. Build Markets. Create Impact.',
    subtitle:
      'Grow from individual contributor to City Partner — mentoring professionals and expanding your network across regions.',
    caption: 'Lead Teams.\nBuild Markets.\nCreate Impact.',
    variant: 'light' as const,
    reverse: true,
  },
  {
    id: 'wealth',
    eyebrow: 'Build Your Wealth',
    title: 'Multiple Products. Multiple Income Streams. Unlimited Opportunities.',
    subtitle:
      'Business growth through transparent payouts, multiple products, and upward earning potential — not fixed salary caps.',
    caption: 'Multiple Products.\nMultiple Income Streams.\nUnlimited Opportunities.',
    variant: 'dark' as const,
    reverse: false,
  },
  {
    id: 'legacy',
    eyebrow: 'Build Your Legacy',
    title: 'Create Leaders. Build Businesses. Leave a Legacy.',
    subtitle:
      'Success measured by people developed, businesses created, and customers served — from mentorship to Chairman\'s Circle.',
    caption: 'Create Leaders.\nBuild Businesses.\nLeave a Legacy.',
    variant: 'light' as const,
    reverse: true,
  },
] as const
