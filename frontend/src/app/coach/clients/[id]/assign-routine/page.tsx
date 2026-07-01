"use client";
import { useExercises } from '@/features/coach/exercises/hooks/use-exercises';
import AddExerciseModal from '@/features/coach/templates/components/AddExerciseModal';
import EditExerciseModal from '@/features/coach/templates/components/EditExerciseModal';
import { useTemplate } from '@/features/coach/templates/hooks/use-template';
import { useTemplates } from '@/features/coach/templates/hooks/use-templates';
import { useTemplateBuilder } from '@/features/coach/templates/hooks/useTemplateBuilder';
import { Template, WorkoutTemplateExercise } from '@/features/coach/templates/types/templates.type';
import { EllipsisVerticalIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAssignedRoutine } from '@/features/coach/assigned-routines/hooks/use-assigned-routines';

function AssignRoutinePage() {
    const router = useRouter();
    const { id } = useParams();

    const {data: templates, isLoading: isLoadingTemplates} = useTemplates();
    const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);

    const { mutateAsync: assignRoutine, isPending: isAssigning } = useAssignedRoutine();
    
    const templateId = selectedTemplateId?.toString();
    const {data: templateData, isLoading: isLoadingTemplate} = useTemplate(templateId);
    const template = templateData?.data;

    const { data: exercises, isLoading: isLoadingExercises } = useExercises();
    
    const [formData, setFormData] = useState<{name: string, description: string, start_date: string, end_date: string}>({name: "", description: "", start_date: "", end_date: ""});
    
    const { initializeExercises, selectedExercises, addExercise, deleteExercise, updateExercise, getExercise } = useTemplateBuilder();
    
    const [activeModal, setActiveModal] = useState<"add" | "edit" | null>(null);
    const [exerciseToEdit, setExerciseToEdit] = useState<WorkoutTemplateExercise|null>(null);
    const closeModal = () => {
        setActiveModal(null);
        setExerciseToEdit(null);
    };

    useEffect(() => {
        if(!template){
            return;
        }

        initializeExercises(template?.exercises || []);
        setFormData({name: template.name, description: template.description, start_date: "", end_date: ""});
    }, [template]);

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await assignRoutine({
            id: id as string,
            data: {
                client_id: id as string,
                template_id: selectedTemplateId ? selectedTemplateId : undefined,
                name: formData.name,
                notes: formData.description,
                start_date: formData.start_date,
                end_date: formData.end_date,
                exercises: selectedExercises
            }
        });

        router.push(`/coach/clients/`);
    };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <section>
            <div className='flex justify-between py-4'>
                <label htmlFor='template'>Seleccionar Plantilla</label>
                <label>Opcional - cargar los campos automáticamente</label>
            </div>
            <div className='flex gap-2'>
                {isLoadingTemplates ? "Cargando..." : 
                templates?.map((template: Template) => (
                    <div 
                    key={template.id} 
                    className="cursor-pointer hover:bg-gray-100 p-4 rounded border border-gray-200 w-64"
                    onClick={() => {setSelectedTemplateId(template.id); console.log(template)}}
                    >
                        <div className="font-semibold">{template.name}</div>
                        <div className="text-sm text-gray-600">{template.description}</div>
                        <div>{template.exercises?.length || 0} ejercicios</div>
                    </div>
                ))}
            </div>
        </section>
        <div className='space-y-4 flex flex-col'>
            <h2>Detalles de la Rutina</h2>
            <label htmlFor="name">Nombre de la Rutina</label>
            <input type="text" id="name" name="name" disabled={isLoadingTemplate} className='border border-gray-300 rounded p-2' value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>

            <label htmlFor="notes">Descripción</label>
            <textarea id="notes" name="notes" disabled={isLoadingTemplate} className='border border-gray-300 rounded p-2' value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>

            <div className='flex gap-4'>
                <div className='flex flex-col'>
                    <label htmlFor="startDate">Fecha de inicio</label>
                    <input type="date" id="startDate" name="startDate" disabled={isLoadingTemplate} className='border border-gray-300 rounded p-2' value={formData.start_date} onChange={(e) => setFormData({...formData, start_date: e.target.value})}/>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="endDate">Fecha de fin</label>
                    <input type="date" id="endDate" name="endDate" disabled={isLoadingTemplate} className='border border-gray-300 rounded p-2' value={formData.end_date} onChange={(e) => setFormData({...formData, end_date: e.target.value})}/>
                </div>
            </div>

        </div>

        <div className='py-6'>
          <div className='flex justify-between py-4'>
            <h3>Ejercicios</h3>
            <button type='button' onClick={() => setActiveModal("add")} className='bg-blue-500 text-white px-4 py-2 rounded'>Agregar Ejercicio</button>
          </div>
            {
              isLoadingTemplate ? (
                <div className="p-4 border">
                  <p>Cargando ejercicios...</p>
                </div>
              ) : (
            selectedExercises.map((exercise: WorkoutTemplateExercise) => (
              <div key={exercise.exercise_id} className="p-4 border">
                <div className="flex justify-between">
                  <p className="font-semibold text-lg text-gray-800">{exercise.name}</p>
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </div>
                {/* <p className="text-sm text-gray-600">{exercise.description}</p> */}
                <div className="flex gap-2 mt-2">
                  <p className="text-sm text-gray-600 rounded-full bg-gray-100 px-2 py-1">{exercise.sets} series</p>
                  <p className="text-sm text-gray-600 rounded-full bg-gray-100 px-2 py-1">{exercise.reps} repeticiones</p>
                  <p className="text-sm text-gray-600 rounded-full bg-gray-100 px-2 py-1">{exercise.rest_seconds}s descanso</p>
                </div>
                <div className="flex gap-4">
                  <button type="button" className="text-blue-500" onClick={() => {setExerciseToEdit(exercise); setActiveModal("edit")}}>
                    Editar
                  </button>
                  <button type="button" className="text-red-500" onClick={() => deleteExercise(exercise.exercise_id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))
              )
            }
        </div>
        <button type="submit" disabled={isAssigning} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">{isAssigning ? "Asignando..." : "Asignar rutina"}</button>
      </form>
      {activeModal === "add" && (<AddExerciseModal exercises={exercises?.data?.data || []} isLoading={isLoadingExercises} onClose={closeModal} getExercise={getExercise} onAdd={addExercise} />)}
      {activeModal === "edit" && exerciseToEdit && (<EditExerciseModal exercise={exerciseToEdit} closeModal={closeModal} updateExercise={updateExercise}  />)}
    </div>
  )
}

export default AssignRoutinePage;