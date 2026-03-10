const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const cargarPelicula = async () => {

    const respuesta = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=e6e4c450fbf961c15520e8eb20be3813&language=es`
    );

    const datos = await respuesta.json();

    const pelicula = `
    <div class="hero" style="background-image:url(https://image.tmdb.org/t/p/original/${datos.backdrop_path})">

        <div class="tarjeta">

            <img class="poster" src="https://image.tmdb.org/t/p/w500/${datos.poster_path}">

            <div class="info">

                <h1>${datos.title}</h1>

                <p class="rating">⭐ ${datos.vote_average}</p>

                <p class="fecha">📅 ${datos.release_date}</p>

                <p class="descripcion">${datos.overview}</p>

                <a class="volver" href="index.html">⬅ Volver</a>

            </div>

        </div>

    </div>
    `;

    document.getElementById("detalle").innerHTML = pelicula;
}

cargarPelicula();