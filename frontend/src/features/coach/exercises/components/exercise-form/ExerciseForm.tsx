import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { exerciseSchema, ExerciseFormValues } from '../../schemas/exercise.schema'
import { ExerciseCreateRequest, ExerciseUpdateRequest } from '../../types/exercise.types'
import { useRouter } from 'next/navigation'
import GeneralInfoSection from './components/GeneralInfoSection'
import InstructionsSection from './components/InstructionsSection'
import BodyPartsSection from './components/BodyPartsSection'
import FormActions from './components/FormActions'
import { useCreateExercise } from '../../hooks/use-create-exercise'
import { useEditExercise } from '../../hooks/use-edit-exercise'
import { useBodyParts } from '../../../body-parts/hooks/use-body-parts'

interface ExerciseFormProps {
  type?: 'create' | 'edit'
  initialValues?: ExerciseFormValues
  exerciseId?: string
}

export default function ExerciseForm({ type = 'create', initialValues, exerciseId }: ExerciseFormProps) {
  const { data: bodyParts = [] } = useBodyParts();
  console.log(bodyParts);

  const { register, handleSubmit, reset, formState, setValue, control, getValues } = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: initialValues ?? { name: '', description: '', instructions: '', body_parts_ids: [] },
  })

  // Initialize selected body parts and reset form when initialValues change (edit mode)
  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const { mutateAsync: createExercise, isPending: isCreating } = useCreateExercise();
  const { mutateAsync: editExercise, isPending: isEditing } = useEditExercise();

  const isPending = isCreating || isEditing;

  const router = useRouter();
  
  const selectedBodyPartIds = useWatch({ control, name: 'body_parts_ids' }) ?? []

  const toggleBodyPart = (bodyPartId: number) => {
    const currentSelectedIds = getValues('body_parts_ids') ?? []
    const nextSelectedIds = currentSelectedIds.includes(bodyPartId)
      ? currentSelectedIds.filter((id) => id !== bodyPartId)
      : [...currentSelectedIds, bodyPartId]

    setValue('body_parts_ids', nextSelectedIds, { shouldDirty: true, shouldValidate: true })
  }

  const handleFormSubmit = async (values: ExerciseFormValues) => {
    const payload = { ...values, body_parts_ids: values.body_parts_ids ?? selectedBodyPartIds }

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
      <GeneralInfoSection 
        register={register} 
        errors={formState.errors} 
      />
      
      <InstructionsSection 
        register={register} 
        errors={formState.errors} 
      />
      
      <BodyPartsSection
        bodyParts={bodyParts}
        selectedBodyPartIds={selectedBodyPartIds}
        onToggle={toggleBodyPart}
      />
      <FormActions isLoading={isPending} type={type} />
    </form>
  )
}
