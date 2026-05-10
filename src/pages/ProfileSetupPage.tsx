import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { Input } from '../components/common/Input'
import { Textarea } from '../components/common/Textarea'
import { GoalCard } from '../components/career/GoalCard'
import { getSuggestedGoalTemplates } from '../data/goalTemplates'
import { useLanguage } from '../i18n/LanguageContext'
import type { UserProfile } from '../types/career'
import { getStoredProfile, saveProfile } from '../utils/storage'

function createProfileSchema(messages: {
  title: string
  responsibilities: string
  skills: string
  weakAreas: string
  language: string
  goal: string
}) {
  return z.object({
    currentTitle: z.string().min(2, messages.title),
    yearsOfExperience: z.coerce.number().min(0).max(50),
    responsibilities: z.string().min(3, messages.responsibilities),
    currentSkills: z.string().min(2, messages.skills),
    weakAreas: z.string().min(2, messages.weakAreas),
    workLanguage: z.string().min(2, messages.language),
    targetGoal: z.string().min(2, messages.goal),
    targetGoalCustom: z.string().min(2, messages.goal),
    studyMinutesPerDay: z.coerce.number().min(10).max(240),
  })
}

type ProfileSchema = ReturnType<typeof createProfileSchema>
type ProfileFormInput = z.input<ProfileSchema>
type ProfileFormValues = z.output<ProfileSchema>

function listToText(items: string[]) {
  return items.join('\n')
}

function textToList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function ProfileSetupPage() {
  const { language, t } = useLanguage()
  const navigate = useNavigate()
  const storedProfile = getStoredProfile()
  const [currentTitle, setCurrentTitle] = useState(storedProfile?.currentTitle ?? 'Junior Software Engineer')
  const [selectedGoal, setSelectedGoal] = useState(storedProfile?.targetGoal ?? '')
  const suggestedGoals = getSuggestedGoalTemplates(currentTitle, language)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormInput, unknown, ProfileFormValues>({
    resolver: zodResolver(createProfileSchema(t.profile.validation)),
    defaultValues: {
      currentTitle: storedProfile?.currentTitle ?? 'Junior Software Engineer',
      yearsOfExperience: storedProfile?.yearsOfExperience ?? 1,
      responsibilities:
        storedProfile ? listToText(storedProfile.responsibilities) : 'Build React components\nFix bugs\nIntegrate APIs',
      currentSkills:
        storedProfile ? listToText(storedProfile.currentSkills) : 'React\nJavaScript\nGit\nBasic TypeScript',
      weakAreas: storedProfile ? listToText(storedProfile.weakAreas) : 'Testing\nSystem design\nCommunication',
      workLanguage: storedProfile?.workLanguage ?? 'English',
      targetGoal: storedProfile?.targetGoal ?? 'Become a Senior Software Engineer',
      targetGoalCustom: storedProfile?.targetGoalCustom ?? storedProfile?.targetGoal ?? 'Become a Senior Software Engineer',
      studyMinutesPerDay: storedProfile?.studyMinutesPerDay ?? 45,
    },
  })

  function selectGoal(goalTitle: string) {
    setSelectedGoal(goalTitle)
    setValue('targetGoal', goalTitle, { shouldValidate: true })
    setValue('targetGoalCustom', goalTitle, { shouldValidate: true })
  }

  function onSubmit(values: ProfileFormValues) {
    const profile: UserProfile = {
      ...values,
      responsibilities: textToList(values.responsibilities),
      currentSkills: textToList(values.currentSkills),
      weakAreas: textToList(values.weakAreas),
    }

    saveProfile(profile)
    navigate('/analysis')
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{t.profile.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">{t.profile.title}</h1>
        <p className="mt-3 text-slate-600">{t.profile.helper}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <input type="hidden" {...register('targetGoal')} />
        <Card className="grid gap-5 md:grid-cols-2">
          <Input
            label={t.profile.currentTitle}
            error={errors.currentTitle?.message}
            {...register('currentTitle', {
              onChange: (event) => setCurrentTitle(event.target.value),
            })}
          />
          <Input
            label={t.profile.years}
            type="number"
            min="0"
            error={errors.yearsOfExperience?.message}
            {...register('yearsOfExperience')}
          />
          <Input label={t.profile.language} error={errors.workLanguage?.message} {...register('workLanguage')} />
          <Input
            label={t.profile.studyTime}
            type="number"
            min="10"
            error={errors.studyMinutesPerDay?.message}
            {...register('studyMinutesPerDay')}
          />
          <Textarea
            label={t.profile.responsibilities}
            helper={t.profile.onePerLine}
            error={errors.responsibilities?.message}
            {...register('responsibilities')}
          />
          <Textarea
            label={t.profile.currentSkills}
            helper={t.profile.onePerLine}
            error={errors.currentSkills?.message}
            {...register('currentSkills')}
          />
          <Textarea
            label={t.profile.weakAreas}
            helper={t.profile.onePerLine}
            error={errors.weakAreas?.message}
            {...register('weakAreas')}
          />
          <Input
            label={t.profile.customGoal}
            helper={t.profile.customGoalHelper}
            error={errors.targetGoalCustom?.message}
            {...register('targetGoalCustom', {
              onChange: (event) => {
                setSelectedGoal(event.target.value)
                setValue('targetGoal', event.target.value, { shouldValidate: true })
              },
            })}
          />
        </Card>

        <section>
          <h2 className="text-xl font-semibold text-slate-950">{t.profile.chooseGoal}</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {suggestedGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} selected={selectedGoal === goal.title} onSelect={() => selectGoal(goal.title)} />
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit">{t.profile.submit}</Button>
        </div>
      </form>
    </div>
  )
}
