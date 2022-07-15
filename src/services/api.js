//https://api.themoviedb.org/3/movie/now_playing?api_key=5e3c0e6959866de662068b8e4fea427b&language=pt-BR

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;