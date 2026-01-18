import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { products, issueProductMapping, disclaimer } from '@/lib/data'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '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',
})

interface UserProfile {
  sensitivity: number
  plaque: number
  ulcers: number
  badBreath: number
  frequency: number
  severity: number
  primaryIssue?: string
  answers: Record<string, string>
}

function identifyPrimaryIssue(profile: UserProfile): string {
  // Check if primary issue was explicitly selected
  if (profile.answers['q1']) {
    return profile.answers['q1']
  }
  
  // Fallback: determine from scores
  const issues = {
    sensitivity: profile.sensitivity || 0,
    plaque: profile.plaque || 0,
    ulcers: profile.ulcers || 0,
    badBreath: profile.badBreath || 0,
  }
  
  const sorted = Object.entries(issues).sort((a, b) => b[1] - a[1])
  return sorted[0][0]
}

function getMatchingProducts(profile: UserProfile) {
  const primaryIssue = identifyPrimaryIssue(profile)
  const mapping = issueProductMapping[primaryIssue as keyof typeof issueProductMapping]
  
  if (!mapping) {
    // Default fallback
    return {
      toothpaste: [products.toothpaste[0]],
      toothbrush: [products.toothbrush[1]],
      primaryIssue: 'general',
      explanation: 'Based on your profile, we recommend our balanced daily care products.',
    }
  }
  
  const recommendedToothpaste = products.toothpaste.find(p => p.id === mapping.toothpaste)
  const recommendedToothbrush = products.toothbrush.find(p => p.id === mapping.toothbrush)
  
  // Also get an alternative for each
  const altToothpaste = products.toothpaste.find(p => p.id !== mapping.toothpaste)
  const altToothbrush = products.toothbrush.find(p => p.id !== mapping.toothbrush && p.id !== 'tb-firm')
  
  return {
    toothpaste: recommendedToothpaste ? [recommendedToothpaste] : [products.toothpaste[0]],
    toothbrush: recommendedToothbrush ? [recommendedToothbrush] : [products.toothbrush[1]],
    alternatives: {
      toothpaste: altToothpaste,
      toothbrush: altToothbrush,
    },
    primaryIssue,
    explanation: mapping.explanation,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { profile, action } = await request.json()

    if (action === 'getRecommendation') {
      const { toothpaste, toothbrush, primaryIssue, explanation, alternatives } = getMatchingProducts(profile)
      
      const issueLabels: Record<string, string> = {
        sensitivity: 'Tooth Sensitivity',
        plaque: 'Plaque Buildup',
        ulcers: 'Oral Ulcers',
        badBreath: 'Bad Breath',
      }

      // Generate personalized advice using Groq AI
      const profileSummary = `
        User's Primary Oral Issue: ${issueLabels[primaryIssue] || primaryIssue}
        Frequency: ${profile.answers?.q2 || 'Not specified'}
        Trigger: ${profile.answers?.q3 || 'Not specified'}
        Severity: ${profile.answers?.q4 || 'Not specified'}
        
        Recommended Products:
        - Toothpaste: ${toothpaste[0]?.name} (${toothpaste[0]?.whyItWorks || ''})
        - Toothbrush: ${toothbrush[0]?.name} (${toothbrush[0]?.whyItWorks || ''})
        
        Base explanation: ${explanation}
      `

      let aiAdvice = explanation
      
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: `You are TimTim, the friendly AI oral care advisor for Verident, an eco-friendly sustainable dental care brand. 
              
Your job is to explain WHY the recommended products will help the user's specific oral issue. Be warm, reassuring, and educational.

Guidelines:
- Focus on the user's PRIMARY issue: ${issueLabels[primaryIssue]}
- Explain how the recommended products address their specific concern
- Mention the sustainable/eco-friendly aspect naturally
- Keep it to 2-3 sentences max
- Be confident but not medical - you're a wellness advisor, not a dentist
- If severity is high, gently suggest consulting a dentist for persistent issues

Do NOT list product names - just give caring, personalized advice.`,
            },
            {
              role: 'user',
              content: profileSummary,
            },
          ],
          model: 'llama-3.3-70b-versatile',
          temperature: 0.7,
          max_tokens: 150,
        })

        aiAdvice = completion.choices[0]?.message?.content || explanation
      } catch (aiError) {
        console.log('AI generation failed, using fallback explanation')
        aiAdvice = explanation
      }

      return NextResponse.json({
        success: true,
        recommendation: {
          toothpaste,
          toothbrush,
          alternatives,
          advice: aiAdvice,
          profile,
          primaryIssue,
          issueLabel: issueLabels[primaryIssue] || primaryIssue,
          disclaimer: disclaimer.text,
        },
      })
    }

    if (action === 'chat') {
      const { message, context } = await request.json()

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are TimTim, the friendly AI oral care assistant for Verident - a sustainable dental care brand. 

You ONLY help with these 4 oral issues:
1. Tooth Sensitivity
2. Plaque Buildup  
3. Oral Ulcers / Mouth Sores
4. Bad Breath

If asked about other dental issues (whitening, cavities, gum disease, etc.), politely explain that Verident focuses on these 4 common daily concerns and suggest consulting a dentist for other issues.

Keep responses brief (1-2 sentences), warm, and helpful. Emphasize sustainability and natural ingredients when relevant.

Current context: ${context || 'General conversation'}`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 100,
      })

      return NextResponse.json({
        success: true,
        response: completion.choices[0]?.message?.content,
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
