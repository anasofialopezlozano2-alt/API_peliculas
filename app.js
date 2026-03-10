let pagina = 1;

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
    pagina += 1;
    cargarPeliculas();
});

btnAnterior.addEventListener("click", () => {
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
});

const cargarPeliculas = async() => {

    try{

        const respuesta = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=e6e4c450fbf961c15520e8eb20be3813&language=es-COL&page=${pagina}`
        );

        if (respuesta.status === 200){

            const datos = await respuesta.json();

            let peliculas = "";

            datos.results.forEach(pelicula => {

                peliculas += `
                <a href="pelicula.html?id=${pelicula.id}">
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                </a>
                `;

            });

            document.getElementById("contenedor").innerHTML = peliculas;

        } else if(respuesta.status === 401){
            console.log("Pusiste la llave mal");
        } else if(respuesta.status === 404){
            console.log("La pelicula que buscas no existe");
        } else{
            console.log("Error desconocido");
        }

    } catch(error){
        console.log(error);
    }

}

cargarPeliculas();