# SPEC 02 — Simplificación de Sesión de Entrenamiento

> **Status:** Approved
> **Date:** 2026-08-31
> **Objective:** Reemplazar el feature `workout-session` actual por una implementación simplificada que captura sets, reps, peso y notas por ejercicio y persiste los datos al backend mediante un POST batch al finalizar.

## Scope

**In:**

- Reescribir `frontend/src/features/client/workout-session/types.ts` con el modelo simplificado.
- Reescribir `frontend/src/features/client/workout-session/hooks/use-workout-session.ts` con un reducer de 5 acciones.
- Crear `frontend/src/features/client/workout-session/services/save-workout-session.ts` con la llamada HTTP POST batch.
- Crear `frontend/src/features/client/workout-session/hooks/use-save-workout-session.ts` con la mutación TanStack Query.
- Crear `frontend/src/features/client/workout-session/components/ActiveExerciseCard.tsx` (formulario del ejercicio activo).
- Crear `frontend/src/features/client/workout-session/components/CompletedExerciseCard.tsx` (ejercicio completado colapsado con botón Editar).
- Crear `frontend/src/features/client/workout-session/components/CollapsedExerciseCard.tsx` (ejercicio pendiente colapsado).
- Adaptar `frontend/src/features/client/workout-session/components/WorkoutTopBar.tsx` (quitar barra de pips, agregar botón ← con confirmación de salida, mantener timer y botón navegador ◔).
- Adaptar `frontend/src/features/client/workout-session/components/WorkoutNavigatorSheet.tsx` (simplificar, permitir saltar a cualquier ejercicio incluyendo completados).
- Reescribir `frontend/src/features/client/workout-session/page.tsx` con el nuevo layout lineal y el flujo de finalización.
- Eliminar `frontend/src/features/client/workout-session/components/WorkoutExerciseTable.tsx`.
- Eliminar `frontend/src/features/client/workout-session/components/WorkoutRestDialog.tsx`.
- Eliminar `frontend/src/features/client/workout-session/components/WorkoutHeader.tsx`.
- Al presionar "Finalizar" con ejercicios pendientes: mostrar un Alert Dialog de confirmación; si confirma, ejecutar el POST solo con los logs de los ejercicios completados.
- Al presionar "Finalizar" con todos completados: ejecutar el POST directamente sin confirmación.
- Si el POST falla: rehabilitar el botón de finalizar sin mostrar mensaje adicional.
- Si el POST tiene éxito: navegar a `/client/workout`.

**Out of scope (para futuros specs):**

- Pantalla de resumen post-entrenamiento (`summary_pending`).
- Timer de descanso entre series.
- Hoja de navegación con navegación no-lineal por set individual.
- Persistencia del estado de sesión entre recargas de página (sessionStorage / IndexedDB).
- Backend: definición e implementación del endpoint `POST /api/workout-sessions`.
- Notificación de éxito al guardar (toast de confirmación).

## Data model

### Estado del reducer (`WorkoutSessionState`)

```ts
type WorkoutPhase = "loading" | "active" | "finished";
type ExerciseStatus = "pending" | "active" | "completed";

interface ExerciseLog {
  assignedWorkoutExerciseId: number;
  completedSets: number;
  completedReps: number;
  performedWeight: number | null;
  notes: string | null;
  completedAt: string; // ISO timestamp (Date.now() al momento del POST)
}

interface SessionExercise {
  assignedWorkoutExerciseId: number;
  name: string;
  targetSets: number;
  targetReps: number;
  suggestedWeight: number | null;
  order: number;
  status: ExerciseStatus;
  log: ExerciseLog | null; // null mientras no se haya completado
}

interface WorkoutSessionState {
  phase: WorkoutPhase;
  exercises: SessionExercise[];
  currentIndex: number;
  startedAt: number;       // Date.now() al inicializar
  elapsedSeconds: number;
}
```

### Acciones del reducer

```ts
type WorkoutSessionAction =
  | { type: "initialize"; routine: Routine }
  | { type: "complete-exercise"; index: number; log: Omit<ExerciseLog, "assignedWorkoutExerciseId" | "completedAt"> }
  | { type: "edit-exercise"; index: number }    // reactiva un ejercicio completado
  | { type: "select-exercise"; index: number }  // navegador salta a cualquier ejercicio
  | { type: "tick" }
  | { type: "finish" };
```

### Contrato del POST batch (frontend → backend)

