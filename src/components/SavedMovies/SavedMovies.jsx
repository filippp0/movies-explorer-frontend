import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCallback, useEffect, useState } from "react";

export default function SavedMovies({ savedMovie, onDelete, setIsError }) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovie)
  const [searchedMouvie, setSearchedMovie] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)

  const filter = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search)
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isCheck ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

  function searchMovies(search) {
    setFirstEntrance(false)
    filter(search, isCheck, savedMovie)
  }

  useEffect(() => {
    if (savedMovie.length === 0) {
      setFirstEntrance(true)
    } else {
      setFirstEntrance(false)
    }
    filter(searchedMouvie, isCheck, savedMovie)
  }, [filter, savedMovie, isCheck, searchedMouvie])

  function changeShort() {
    if (isCheck) {
      setIsCheck(false)
      setFirstEntrance(false)
      filter(searchedMouvie, false, savedMovie)
    } else {
      setIsCheck(true)
      setFirstEntrance(false)
      filter(searchedMouvie, true, savedMovie)
    }
  }

  return (
    <>
      <SearchForm
        isCheck={isCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMouvie}
        changeShort={changeShort}
        setIsError={setIsError}
        firstEntrance={firstEntrance}
        savedMovie={savedMovie}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
        firstEntrance={firstEntrance}
      />
    </>
  )
}
