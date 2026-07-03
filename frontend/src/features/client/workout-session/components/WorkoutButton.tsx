interface WorkoutButtonProps{
    onClick: () => void,
}

export default function WorkoutButton({onClick}: WorkoutButtonProps) {
  return (
    <button className='p-2 bg-blue-950 text-white rounded cursor-pointer' onClick={onClick}>
        Siguiente ejercicio
    </button>
  )
}
