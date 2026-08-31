# SPEC 01 — Exercise Selector

> **Status:** Approved
> **Date:** 2026-08-31
> **Objective:** Build a responsive exercise selector UI for coach forms that replaces the current exercise pickers in templates and assigned routines.

## Scope

**In:**

- Create a base `ExerciseSelector` component in `frontend/src/features/coach/exercises/components/exercise-selector/`.
- Use a single responsive UI: `Dialog` on desktop and `Sheet` on mobile.
- Add a header with title and close action.
- Add a search field for exercises.
- Add muscle-group filters.
- Render a list of exercises with selected and unselected states.
- Keep the selected-items panel always visible.
- Add a footer with the selected count and `Cancelar` / `Agregar` actions.
- Include visual states for loading, empty, selected, and default list content.
- Replace the current exercise pickers used by templates and assigned routines.

**Out of scope (for future specs):**

- Selection business logic.
- Persistence of selected exercises.
- Backend integration.
- Data model changes.
- Form validation.
- Extended component documentation.
- New business flows outside templates and assigned routines.

## Data model

This feature introduces no new data structures. It reuses the existing `Exercise` data and the current selection state from the consuming flows.

## Implementation plan

1. Create `ExerciseSelector` in `frontend/src/features/coach/exercises/components/exercise-selector/` with responsive `Dialog` and `Sheet` containers.
2. Build the internal UI for header, search, filters, list, selected-items panel, and footer.
3. Define loading and empty visual states inside the component.
4. Replace `ExercisePickerModal.tsx` in templates with `ExerciseSelector`.
5. Replace `ExercisePickerDialog.tsx` in assigned routines with `ExerciseSelector`.
6. Update the template and assigned-routine views so they open the new component.
7. Verify visually that the selector renders correctly on desktop and mobile and shows every intended state.

## Acceptance criteria

- [ ] The selector opens as a `Dialog` on desktop and as a `Sheet` on mobile.
- [ ] The component shows search, filters, list, selected-items panel, and footer.
- [ ] The selected-items panel stays visible even when nothing is selected.
- [ ] The empty state shows exactly `Aún no has seleccionado ejercicios`.
- [ ] The loading state is visually distinct from the normal list state.
- [ ] The templates and assigned-routines flows no longer rely on the old picker UI as their primary selector.
- [ ] A visual review of the target screens shows no layout breakage.

## Decisions taken and discarded

- **Yes:** one responsive variant. It keeps the experience consistent and avoids duplicating UI.
- **Yes:** `ExerciseSelector` as the base name. It is more reusable than a picker-specific name.
- **Yes:** the selected-items panel is always visible. It prevents layout jumps.
- **Yes:** replace both existing picker UIs. It reduces duplication and aligns the experience.
- **No:** business logic in this spec. That belongs in the next spec.
- **No:** extended documentation in this spec. The requested scope is UI/UX only.

## Risks

- Reusing one component across both flows may require a small prop contract unification.
- The two current flows may not expose identical state, so the UI wrapper may need lightweight adaptation.

## What is not in this spec

- Final selection logic.
- Persistence of selected exercises.
- API calls.
- Validation.
- New flows outside templates and assigned routines.
