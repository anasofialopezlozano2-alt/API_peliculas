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

const cargarCarrusel = async () => {

const respuesta = await fetch(
"https://api.themoviedb.org/3/trending/movie/week?api_key=e6e4c450fbf961c15520e8eb20be3813&language=es"
);

const datos = await respuesta.json();

let peliculas = "";

datos.results.forEach(pelicula => {

peliculas += `
<a href="pelicula.html?id=${pelicula.id}">

<img class="poster-carrusel"
src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">

</a>
`;

});

document.getElementById("carrusel").innerHTML = peliculas;

}

const cargarPeliculas = async() => {

try{

const respuesta = await fetch(
`https://api.themoviedb.org/3/movie/popular?api_key=e6e4c450fbf961c15520e8eb20be3813&language=es&page=${pagina}`
);

const datos = await respuesta.json();

let peliculas = "";

datos.results.forEach(pelicula => {

peliculas += `
<a href="pelicula.html?id=${pelicula.id}" class="link-pelicula">

<div class="pelicula">

<img class="poster"
src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">

<h3 class="titulo">${pelicula.title}</h3>

<p class="rating"> Puntuación: ${pelicula.vote_average}</p>

</div>

</a>
`;

});

document.getElementById("contenedor").innerHTML = peliculas;

}catch(error){
console.log(error);
}

}

const carrusel = document.getElementById("carrusel");

document.getElementById("btnDerecha").addEventListener("click",()=>{
carrusel.scrollLeft += 400;
});

document.getElementById("btnIzquierda").addEventListener("click",()=>{
carrusel.scrollLeft -= 400;
});

cargarCarrusel();
cargarPeliculas();