```ts
// POST /api/workout-sessions
// Request body:
{
  assigned_workout_id: number,
  logs: Array<{
    assigned_workout_exercise_id: number,
    completed_sets: number,
    completed_reps: number,
    performed_weight: number | null,
    notes: string | null,
    completed_at: string, // ISO timestamp único, el mismo para todos (momento del POST)
  }>
}

// Response esperada (2xx):
{ message: string }

// Error (4xx / 5xx):
// El frontend rehabilita el botón sin mensaje adicional.
```

### Formulario del ejercicio activo (`ActiveExerciseCard`)

Los valores que el usuario ingresa en el formulario:

```ts
interface ActiveExerciseForm {
  sets: number;          // inicia en targetSets del ejercicio
  reps: number;          // inicia en targetReps del ejercicio
  weight: number | null; // inicia en suggestedWeight (null si no aplica)
  notes: string;         // inicia vacío, colapsado por defecto
}
```

## Implementation plan

1. Reescribir `types.ts` con `WorkoutPhase`, `ExerciseStatus`, `ExerciseLog`, `SessionExercise` y `WorkoutSessionState`. Verificar que TypeScript compila sin errores.

2. Reescribir `hooks/use-workout-session.ts` con el reducer de 6 acciones (`initialize`, `complete-exercise`, `edit-exercise`, `select-exercise`, `tick`, `finish`), el `useEffect` del timer y el derived state (`currentExercise`, `completedCount`, `progressPercent`). Verificar que el hook exporta las acciones y el estado sin errores de tipo.

3. Crear `services/save-workout-session.ts` con la función pura `saveWorkoutSession(routineId: number, logs: ExerciseLog[]): Promise<{ message: string }>` que hace `POST /api/workout-sessions` con el body del contrato definido. Verificar que el módulo importa correctamente el cliente Axios de `@/lib/api`.

4. Crear `hooks/use-save-workout-session.ts` con `useSaveWorkoutSession()` que usa `useMutation` de TanStack Query, wrapping `saveWorkoutSession`. En `onSuccess` navegar a `/client/workout`. Verificar que TypeScript no reporta errores.

5. Crear `components/CompletedExerciseCard.tsx`: fila compacta con indicador verde (●), nombre del ejercicio, resumen `Xsets × Yreps · Zkg` y botón "Editar" que llama `onEdit(index)`. Props: `exercise: SessionExercise`, `index: number`, `onEdit: (index: number) => void`.

6. Crear `components/CollapsedExerciseCard.tsx`: fila con número circulado, nombre del ejercicio y objetivo en texto pequeño (`3 series · 10 reps · 22.5 kg`). Props: `exercise: SessionExercise`, `position: number`.

7. Crear `components/ActiveExerciseCard.tsx`: tarjeta expandida con label de posición (`EJERCICIO N DE M`), nombre, objetivo de referencia, steppers +/− para sets y reps, input numérico para peso (opcional), textarea colapsable para nota (`+ Agregar nota`), y botón primario `✓ Completar ejercicio` que llama `onComplete(index, { sets, reps, weight, notes })`. Props: `exercise: SessionExercise`, `index: number`, `total: number`, `onComplete: (index: number, log: ...) => void`.

8. Adaptar `components/WorkoutTopBar.tsx`: quitar la barra de pips de progreso por ejercicio; agregar botón `←` que abre un Alert Dialog de confirmación ("¿Abandonar el entrenamiento? Los datos no guardados se perderán") antes de navegar a `/client/workout`; mantener el timer `MM:SS` y el botón `◔` que llama `onOpenNavigator`. Props: `elapsedSeconds: number`, `onOpenNavigator: () => void`.

9. Adaptar `components/WorkoutNavigatorSheet.tsx`: simplificar la lista (eliminar estados por set); permitir tocar cualquier ejercicio (pending, active, completed) para saltar a él; mostrar estado visual diferenciado (completado = verde, activo = borde primario, pendiente = neutro). Props: `open: boolean`, `exercises: SessionExercise[]`, `currentIndex: number`, `onOpenChange: (open: boolean) => void`, `onSelectExercise: (index: number) => void`.

10. Reescribir `page.tsx`: componer el layout con `WorkoutTopBar`, barra de progreso con categoría y contador `N/M`, lista de ejercicios (mapeo lineal que renderiza `CompletedExerciseCard` / `ActiveExerciseCard` / `CollapsedExerciseCard` según `status`), y botón sticky `Finalizar entrenamiento · N/M` en el fondo. Manejar el Alert Dialog de confirmación para finalizar con pendientes. Llamar `useSaveWorkoutSession()` con los logs de ejercicios completados.

11. Eliminar `components/WorkoutExerciseTable.tsx`, `components/WorkoutRestDialog.tsx` y `components/WorkoutHeader.tsx`. Verificar que no quedan imports huérfanos.

