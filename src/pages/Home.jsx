import { useState } from 'react'
import axios from 'axios'

// components
import { Input } from "@/components/ui/input";
import PokemonCard from "../components/PokemonCard";
import LoadingSpinner from '../components/LoadingSpinner'


const Home = () => {
  const [query, setQuery] = useState('')
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try{
      const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${query}`);
      setPokemonData(response.data.data.slice(0,10))
      setQuery("")
    }
    catch (err){
      setError("Character not found.")
    } finally {
      setLoading(false)
    }
  }


  return (

    <div className="bg-white p-5 rounded-lg">
      <h1 className="text-center md:text-left ml-1 mb-1">Find your pokémon card</h1>
      {!loading && 
        <form onSubmit={handleSearch} id='pokeSearch'>
          <Input
            type="search"
            id='pokeSearch'
            placeholder="Search..."
            className="pl-5 sm:w-[400px] md:w-[400px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
      </form>}

      {!loading ? 
      <ul>
        {pokemonData.length > 0 ? 
          (pokemonData.map((pokemon) => (
            <li key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </li>
          ))) 
        :
          <p>Could not find pokémon card.</p>
        }
      </ul> 
      :
      <LoadingSpinner />
      }
    </div>

  )
}

export default Home
