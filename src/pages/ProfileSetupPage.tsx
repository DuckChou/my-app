import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState, type DragEvent } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { Input } from '../components/common/Input'
import { GoalCard } from '../components/career/GoalCard'
import { getSuggestedGoalTemplates } from '../data/goalTemplates'
import { useLanguage, type Language } from '../i18n/LanguageContext'
import type { UserProfile } from '../types/career'
import { getStoredProfile, saveProfile } from '../utils/storage'

type ListField = 'responsibilities' | 'currentSkills' | 'weakAreas'

type WizardCopy = {
  steps: string[]
  next: string
  back: string
  review: string
  save: string
  add: string
  manualPlaceholder: string
  dragHint: string
  roleTitle: string
  roleIntro: string
  responsibilityTitle: string
  responsibilityIntro: string
  skillsTitle: string
  skillsIntro: string
  weakTitle: string
  weakIntro: string
  goalTitle: string
  goalIntro: string
  timeTitle: string
  timeIntro: string
  reviewTitle: string
  reviewIntro: string
}

const wizardCopy: Record<Language, WizardCopy> = {
  en: {
    steps: ['Role', 'Responsibilities', 'Skills', 'Weak areas', 'Goal', 'Study time', 'Review'],
    next: 'Next',
    back: 'Back',
    review: 'Review profile',
    save: 'Save and Generate Analysis',
    add: 'Add',
    manualPlaceholder: 'Add your own item',
    dragHint: 'Drag a prompt here, click a prompt, or type your own.',
    roleTitle: 'Start with your current role',
    roleIntro: 'Pick a close match or type the exact title you use at work.',
    responsibilityTitle: 'Add your real responsibilities',
    responsibilityIntro: 'Choose the work you actually do. You can add more than one.',
    skillsTitle: 'List your current skills',
    skillsIntro: 'Add tools, technical skills, and workplace strengths you already use.',
    weakTitle: 'Name the areas that feel weak',
    weakIntro: 'This helps the plan focus on the right gaps without pretending everything is equal.',
    goalTitle: 'Write your target goal',
    goalIntro: 'Use the suggestions if they fit, or write any goal in your own words.',
    timeTitle: 'Set a realistic study rhythm',
    timeIntro: 'Pick a daily time budget you can repeat even during a busy work week.',
    reviewTitle: 'Review your profile',
    reviewIntro: 'Check the details before generating your gap analysis.',
  },
  zh: {
    steps: ['岗位', '职责', '技能', '薄弱项', '目标', '学习时间', '确认'],
    next: '下一步',
    back: '返回',
    review: '查看资料',
    save: '保存并生成分析',
    add: '添加',
    manualPlaceholder: '添加自定义内容',
    dragHint: '拖拽提示到这里，点击提示，或手动输入。',
    roleTitle: '先填写当前岗位',
    roleIntro: '选择接近的岗位，或输入你工作中实际使用的职位名称。',
    responsibilityTitle: '添加真实工作职责',
    responsibilityIntro: '选择你实际负责的工作，可以添加多项。',
    skillsTitle: '列出当前技能',
    skillsIntro: '添加你已经在使用的工具、技术能力和职场优势。',
    weakTitle: '指出目前薄弱的地方',
    weakIntro: '这样计划会聚焦真正的差距，而不是平均用力。',
    goalTitle: '写下你的目标',
    goalIntro: '如果建议合适可以直接选择，也可以用自己的话写任何目标。',
    timeTitle: '设置现实的学习节奏',
    timeIntro: '选择即使工作忙也能持续执行的每日学习时间。',
    reviewTitle: '确认资料',
    reviewIntro: '生成差距分析前，先检查这些信息。',
  },
}

const promptsByLanguage = {
  en: {
    titles: ['Junior Software Engineer', 'Frontend Developer', 'Data Analyst', 'QA Engineer', 'Product Support Specialist', 'Career Switcher'],
    responsibilities: [
      'Build React components',
      'Fix bugs from tickets',
      'Integrate APIs',
      'Join sprint planning',
      'Write documentation',
      'Review pull requests',
      'Communicate with designers',
      'Support production issues',
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'Git', 'CSS', 'API integration', 'SQL', 'Python', 'Communication', 'Testing basics'],
    weakAreas: [
      'Testing',
      'System design',
      'Technical communication',
      'English speaking',
      'Code review confidence',
      'Architecture decisions',
      'Production debugging',
      'Cloud deployment',
      'AI fundamentals',
    ],
    studyTimes: ['15', '30', '45', '60'],
  },
  zh: {
    titles: ['初级软件工程师', '前端开发工程师', '数据分析师', '测试工程师', '产品支持专员', '转行学习者'],
    responsibilities: ['构建 React 组件', '修复工单缺陷', '集成 API', '参与迭代计划', '编写文档', '评审 Pull Request', '与设计师沟通', '支持生产问题'],
    skills: ['React', 'JavaScript', 'TypeScript', 'Git', 'CSS', 'API 集成', 'SQL', 'Python', '沟通', '测试基础'],
    weakAreas: ['测试', '系统设计', '技术沟通', '英语表达', '代码评审信心', '架构决策', '生产问题排查', '云部署', 'AI 基础'],
    studyTimes: ['15', '30', '45', '60'],
  },
} satisfies Record<Language, Record<string, string[]>>

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

