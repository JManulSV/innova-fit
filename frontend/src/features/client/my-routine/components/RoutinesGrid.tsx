import { useMyRoutines } from "../hooks/use-my-routine";
import { Routine } from "../types";
import Link from "next/link";

export default function RoutinesGrid() {
  const { data:routines, isLoading, error } = useMyRoutines();

  if (isLoading) {
    return <p>Esta cargando...</p>
  }

  if (error) {
    return <p>Ha ocurrido un error</p>
  }
  
  return (
    <>
    <h2 className="text-2xl font-bold mb-4">Rutinas de esta semana</h2>
    <div className="py-4 flex flex-col">
       {routines?.length > 0 ? (
        routines.map((routine: Routine) => (
          <Link href={'#'} key={routine.id} className="bg-slate-900 text-white p-4 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
            <p>{new Date(routine.start_date).toLocaleDateString('es-MX', { weekday: 'long' })}</p>
            <h2 className="text-xl font-semibold">{routine.name}</h2>
            <p>{routine.exercises?.length || 0} ejercicios</p>
          </Link>
        ))
       ) : (
        <p>No hay rutinas</p>
       )}
    </div>
    </>
  );
}