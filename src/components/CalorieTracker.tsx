import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"



type CalorieTrackerProps = {
    activities: Activity[]
}



export default function CalorieTracker({activities} : CalorieTrackerProps) {


    // Contadores
    // Donde actividad 1  es comida     activity.category === 1     
    // En el siguiente elemento el reduce suma las calorias si es tipo comida y si es tipo ejercicio no lo suma
    // Estas son las calorias de comida
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
    
    
    // Estas son las calorias de ejercicio
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
    
    
    //Calorias Total
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])
    


    /*

    
    Aqui toma los CalorieDisplay para agregar las calorias
        <CalorieDisplay
            calories={caloriesConsumed}
            text="Consumidas"
        />


    */

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Ejercicio"
                />
                <CalorieDisplay
                    calories={netCalories}
                    text="Diferencia"
                />
            </div>
 
        </>
    )
}
