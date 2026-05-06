import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {
		fetch("https://www.swapi.tech/api/people/?page=1&limit=10&expanded=true")
			.then(res => res.json())
			.then(data =>
				dispatch({ type: "set_people", payload: data.results })
			)

		fetch("https://www.swapi.tech/api/planets/?page=1&limit=10")
			.then(res => res.json())
			.then(data => {
				console.log("planets", data)
				dispatch({ type: "set_planets", payload: data.results })
			})

		fetch("https://www.swapi.tech/api/starships/?page=1&limit=10")
			.then(res => res.json())
			.then(data => dispatch({ type: "set_starships", payload: data.results }))
	}, [])

	return (
		<div>
			<h1>Star Wars Blog</h1>
			
			<div className="py-5 bg-body-tertiary">
				<div className="container">
					<h2>Characters</h2>
					<div className="d-flex overflow-auto gap-3 pb-3">
						{ store.people.map ((person, index) => {
							return (
								<div className="col" key={index} style={{ minWidth: "350px" }}>
									<div className="card shadow-sm">

										<svg aria-label="Placeholder: Thumbnail" className="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%" xmlns="http://www.w3.org/2000/svg">
											<title>Placeholder</title>
											<rect width="100%" height="100%" fill="#55595c"></rect>
											<text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
										</svg>
										
										<div className="card-body">
											<h5 className="card-title mb-3">{person.properties.name}</h5>
											<p className="card-text"><strong>Gender:</strong> { person.properties.gender }</p>
											<p className="card-text"><strong>Hair Color:</strong> { person.properties.hair_color }</p>
											<p className="card-text"><strong>Eye Color:</strong> { person.properties.eye_color }</p>
											<button type="button" className="btn btn-sm btn-outline-secondary">Ver detalle</button>	
										</div>
										
									</div>
								</div>
							)
						})}
					</div>				
				</div>
			</div>


			<p>{ store.planets.length } planetas cargados</p>
			<p>{ store.starships.length } naves cargados</p>
		</div>
  )
}