function addItem(value: string, item: string) {
  const items = textToList(value)
  return items.includes(item) ? value : [...items, item].join('\n')
}

type PromptBankProps = {
  prompts: string[]
  onChoose: (prompt: string) => void
}

function PromptBank({ prompts, onChoose }: PromptBankProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          draggable
          onClick={() => onChoose(prompt)}
          onDragStart={(event) => event.dataTransfer.setData('text/plain', prompt)}
          className="cursor-grab rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-500 hover:bg-slate-50 active:cursor-grabbing"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}

type SingleDropZoneProps = {
  label: string
  value?: string
  hint: string
  onDropPrompt: (prompt: string) => void
}

function SingleDropZone({ label, value, hint, onDropPrompt }: SingleDropZoneProps) {
  const [justDropped, setJustDropped] = useState(false)

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const prompt = event.dataTransfer.getData('text/plain')
    if (!prompt) return

    onDropPrompt(prompt)
    setJustDropped(true)
    window.setTimeout(() => setJustDropped(false), 700)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      className={`rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 transition ${
        justDropped ? 'drop-success' : value ? '' : 'drop-hint'
      }`}
    >
      <p className="text-sm font-semibold text-slate-950">{label}</p>
      <p className="mt-1 text-sm text-slate-500">{hint}</p>
      {value ? <p className="mt-3 rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-800">{value}</p> : null}
    </div>
  )
}

type DropZoneListProps = {
  label: string
  hint: string
  items: string[]
  onDropPrompt: (prompt: string) => void
  onRemove: (item: string) => void
}

function DropZoneList({ label, hint, items, onDropPrompt, onRemove }: DropZoneListProps) {
  const [justDropped, setJustDropped] = useState(false)

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const prompt = event.dataTransfer.getData('text/plain')
    if (!prompt) return

    onDropPrompt(prompt)
    setJustDropped(true)
    window.setTimeout(() => setJustDropped(false), 700)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      className={`rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 transition ${
        justDropped ? 'drop-success' : items.length > 0 ? '' : 'drop-hint'
      }`}
    >
      <p className="text-sm font-semibold text-slate-950">{label}</p>
      <p className="mt-1 text-sm text-slate-500">{hint}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onRemove(item)}
              className="rounded-full bg-slate-950 px-3 py-1.5 text-sm font-medium text-white"
              aria-label={`Remove ${item}`}
            >
              {item} x
            </button>
          ))
        ) : (
          <span className="text-sm text-slate-400">{hint}</span>
        )}
      </div>
    </div>
  )
}

type ManualListInputProps = {
  placeholder: string
  buttonLabel: string
  onAdd: (item: string) => void
}

function ManualListInput({ placeholder, buttonLabel, onAdd }: ManualListInputProps) {
  const [value, setValue] = useState('')

  function submit() {
    const cleanValue = value.trim()
    if (!cleanValue) return
    onAdd(cleanValue)
    setValue('')
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            submit()
          }
        }}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 shadow-sm focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
      />
      <Button type="button" variant="secondary" onClick={submit}>
        {buttonLabel}
      </Button>
    </div>
  )
}

const stepFields: Array<Array<keyof ProfileFormInput>> = [
  ['currentTitle', 'yearsOfExperience', 'workLanguage'],
  ['responsibilities'],
  ['currentSkills'],
  ['weakAreas'],
  ['targetGoalCustom'],
  ['studyMinutesPerDay'],
  [],
]

