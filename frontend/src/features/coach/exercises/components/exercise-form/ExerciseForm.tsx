import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { exerciseSchema, ExerciseFormValues } from '../../schemas/exercise.schema'
import { ExerciseCreateRequest, ExerciseUpdateRequest } from '../../types/exercise.types'
import { useRouter } from 'next/navigation'
import GeneralInfoSection from './components/GeneralInfoSection'
import InstructionsSection from './components/InstructionsSection'
import MuscleGroupsSection from './components/MuscleGroupsSection'
import FormActions from './components/FormActions'
import { useCreateExercise } from '../../hooks/use-create-exercise'
import { useEditExercise } from '../../hooks/use-edit-exercise'

interface ExerciseFormProps {
  type?: 'create' | 'edit'
  initialValues?: ExerciseFormValues
  exerciseId?: string
}

export default function ExerciseForm({ type = 'create', initialValues, exerciseId }: ExerciseFormProps) {

  const { register, handleSubmit, reset, formState, setValue } = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: initialValues ?? { name: '', description: '', instructions: '', muscle_groups: [] },
  })

  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [customGroup, setCustomGroup] = useState('')

  // Initialize selected groups and reset form when initialValues change (edit mode)
  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
      setSelectedGroups(initialValues.muscle_groups ?? [])
    }
  }, [initialValues, reset])

  const { mutateAsync: createExercise, isPending: isCreating, error: createError } = useCreateExercise();
  const { mutateAsync: editExercise, isPending: isEditing, error: editError } = useEditExercise();

  const isPending = isCreating || isEditing;
  const error = createError || editError;

  const router = useRouter();
  
  useEffect(() => {
    setValue('muscle_groups', selectedGroups)
  }, [selectedGroups, setValue])

  const toggleGroup = (group: string) => {
    setSelectedGroups((prev) => (prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]))
  }

  const addCustomGroup = () => {
    const g = customGroup.trim()
    if (!g) return
    if (!selectedGroups.includes(g)) setSelectedGroups((s) => [...s, g])
    setCustomGroup('')
  }

  const handleFormSubmit = async (values: ExerciseFormValues) => {
    const payload = { ...values, muscle_groups: selectedGroups }

    try {
      if (type === 'create') {
        await createExercise(payload as ExerciseCreateRequest)
        router.push('/coach/exercises')
      }
      if (type === 'edit' && exerciseId) {
        await editExercise({ id: exerciseId, data: payload as ExerciseUpdateRequest })
        router.push('/coach/exercises')
      }
    } catch (error) {
      console.error('Error submitting exercise form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 w-full">
      <GeneralInfoSection register={register} errors={formState.errors} />
      <InstructionsSection register={register} errors={formState.errors} />
      <MuscleGroupsSection selectedGroups={selectedGroups} onToggle={toggleGroup} customGroup={customGroup} onCustomChange={setCustomGroup} onAddCustom={addCustomGroup} />
      <FormActions isLoading={isPending} type={type} />
    </form>
  )
}
