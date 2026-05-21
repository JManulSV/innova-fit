<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAssignedWorkoutExerciseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sets' => 'sometimes|integer|min:1',
            'reps' => 'sometimes|integer|min:1',
            'rest_seconds' => 'sometimes|integer|min:0',
            'weight' => 'sometimes|numeric|min:0',
        ];
    }
}
