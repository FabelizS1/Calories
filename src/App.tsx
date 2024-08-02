import { useReducer, useEffect, useMemo } from 'react'     //Para importar al reducer
import Form from "./components/Form"
import { activityReducer, initialState } from './reducers/activity-reducer'    /// Importacion del archivo Reducer 
import ActivityList from './components/ActivityList'
import CalorieTracker from './components/CalorieTracker'

function App() {

    const [state, dispatch] = useReducer(activityReducer, initialState)  // Aqui se ejecuta la informacion de los reducer


    console.log(state)

/*

Se le pasa el valor de dispatch a Form
    <Form 
        dispatch={dispatch}
        state={state}              Aqui se le agrega  la opcion de  state
    />



Se pasa el valor de activities    
    <ActivityList 
        activities={state.activities}     Aqui se le pasa el state de activities
        dispatch={dispatch}               
    />






Esto es el boton de Reiniciar App
Aqui pone {!canRestartApp()}   en negacion para que ponga el valor en disabled
    <button
        className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10'
        disabled={!canRestartApp()}         
        onClick={() => dispatch({type: 'restart-app'})}
    >
        Reiniciar App
    </button>








*/




//Agregar local storage
    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities))  //Variable activities con el json de state.activities
    }, [state.activities])



    const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])  // Cuando tenga actividades
    
    return (
        <>
            <header className="bg-lime-600 py-3">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-center text-lg font-bold text-white uppercase">
                        Contador de Calorias
                    </h1>

                    <button
                        className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10'
                        disabled={!canRestartApp()}
                        onClick={() => dispatch({type: 'restart-app'})}
                    >
                        Reiniciar App
                    </button>
                </div>
            </header>

            <section className="bg-lime-500 py-20 px-5">
                <div className="max-w-4xl mx-auto">
                    <Form 
                        dispatch={dispatch}
                        state={state}
                    />
                </div>
            </section>

            <section className='bg-gray-800 py-10'>
                <div className='max-w-4xl mx-auto'>
                    <CalorieTracker 
                        activities={state.activities}
                    />
                </div>
            </section>

            <section className="p-10 mx-auto max-w-4xl">
                <ActivityList 
                    activities={state.activities}
                    dispatch={dispatch}
                />
            </section>
        </>
    )
}

export default App
