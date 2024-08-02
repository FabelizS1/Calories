import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'   // import de uuid para id unico
import { categories } from "../data/categories"
import type { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"



//
type FormProps = {
  dispatch: Dispatch<ActivityActions>, // Aqui se coloca el Dispatch y entre <> se agrego  ActivityActions   que contiene todas las actividads
   
  state: ActivityState   // Este es el State 
}




const initialState : Activity = {
  id: uuidv4(),   // Es el id unico
  category: 1,
  name: '',
  calories: 0
}




export default function Form({dispatch, state} : FormProps) {


  // Para el formulario como es de varios campos se hace asi
  /*const [activity, setActivity] = useState({
    category:1,
    name: '',
    calories: 0
  })*/
  const [activity, setActivity] = useState<Activity>(initialState)  // Va a ser igual a initial State



  //Con esto se actualiza el formulario y se toma el valor del id actual 
  useEffect(() => {
    //Si el valor tiene un state activeId ejecuta la siguiente opcion
    if(state.activeId) {
      const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId )[0]  // Tomo el primervalor por eso pongo [0]
      setActivity(selectedActivity)   //Aqui actualizo el state con la actividad seleccionada en el formulario
    }
  }, [state.activeId])




  //Por convencion se usa handleChange,  esta funcion es para escribir en el State
  // Donde e es el valor al poner el mouse sobre e en la funcion
  // Donde e   puede ser     ChangeEvent<HTMLSelectElement>    o un     ChangeEvent<HTMLInputElement>
  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

    //Este valos toma el id del input o select del formulario
    console.log(e.target.id)
    //Este valor toma el value del select del formulario
    console.log(e.target.value)


    // Para validar que sea numerico y que sea la categoria o calories, esto retorna true or false
    const isNumberField = ['category', 'calories'].includes(e.target.id)


    //Donde [e.target.id] es el id  y   e.target.value  es el valor

    setActivity({
      ...activity, //Este es el state con todo lo escrito 
      [e.target.id]: isNumberField ? +e.target.value : e.target.value  // Aqui valida  si es numerico coloca  +e.target.value    o si no    e.target.value
    })
  }



  // Funcion para validar
  /*
      Con esta opcion se agrega al disabled la opcion y seria asi como la siguiente
        <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />

  */
  const isValidActivity = () => {
    const { name, calories } = activity   // de activity tomo el valor de name y calories
    return name.trim() !== '' && calories > 0
  }
 




  // El onSubmit para cuando le haga click al boton de guardar
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    //aqui se llama al dispatch de activity-reducer.ts  en especifico a save-activity   y  payload paso el activity
    dispatch({type: 'save-activity', payload: {newActivity: activity}}) 

/*

setActivity({
  category:1,
  name: '',
  calories: 0
})



setActivity( initialState )


*/


    setActivity({

      ...initialState,  // Toma una copia del initialState   y tomo los valores ... para indicar que es una copia de lo actual
      id: uuidv4()      // Aqui se agrega un ID unico 
    })
  }

  return (
    <form 
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category" className="font-bold">Categoría:</label>
          <select
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name" className="font-bold">Actividad:</label>
          <input
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
            value={activity.name}
            onChange={handleChange}
          />
      </div>

      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories" className="font-bold">Calorias:</label>
          <input
            id="calories"
            type="number"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Calorias. ej. 300 o 500"
            value={activity.calories}
            onChange={handleChange}
          />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />

    </form>
  )
}
