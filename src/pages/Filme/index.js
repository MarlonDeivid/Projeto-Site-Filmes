import { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import './filme-info.css'

import api from '../../services/api';

function Filme(){

  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilmes(){
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "5e3c0e6959866de662068b8e4fea427b",
          language: "pt-BR",
        }
    })

    .then((response) => {
      setFilme(response.data);
      setLoading(false);
    })
    .catch(() => {
      console.log("FILME NÃO ENCONTRADO!")
      navigate("/", { replace: true })
      return;
    })
  }

    loadFilmes();

    return () => {
      console.log("Componente foi desmontado!")
    }
  }, [navigate, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    let filmeSalvos = JSON.parse(minhaLista) || [];

    const hastFilme = filmeSalvos.some((filmeSalvo) => filmeSalvo.id  === filme.id)

    if(hastFilme){
      toast.warn("ESSE FILME JÁ ESTÁ NA LISTA!")
      return;
    }

    filmeSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmeSalvos));
    toast.success("Filme salvo com sucesso!")
  }

  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando Detalhes...</h1>
      </div>
    )
  }

  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Filme;