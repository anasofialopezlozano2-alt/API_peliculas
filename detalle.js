const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const cargarPelicula = async () => {

const respuesta = await fetch(
`https://api.themoviedb.org/3/movie/${id}?api_key=e6e4c450fbf961c15520e8eb20be3813&language=es`
);

const datos = await respuesta.json();

const respuestaVideos = await fetch(
`https://api.themoviedb.org/3/movie/${id}/videos?api_key=e6e4c450fbf961c15520e8eb20be3813`
);

const datosVideos = await respuestaVideos.json();

const trailer = datosVideos.results.find(video => video.type === "Trailer");

const pelicula = `
<div class="hero"
style="background-image:url(https://image.tmdb.org/t/p/original/${datos.backdrop_path})">

<div class="tarjeta">

<img class="poster-detalle"
src="https://image.tmdb.org/t/p/w500/${datos.poster_path}">

<div class="info">

<h1>${datos.title}</h1>

<p>✰ Puntuación: ${datos.vote_average}</p>
<p>📅︎ Fecha de estreno: ${datos.release_date}</p>
<p>⏱︎ Duración: ${datos.runtime} min</p>

<p>🏷︎ Genero: ${datos.genres.map(g => g.name).join(", ")}</p>

<p>🏢︎ Produtora: ${datos.production_companies.map(p => p.name).join(", ")}</p>

<p>✎ Descripción: ${datos.overview}</p>

<div class="botones">

<a href="index.html" class="volver">⬅ Volver</a>

${trailer ? `
<a class="btn-trailer"
href="https://www.youtube.com/watch?v=${trailer.key}"
target="_blank">
📽︎ Ver Trailer
</a>
` : ""}

</div>

</div>

</div>

</div>
`;

document.getElementById("detalle").innerHTML = pelicula;

}

cargarPelicula();