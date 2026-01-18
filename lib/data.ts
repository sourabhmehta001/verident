// TIM TIM - AI Recommendation Agent for Verident
// Sustainable dental care products
// Focused on 4 oral issues: Sensitivity, Plaque, Oral Ulcers, Bad Breath

export const brandInfo = {
  agentName: 'TimTim',
  brandName: 'Verident',
  tagline: 'Sustainable Smiles, Naturally',
  description: 'AI-personalized, eco-friendly oral care that targets your specific needs',
  targetIssues: ['Sensitivity', 'Plaque', 'Oral Ulcers', 'Bad Breath'],
}

export const categories = [
  {
    id: 'primary-issue',
    name: 'Primary Concern',
    icon: '🎯',
    description: 'Your main oral health issue',
  },
  {
    id: 'frequency',
    name: 'Frequency',
    icon: '📅',
    description: 'How often you experience this',
  },
  {
    id: 'triggers',
    name: 'Triggers',
    icon: '⚡',
    description: 'What triggers your symptoms',
  },
  {
    id: 'severity',
    name: 'Severity',
    icon: '📊',
    description: 'Impact on daily life',
  },
  {
    id: 'preferences',
    name: 'Preferences',
    icon: '🌿',
    description: 'Your brushing preferences',
  },
]

export const questions = [
  // Question 1: Primary Oral Issue (Core Classification)
  {
    id: 'q1',
    categoryId: 'primary-issue',
    text: 'What is your primary oral health concern that you want to address?',
    options: [
      { 
        id: 'q1-a', 
        label: 'Tooth Sensitivity', 
        value: 'sensitivity', 
        emoji: '🦷', 
        score: 10, 
        profileKey: 'sensitivity',
        description: 'Pain or discomfort with hot, cold, or sweet foods'
      },
      { 
        id: 'q1-b', 
        label: 'Plaque Buildup', 
        value: 'plaque', 
        emoji: '🪥', 
        score: 10, 
        profileKey: 'plaque',
        description: 'Film on teeth, tartar, or yellowing'
      },
      { 
        id: 'q1-c', 
        label: 'Oral Ulcers / Mouth Sores', 
        value: 'ulcers', 
        emoji: '😣', 
        score: 10, 
        profileKey: 'ulcers',
        description: 'Recurring mouth sores or canker sores'
      },
      { 
        id: 'q1-d', 
        label: 'Bad Breath', 
        value: 'badBreath', 
        emoji: '💨', 
        score: 10, 
        profileKey: 'badBreath',
        description: 'Persistent unpleasant breath despite brushing'
      },
    ],
  },
  // Question 2: Frequency of Issue
  {
    id: 'q2',
    categoryId: 'frequency',
    text: 'How often do you experience this issue?',
    options: [
      { id: 'q2-a', label: 'Daily / Multiple times a day', value: 'daily', emoji: '🔴', score: 10, profileKey: 'frequency' },
      { id: 'q2-b', label: 'Several times a week', value: 'weekly', emoji: '🟠', score: 7, profileKey: 'frequency' },
      { id: 'q2-c', label: 'Occasionally / Monthly', value: 'monthly', emoji: '🟡', score: 4, profileKey: 'frequency' },
      { id: 'q2-d', label: 'Rarely', value: 'rarely', emoji: '🟢', score: 1, profileKey: 'frequency' },
    ],
  },
  // Question 3: Lifestyle Triggers
  {
    id: 'q3',
    categoryId: 'triggers',
    text: 'What typically triggers or worsens your symptoms?',
    options: [
      { id: 'q3-a', label: 'Hot or cold foods/drinks', value: 'temperature', emoji: '🧊', score: 8, profileKey: 'trigger' },
      { id: 'q3-b', label: 'Sugary or acidic foods', value: 'diet', emoji: '🍬', score: 6, profileKey: 'trigger' },
      { id: 'q3-c', label: 'Stress or lack of sleep', value: 'stress', emoji: '😰', score: 7, profileKey: 'trigger' },
      { id: 'q3-d', label: 'Not sure / Multiple factors', value: 'unknown', emoji: '🤷', score: 5, profileKey: 'trigger' },
    ],
  },
  // Question 4: Impact on Daily Life
  {
    id: 'q4',
    categoryId: 'severity',
    text: 'How much does this issue affect your daily comfort and confidence?',
    options: [
      { id: 'q4-a', label: 'Significantly - affects eating, speaking, or social situations', value: 'high', emoji: '😔', score: 10, profileKey: 'severity' },
      { id: 'q4-b', label: 'Moderately - noticeable but manageable', value: 'medium', emoji: '😐', score: 6, profileKey: 'severity' },
      { id: 'q4-c', label: 'Mildly - occasional discomfort', value: 'low', emoji: '🙂', score: 3, profileKey: 'severity' },
    ],
  },
  // Question 5: Brushing Preference
  {
    id: 'q5',
    categoryId: 'preferences',
    text: 'How would you describe your ideal brushing experience?',
    options: [
      { id: 'q5-a', label: 'Extra gentle - I have sensitive gums', value: 'soft', emoji: '🪶', score: 0, profileKey: 'bristlePreference' },
      { id: 'q5-b', label: 'Balanced - gentle yet effective', value: 'mild', emoji: '⚖️', score: 5, profileKey: 'bristlePreference' },
      { id: 'q5-c', label: 'Thorough - I want deep cleaning', value: 'firm', emoji: '💪', score: 10, profileKey: 'bristlePreference' },
    ],
  },
]