12. Ejecutar `npm run build` en `frontend/` y `npm run lint` hasta que no haya errores ni warnings.

## Acceptance criteria

- [ ] El build de Next.js (`npm run build`) pasa sin errores de tipo ni warnings de ESLint.
- [ ] La pantalla carga los ejercicios de la rutina y muestra el primero como activo.
- [ ] El formulario de `ActiveExerciseCard` inicia con los valores objetivo del ejercicio (sets, reps, peso sugerido).
- [ ] Los steppers +/− de sets y reps no permiten valores menores a 1.
- [ ] El campo de peso acepta valor nulo (campo vacío) y valores decimales.
- [ ] El textarea de nota permanece colapsado hasta que el usuario toca `+ Agregar nota`.
- [ ] Al completar un ejercicio, pasa a `CompletedExerciseCard` y el siguiente pendiente pasa a `ActiveExerciseCard`.
- [ ] El botón "Editar" de `CompletedExerciseCard` reactiva el ejercicio como activo con los valores previamente ingresados.
- [ ] El navegador (◔) abre el `WorkoutNavigatorSheet` con la lista completa.
- [ ] Al seleccionar cualquier ejercicio en el navegador (incluyendo completados), ese ejercicio pasa a ser el activo.
- [ ] El botón ← muestra un Alert Dialog de confirmación antes de navegar a `/client/workout`.
- [ ] El timer `MM:SS` incrementa cada segundo mientras la sesión está activa.
- [ ] Al presionar "Finalizar" con todos los ejercicios completados, se ejecuta el POST directamente sin diálogo previo.
- [ ] Al presionar "Finalizar" con ejercicios pendientes, aparece un Alert Dialog de confirmación.
- [ ] El POST batch incluye `assigned_workout_id` y el array `logs` solo con ejercicios completados.
- [ ] Cada log en el array incluye `assigned_workout_exercise_id`, `completed_sets`, `completed_reps`, `performed_weight` (null si vacío), `notes` (null si vacío), y `completed_at` (mismo ISO timestamp para todos).
- [ ] Si el POST falla (cualquier código de error), el botón "Finalizar" vuelve a habilitarse sin crash.
- [ ] Si el POST tiene éxito, la app navega a `/client/workout`.
- [ ] Los archivos `WorkoutExerciseTable.tsx`, `WorkoutRestDialog.tsx` y `WorkoutHeader.tsx` no existen.

## Decisions taken and discarded

- **Sí:** reducer simplificado con 6 acciones en lugar de 15. El modelo de datos por ejercicio (no por set) elimina la complejidad innecesaria.
- **Sí:** `completed_at` único al momento del POST para todos los logs. Reduce la complejidad del estado sin pérdida de precisión significativa.
- **Sí:** incluir `assigned_workout_id` en el body del POST. Permite al backend validar la pertenencia sin resolver joins adicionales.
- **Sí:** Alert Dialog de confirmación al salir (←). Protege contra pérdida accidental de datos.
- **Sí:** Alert Dialog de confirmación al finalizar con pendientes. El usuario toma una decisión informada.
- **Sí:** botón "Finalizar" se rehabilita en error sin mensaje adicional. Comportamiento minimalista; el backend puede añadir mensajes en el futuro.
- **No:** pantalla de resumen (`summary_pending`). Se elimina en este spec y se reserva para un spec futuro.
- **No:** timer de descanso. Se elimina completamente; no está en el modelo simplificado.
- **No:** persistencia entre recargas. La sesión es efímera; si el usuario recarga, reinicia.
- **No:** toast de éxito al guardar. La navegación a `/client/workout` es suficiente feedback.
- **No:** el navegador filtra ejercicios completados. Se permite saltar a cualquiera (incluyendo completados) para facilitar correcciones.

## Risks

| Riesgo | Mitigación |
|---|---|
| El endpoint `POST /api/workout-sessions` no existe en el backend al momento de implementar | El service y la mutation se implementan con el contrato definido en este spec; el backend lo implementa por su parte. El botón "Finalizar" falla grácilmente rehabilitándose. |
| El `assigned_workout_id` no está disponible directamente en el objeto `Routine` que devuelve `useMyRoutine` | Verificar en el paso 1 de implementación que `Routine.id` es el `assigned_workout_id` correcto, o identificar el campo exacto antes de implementar el service. |

## What is not in this spec

- Pantalla de resumen post-entrenamiento.
- Timer de descanso entre series.
- Persistencia de sesión ante recarga de página.
- Implementación del endpoint backend `POST /api/workout-sessions`.
- Notificaciones de éxito (toast).
- Historial de sesiones completadas.
