export const initialStore=()=>{
  return{
    people: [],
    planets: [],
    starships: [],
    favorites: []
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
    case 'add_favorite':
      return {...store, favorites: [...store.favorites, action.payload]}
    case 'remove_favorite':
      return {...store, favorites: store.favorites.filter( fav => fav.uid !== action.payload.uid )}
    default:
      throw Error ('Accion desconocida')
  }
}