export const products = {
  toothpaste: [
    {
      id: 'tp-sensitivity',
      name: 'Verident SensiShield',
      brand: 'Verident',
      type: 'toothpaste' as const,
      price: '₹299',
      image: '/products/verident-sensishield.png',
      rating: 5,
      features: ['Sensitivity Relief', 'Enamel Repair', 'Nerve Protection'],
      targetIssue: 'sensitivity',
      doctorScore: 10,
      description: 'Clinically formulated for sensitive teeth. Builds a protective barrier over exposed nerves.',
      ingredients: ['Potassium Nitrate (5%)', 'Nano Hydroxyapatite', 'Aloe Vera', 'Chamomile Extract', 'Fluoride (1000 ppm)', 'Xylitol'],
      packaging: 'Recyclable Aluminium Tube',
      sustainable: true,
      vegan: true,
      whyItWorks: 'Potassium nitrate blocks pain signals from nerves, while nano hydroxyapatite repairs microscopic enamel damage.',
      tradeOffs: 'Gentler formula means slightly less whitening power.',
    },
    {
      id: 'tp-plaque',
      name: 'Verident PlaqueGuard',
      brand: 'Verident',
      type: 'toothpaste' as const,
      price: '₹279',
      image: '/products/verident-plaqueguard.png',
      rating: 5,
      features: ['Anti-Plaque', 'Tartar Control', 'Deep Clean'],
      targetIssue: 'plaque',
      doctorScore: 10,
      description: 'Powerful plaque-fighting formula that prevents tartar buildup without harsh chemicals.',
      ingredients: ['Zinc Citrate', 'Pyrophosphates', 'Tea Tree Oil', 'Bamboo Charcoal', 'Silica', 'Natural Mint'],
      packaging: 'Recyclable Aluminium Tube',
      sustainable: true,
      vegan: true,
      whyItWorks: 'Zinc citrate disrupts bacterial biofilm formation, while pyrophosphates prevent tartar crystallization.',
      tradeOffs: 'May feel slightly more abrasive than sensitivity formulas.',
    },
    {
      id: 'tp-ulcers',
      name: 'Verident SootheCare',
      brand: 'Verident',
      type: 'toothpaste' as const,
      price: '₹319',
      image: '/products/verident-soothecare.png',
      rating: 5,
      features: ['Ulcer Relief', 'Gentle Formula', 'Healing Support'],
      targetIssue: 'ulcers',
      doctorScore: 10,
      description: 'Ultra-gentle formula designed for mouths prone to ulcers and sores. SLS-free to prevent irritation.',
      ingredients: ['Aloe Vera Gel', 'Licorice Root Extract', 'Vitamin E', 'Calendula', 'Coconut Oil', 'Mild Mint'],
      packaging: 'Recyclable Aluminium Tube',
      sustainable: true,
      vegan: true,
      whyItWorks: 'SLS-free formula prevents irritation. Licorice root has natural anti-inflammatory properties that promote healing.',
      tradeOffs: 'Milder foaming action than traditional toothpastes.',
    },
    {
      id: 'tp-breath',
      name: 'Verident FreshMint Pro',
      brand: 'Verident',
      type: 'toothpaste' as const,
      price: '₹269',
      image: '/products/verident-freshmint.png',
      rating: 5,
      features: ['12-Hour Freshness', 'Bacteria Control', 'Odor Neutralizer'],
      targetIssue: 'badBreath',
      doctorScore: 10,
      description: 'Targets the bacteria that cause bad breath at the source. Long-lasting freshness without masking.',
      ingredients: ['Zinc Gluconate', 'Chlorophyll', 'Green Tea Extract', 'Eucalyptus Oil', 'Spearmint', 'Probiotics'],
      packaging: 'Recyclable Aluminium Tube',
      sustainable: true,
      vegan: true,
      whyItWorks: 'Zinc neutralizes sulfur compounds that cause odor. Probiotics restore healthy oral bacteria balance.',
      tradeOffs: 'Strong mint flavor may be intense for some users.',
    },
  ],
  toothbrush: [
    {
      id: 'tb-soft',
      name: 'Verident Bamboo Soft',
      brand: 'Verident',
      type: 'toothbrush' as const,
      price: '₹149',
      image: '/products/verident-bamboo-soft.png',
      rating: 5,
      features: ['Ultra Soft Bristles', '100% Bamboo', 'Gentle on Gums'],
      bestFor: ['sensitivity', 'ulcers'],
      doctorScore: 10,
      description: 'Extra gentle bristles ideal for sensitive teeth, gum issues, or mouth ulcers.',
      material: 'Moso Bamboo Handle + Charcoal-Infused Soft Nylon Bristles',
      sustainable: true,
      whyItWorks: 'Soft bristles prevent enamel wear and gum irritation while still effectively removing plaque.',
      tradeOffs: 'May require slightly more brushing time for heavy plaque.',
    },
    {
      id: 'tb-mild',
      name: 'Verident Bamboo Mild',
      brand: 'Verident',
      type: 'toothbrush' as const,
      price: '₹149',
      image: '/products/verident-bamboo-mild.png',
      rating: 5,
      features: ['Medium-Soft Bristles', '100% Bamboo', 'Everyday Balance'],
      bestFor: ['badBreath', 'general'],
      doctorScore: 10,
      description: 'Perfect balance of gentle care and effective cleaning for daily use.',
      material: 'Moso Bamboo Handle + Plant-Based Medium-Soft Bristles',
      sustainable: true,
      whyItWorks: 'Balanced bristle firmness provides thorough cleaning without being harsh on healthy gums.',
      tradeOffs: 'Not recommended for very sensitive teeth or active ulcers.',
    },
    {
      id: 'tb-firm',
      name: 'Verident Bamboo Firm',
      brand: 'Verident',
      type: 'toothbrush' as const,
      price: '₹149',
      image: '/products/verident-bamboo-firm.png',
      rating: 5,
      features: ['Firm Bristles', '100% Bamboo', 'Deep Plaque Removal'],
      bestFor: ['plaque'],
      doctorScore: 9,
      description: 'Firm bristles for thorough plaque and tartar removal. Best for those without sensitivity.',
      material: 'Moso Bamboo Handle + Activated Charcoal Firm Bristles',
      sustainable: true,
      whyItWorks: 'Firmer bristles physically disrupt and remove stubborn plaque more effectively.',
      tradeOffs: 'Not suitable for sensitive teeth or gums. Use with gentle pressure.',
    },
  ],
}