export function ProfileSetupPage() {
  const { language, t } = useLanguage()
  const copy = wizardCopy[language]
  const prompts = promptsByLanguage[language]
  const navigate = useNavigate()
  const storedProfile = getStoredProfile()
  const [step, setStep] = useState(0)
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useForm<ProfileFormInput, unknown, ProfileFormValues>({
    resolver: zodResolver(createProfileSchema(t.profile.validation)),
    defaultValues: {
      currentTitle: storedProfile?.currentTitle ?? '',
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

  const values = useWatch({ control })
  const currentTitle = values.currentTitle ?? ''
  const suggestedGoals = getSuggestedGoalTemplates(currentTitle, language)
  const listValues = useMemo(
    () => ({
      responsibilities: textToList(values.responsibilities ?? ''),
      currentSkills: textToList(values.currentSkills ?? ''),
      weakAreas: textToList(values.weakAreas ?? ''),
    }),
    [values.responsibilities, values.currentSkills, values.weakAreas],
  )

  function updateList(field: ListField, nextValue: string) {
    setValue(field, nextValue, { shouldDirty: true, shouldValidate: true })
  }

  function addPrompt(field: ListField, prompt: string) {
    updateList(field, addItem(getValues(field), prompt))
  }

  function removeItem(field: ListField, item: string) {
    updateList(
      field,
      textToList(getValues(field))
        .filter((existingItem) => existingItem !== item)
        .join('\n'),
    )
  }

  function selectGoal(goalTitle: string) {
    setValue('targetGoal', goalTitle, { shouldDirty: true, shouldValidate: true })
    setValue('targetGoalCustom', goalTitle, { shouldDirty: true, shouldValidate: true })
  }

  async function goNext() {
    const valid = await trigger(stepFields[step])
    if (valid) setStep((currentStep) => Math.min(currentStep + 1, copy.steps.length - 1))
  }

  function goBack() {
    setStep((currentStep) => Math.max(currentStep - 1, 0))
  }

  function onSubmit(values: ProfileFormValues) {
    const profile: UserProfile = {
      ...values,
      targetGoal: values.targetGoalCustom,
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

      <ol className="grid gap-2 sm:grid-cols-4 lg:grid-cols-7" aria-label="Profile steps">
        {copy.steps.map((label, index) => (
          <li
            key={label}
            className={`rounded-md border px-3 py-2 text-sm font-semibold ${
              index === step ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-600'
            }`}
          >
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...register('targetGoal')} />

        {step === 0 ? (
          <Card className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">{copy.roleTitle}</h2>
              <p className="mt-2 text-slate-600">{copy.roleIntro}</p>
            </div>
            <PromptBank prompts={prompts.titles} onChoose={(title) => setValue('currentTitle', title, { shouldValidate: true })} />
            <SingleDropZone
              label={t.profile.currentTitle}
              value={values.currentTitle}
              hint={copy.dragHint}
              onDropPrompt={(title) => setValue('currentTitle', title, { shouldValidate: true })}
            />
            <div className="grid gap-5 md:grid-cols-3">
              <Input label={t.profile.currentTitle} error={errors.currentTitle?.message} {...register('currentTitle')} />
              <Input label={t.profile.years} type="number" min="0" error={errors.yearsOfExperience?.message} {...register('yearsOfExperience')} />
              <Input label={t.profile.language} error={errors.workLanguage?.message} {...register('workLanguage')} />
            </div>
          </Card>
        ) : null}

        {step === 1 ? (
          <Card className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">{copy.responsibilityTitle}</h2>
              <p className="mt-2 text-slate-600">{copy.responsibilityIntro}</p>
            </div>
            <PromptBank prompts={prompts.responsibilities} onChoose={(prompt) => addPrompt('responsibilities', prompt)} />
            <DropZoneList
              label={t.profile.responsibilities}
              hint={copy.dragHint}
              items={listValues.responsibilities}
              onDropPrompt={(prompt) => addPrompt('responsibilities', prompt)}
              onRemove={(item) => removeItem('responsibilities', item)}
            />
            <ManualListInput placeholder={copy.manualPlaceholder} buttonLabel={copy.add} onAdd={(item) => addPrompt('responsibilities', item)} />
            {errors.responsibilities?.message ? <p className="text-sm text-red-700">{errors.responsibilities.message}</p> : null}
          </Card>
        ) : null}

        {step === 2 ? (
          <Card className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">{copy.skillsTitle}</h2>
              <p className="mt-2 text-slate-600">{copy.skillsIntro}</p>
            </div>
            <PromptBank prompts={prompts.skills} onChoose={(prompt) => addPrompt('currentSkills', prompt)} />
            <DropZoneList
              label={t.profile.currentSkills}
              hint={copy.dragHint}
              items={listValues.currentSkills}
              onDropPrompt={(prompt) => addPrompt('currentSkills', prompt)}
              onRemove={(item) => removeItem('currentSkills', item)}
            />
            <ManualListInput placeholder={copy.manualPlaceholder} buttonLabel={copy.add} onAdd={(item) => addPrompt('currentSkills', item)} />
            {errors.currentSkills?.message ? <p className="text-sm text-red-700">{errors.currentSkills.message}</p> : null}
          </Card>
        ) : null}

        {step === 3 ? (
          <Card className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">{copy.weakTitle}</h2>
              <p className="mt-2 text-slate-600">{copy.weakIntro}</p>
            </div>
            <PromptBank prompts={prompts.weakAreas} onChoose={(prompt) => addPrompt('weakAreas', prompt)} />
            <DropZoneList
              label={t.profile.weakAreas}
              hint={copy.dragHint}
              items={listValues.weakAreas}
              onDropPrompt={(prompt) => addPrompt('weakAreas', prompt)}
              onRemove={(item) => removeItem('weakAreas', item)}
            />
            <ManualListInput placeholder={copy.manualPlaceholder} buttonLabel={copy.add} onAdd={(item) => addPrompt('weakAreas', item)} />
            {errors.weakAreas?.message ? <p className="text-sm text-red-700">{errors.weakAreas.message}</p> : null}
          </Card>
        ) : null}

        {step === 4 ? (
          <Card className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">{copy.goalTitle}</h2>
              <p className="mt-2 text-slate-600">{copy.goalIntro}</p>
            </div>
            <Input
              label={t.profile.customGoal}
              helper={t.profile.customGoalHelper}
              error={errors.targetGoalCustom?.message}
              {...register('targetGoalCustom', {
                onChange: (event) => setValue('targetGoal', event.target.value, { shouldValidate: true }),
              })}
            />
            <SingleDropZone
              label={t.profile.customGoal}
              value={values.targetGoalCustom}
              hint={copy.dragHint}
              onDropPrompt={selectGoal}
            />
            <section>
              <h3 className="text-lg font-semibold text-slate-950">{t.profile.chooseGoal}</h3>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                {suggestedGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    selected={values.targetGoalCustom === goal.title}
                    onSelect={() => selectGoal(goal.title)}
                  />
                ))}
              </div>
            </section>
          </Card>
        ) : null}

        {step === 5 ? (
          <Card className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">{copy.timeTitle}</h2>
              <p className="mt-2 text-slate-600">{copy.timeIntro}</p>
            </div>
            <PromptBank
              prompts={prompts.studyTimes.map((minutes) => `${minutes} min/day`)}
              onChoose={(prompt) => setValue('studyMinutesPerDay', Number.parseInt(prompt, 10), { shouldValidate: true })}
            />
            <SingleDropZone
              label={t.profile.studyTime}
              value={String(values.studyMinutesPerDay ?? '')}
              hint={copy.dragHint}
              onDropPrompt={(prompt) => setValue('studyMinutesPerDay', Number.parseInt(prompt, 10), { shouldValidate: true })}
            />
            <Input
              label={t.profile.studyTime}
              type="number"
              min="10"
              error={errors.studyMinutesPerDay?.message}
              {...register('studyMinutesPerDay')}
            />
          </Card>
        ) : null}

        {step === 6 ? (
          <Card className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">{copy.reviewTitle}</h2>
              <p className="mt-2 text-slate-600">{copy.reviewIntro}</p>
            </div>
            <dl className="grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold text-slate-500">{t.profile.currentTitle}</dt>
                <dd className="mt-1 text-slate-950">{values.currentTitle}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500">{t.profile.customGoal}</dt>
                <dd className="mt-1 text-slate-950">{values.targetGoalCustom}</dd>
              </div>
              {(['responsibilities', 'currentSkills', 'weakAreas'] as const).map((field) => (
                <div key={field}>
                  <dt className="text-sm font-semibold text-slate-500">{t.profile[field]}</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {listValues[field].map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="text-sm font-semibold text-slate-500">{t.profile.studyTime}</dt>
                <dd className="mt-1 text-slate-950">{String(values.studyMinutesPerDay ?? '')}</dd>
              </div>
            </dl>
          </Card>
        ) : null}

        <div className="flex justify-between gap-3">
          <Button type="button" variant="secondary" onClick={goBack} disabled={step === 0}>
            {copy.back}
          </Button>
          {step < copy.steps.length - 1 ? (
            <Button type="button" onClick={goNext}>
              {step === copy.steps.length - 2 ? copy.review : copy.next}
            </Button>
          ) : (
            <Button type="submit">{copy.save}</Button>
          )}
        </div>
      </form>
    </div>
  )
}
