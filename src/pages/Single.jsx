import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Single = () => {
  const { store } = useGlobalReducer()
  const { type, theId } = useParams()
  const [details, setDetails] = useState(null)

  const fields = {
    people: [
      { label: "Gender", key: "gender" },
      { label: "Birth Year", key: "birth_year" },
      { label: "Height", key: "height" },
      { label: "Mass", key: "mass" },
      { label: "Eye Color", key: "eye_color" },
      { label: "Hair Color", key: "hair_color" },
    ],
    planets: [
      { label: "Climate", key: "climate" },
      { label: "Terrain", key: "terrain" },
      { label: "Population", key: "population" },
      { label: "Gravity", key: "gravity" },
      { label: "Diameter", key: "diameter" },
      { label: "Orbital Period", key: "orbital_period" },
    ],
    starships: [
      { label: "Model", key: "model" },
      { label: "Manufacturer", key: "manufacturer" },
      { label: "Crew", key: "crew" },
      { label: "Passengers", key: "passengers" },
      { label: "Max Speed", key: "max_atmosphering_speed" },
      { label: "Cost", key: "cost_in_credits" },
    ]
  }

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${type}/${theId}`)
      .then(res => res.json())
      .then(data => setDetails(data.result))
  }, [type, theId])

  const p = details?.properties

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <svg width="100%" height="600" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#55595c"/>
            <text x="50%" y="50%" fill="#eceeef" dy=".3em" textAnchor="middle">No image available</text>
          </svg>
        </div>
        
        <div className="col-md-6">
          <h1 className="display-4 fw-bold">{p?.name}</h1>
          <p className="text-muted mb-4">{details?.description}</p>
          <hr />
          {fields[type].map((field, index) => (
            <div className="col-6 mb-3" key={index}>
              <strong>{field.label}</strong>
              <p>{p?.[field.key]}</p>
            </div>
          ))}
          <Link to="/" className="btn btn-primary mt-3">Back home</Link>
        </div>
      </div>
    </div>
  )
}