// Mapping: Primary Issue → Product Recommendations
export const issueProductMapping = {
  sensitivity: {
    toothpaste: 'tp-sensitivity',
    toothbrush: 'tb-soft',
    explanation: 'For sensitivity, we recommend our SensiShield formula with potassium nitrate that blocks pain signals, paired with ultra-soft bristles that won\'t aggravate exposed nerves.',
  },
  plaque: {
    toothpaste: 'tp-plaque',
    toothbrush: 'tb-firm',
    explanation: 'For plaque control, our PlaqueGuard with zinc citrate actively fights bacterial biofilm, and firm bristles provide the mechanical action needed to disrupt plaque buildup.',
  },
  ulcers: {
    toothpaste: 'tp-ulcers',
    toothbrush: 'tb-soft',
    explanation: 'For mouth ulcers, our SLS-free SootheCare formula prevents irritation while licorice root promotes healing. Soft bristles avoid aggravating sensitive areas.',
  },
  badBreath: {
    toothpaste: 'tp-breath',
    toothbrush: 'tb-mild',
    explanation: 'For bad breath, FreshMint Pro targets odor-causing bacteria with zinc and probiotics for lasting freshness. Medium bristles provide thorough tongue and tooth cleaning.',
  },
}

export const recommendationRules = [
  {
    id: 'rule-sensitivity',
    name: 'Sensitivity Care',
    conditions: { primaryIssue: 'sensitivity' },
    recommendToothpaste: ['tp-sensitivity'],
    recommendToothbrush: ['tb-soft'],
    priority: 10,
  },
  {
    id: 'rule-plaque',
    name: 'Plaque Control',
    conditions: { primaryIssue: 'plaque' },
    recommendToothpaste: ['tp-plaque'],
    recommendToothbrush: ['tb-firm'],
    priority: 10,
  },
  {
    id: 'rule-ulcers',
    name: 'Ulcer Relief',
    conditions: { primaryIssue: 'ulcers' },
    recommendToothpaste: ['tp-ulcers'],
    recommendToothbrush: ['tb-soft'],
    priority: 10,
  },
  {
    id: 'rule-breath',
    name: 'Fresh Breath',
    conditions: { primaryIssue: 'badBreath' },
    recommendToothpaste: ['tp-breath'],
    recommendToothbrush: ['tb-mild'],
    priority: 10,
  },
]

