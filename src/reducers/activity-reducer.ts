import { Activity } from "../types"


//Son acciones que indican que esta sucediendo
//Una accion consta de 2 partes
//type es la descripcion que sucede
//payload informacion que modifica o que se va a agregar al state
//contiene todos los actions que necesita
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity : Activity } } |     // Se crea una accion llamada save-activity  y se envia por el payload la informacion que en este caso seria      newActivity : Activity    donde newActivity  es el nombre del parametro
    { type: 'set-activeId', payload: { id : Activity['id'] } } |         // Actuaalizar el id actual
    { type: 'delete-activity', payload: { id : Activity['id'] } } |
    { type: 'restart-app' }     /////  Reiniciar la aplicacion y no necesita que se le pase un payload




//Este es el tipo de dato para initial state    
export type ActivityState = {
    activities : Activity[],  // El state se va a llamar activities y va a ser de tipo Activity[]
    activeId: Activity['id']  //Tipo de dato para activityId
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')  ///// El localstorage

    return activities ? JSON.parse(activities) : []   /// Validar si existe la informacion en la variable de activities colocar  JSON.parse(activities)   sino el valor de  []
}

export const initialState : ActivityState = { //Al initialState se le asocia el ActivityState
    // activities: []  Va a iniciar en un arreglo vacio
    // activityId: ''     Para agregar el id de la actividad  
    activities: localStorageActivities(),   ///// Aqui se llama al localStorageActivities()
    activeId: ''
}



// Este state conecta al initialState con el ActivityState
export const activityReducer = (
        state : ActivityState = initialState,  // El state va a ser el ActivityState y esta va a ser igual initialState
        action: ActivityActions      // En las acciones le agregas ActivityActions
    ) => {

    if(action.type === 'save-activity') {

        //Todo lo que se escriba aqui maneja la logica para actualizar al state

        console.log(action.payload.newActivity)

        let updatedActivities : Activity[] = []   //Declaro un arreglo vacio


        console.log('state.activeId:::::', state.activeId)
        // Validar que se esta actualizando el state de activeId
        if(state.activeId) {
            console.log('Edicion!!!!!')
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity )

          } else {
            console.log('Agregar!!!!!')
            updatedActivities = [...state.activities, action.payload.newActivity] //Aqui carga toda la informacion previa con ...state.activities y carga el nuevo valor que es    action.payload.newActivity
        }
        return {
            ...state,  // Esto es una copia del state por si tiene muchas states aparte del de activities se recomienda tomar esta copia
            activities: updatedActivities,  
            //activities = [...state.activities, action.payload.newActivity]     Aqui carga toda la informacion previa con ...state.activities y carga el nuevo valor que es    action.payload.newActivity 
            activeId: ''    // Este hace un valor vacio de id porque sino reeescribe la actividad anterior
        }
    }

    if(action.type === 'set-activeId') {
         return {
            ...state,                     //Copia del state
            activeId: action.payload.id   //Para actualizar al id
         }
    }

    if(action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id )   // Aqui se seleccionan todas las opciones que sean diferentes a id
        }
    }

    if(action.type === 'restart-app') {
        return {
            activities: [],     ////// Reiniciar todo a vacio
            activeId: ''
        }
    }

    return state
}