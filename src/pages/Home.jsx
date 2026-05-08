import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { Link } from "react-router-dom"

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
				dispatch({ type: "set_planets", payload: data.results })
			})

		fetch("https://www.swapi.tech/api/starships/?page=1&limit=10")
			.then(res => res.json())
			.then(data => dispatch({ type: "set_starships", payload: data.results }))
	}, [])

	return (
		<div>

			<nav className="navbar bg-dark px-4">
				<span className="navbar-brand text-white">Star Wars Blog</span>
				<div className="dropdown">

					<button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
						Favorites {store.favorites.length > 0 && <span className="badge bg-danger">{store.favorites.length}</span>}
					</button>

					<ul className="dropdown-menu dropdown-menu-end">
						{store.favorites.length === 0 
							? <li><span className="dropdown-item text-muted">No favorites yet</span></li>
							: store.favorites.map((fav, index) => (
							<li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
								<span>{fav.properties?.name || fav.name}</span>
								<button className="btn btn-sm" onClick={() => dispatch({ type: "remove_favorite", payload: fav })}>
								<i className="bi bi-trash text-danger"></i>
								</button>
							</li>
							))
						}
					</ul>
				</div>
			</nav>
			
			<div className="py-5 bg-body-tertiary">
				<div className="container">
					<h2>Characters</h2>
					<div className="d-flex overflow-auto gap-3 pb-3">
						{ store.people.map ((person, index) => {
							const isFavorite = store.favorites.some(fav => fav.uid === person.uid)
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

											<Link to={`/single/people/${person.uid}`} className="btn btn-sm btn-outline-secondary">
												View details
											</Link>

											<button 
												className="btn btn-sm"
												onClick={() => dispatch({ 
													type: isFavorite ? "remove_favorite" : "add_favorite", 
													payload: person 
												})}
											>
												<i className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
											</button>

										</div>
										
									</div>
								</div>
							)
						})}
					</div>				
				</div>
			</div>

			<div className="py-5 bg-body-tertiary">
				<div className="container">
					<h2>Planets</h2>
					<div className="d-flex overflow-auto gap-3 pb-3">
						{ store.planets.map ((planet, index) => {
							const isFavorite = store.favorites.some(fav => fav.uid === planet.uid)
							return (
								<div className="col" key={index} style={{ minWidth: "350px" }}>
									<div className="card shadow-sm">

										<svg aria-label="Placeholder: Thumbnail" className="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%" xmlns="http://www.w3.org/2000/svg">
											<title>Placeholder</title>
											<rect width="100%" height="100%" fill="#55595c"></rect>
											<text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
										</svg>
										
										<div className="card-body">
											<h5 className="card-title mb-3">{planet.name}</h5>
											<Link to={`/single/planets/${planet.uid}`} className="btn btn-sm btn-outline-secondary">
												View details
											</Link>
											<button 
												className="btn btn-sm"
												onClick={() => dispatch({ 
													type: isFavorite ? "remove_favorite" : "add_favorite", 
													payload: planet
												})}
											>
												<i className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
											</button>	
										</div>
										
									</div>
								</div>
							)
						})}
					</div>				
				</div>
			</div>

			<div className="py-5 bg-body-tertiary">
				<div className="container">
					<h2>Starships</h2>
					<div className="d-flex overflow-auto gap-3 pb-3">
						{ store.starships.map ((starship, index) => {
							const isFavorite = store.favorites.some(fav => fav.uid === starship.uid)
							return (
								<div className="col" key={index} style={{ minWidth: "350px" }}>
									<div className="card shadow-sm">

										<svg aria-label="Placeholder: Thumbnail" className="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%" xmlns="http://www.w3.org/2000/svg">
											<title>Placeholder</title>
											<rect width="100%" height="100%" fill="#55595c"></rect>
											<text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
										</svg>
										
										<div className="card-body">
											<h5 className="card-title mb-3">{starship.name}</h5>
											<Link to={`/single/starships/${starship.uid}`} className="btn btn-sm btn-outline-secondary">
												View details
											</Link>

											<button 
												className="btn btn-sm"
												onClick={() => dispatch({ 
													type: isFavorite ? "remove_favorite" : "add_favorite", 
													payload: starship
												})}
											>
												<i className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
											</button>

										</div>
										
									</div>
								</div>
							)
						})}
					</div>				
				</div>
			</div>
		</div>
  )
}