export const greetings = [
  "Hi! 👋 I'm TimTim, your personal oral care advisor from Verident. I'll help you find the right sustainable solution for your specific dental needs.",
  "Welcome to Verident! 🌿 I'm TimTim. Tell me about your oral health concerns, and I'll recommend personalized, eco-friendly products just for you.",
  "Hello! I'm TimTim 🎋 I specialize in matching you with the right Verident products for sensitivity, plaque, ulcers, or bad breath. Let's find your perfect match!",
]

export const transitions = {
  'primary-issue': "Thanks for sharing! Understanding your main concern helps me recommend the most effective solution. 🎯",
  'frequency': "Got it! Knowing how often you experience this helps me gauge the right strength of care. 📅",
  'triggers': "That's helpful! Understanding your triggers helps me recommend products that address root causes. ⚡",
  'severity': "I understand. I'll make sure to recommend something that provides the relief you need. 💚",
  'preferences': "Perfect! I now have everything I need to find your ideal Verident match. 🌿",
}

// Disclaimer for health-related recommendations
export const disclaimer = {
  text: "TIM TIM provides guidance for common oral care concerns. For persistent or severe symptoms, please consult a dental professional.",
  scope: "This recommendation is designed for: Sensitivity, Plaque, Oral Ulcers, and Bad Breath only.",
}
