export const initialStore=()=>{
  return{
    people: [],
    planets: [],
    starships: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_people':
      return { ...store, people: action.payload }
    case 'set_planets':
      return { ...store, planets: action.payload}
    case 'set_starships':
      return { ...store, starships: action.payload}
    default:
      throw Error ('Accion desconocida')
  }
}
