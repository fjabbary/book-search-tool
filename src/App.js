import './App.css';
import { FetchDocs } from './utils'
import { useState } from 'react'
import Loading from './components/Loading'
import Header from './components/Header'
import classnames from 'classnames'

function App() {
  const [query, setQuery] = useState('')
  const [hasResult, setHasResult] = useState('')
  const [queryResult, setQueryResult] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('title')
  const [errors, setErrors] = useState({ queryError: '' })

  const changeHandler = (e) => {
    setQuery(e.target.value)
    e.target.value.length > 0 ? setErrors(false) : setErrors(true)
  }

  const sortByAttr = (attr) => {
    const sortedBooks = books.sort((a, b) => a[attr] > b[attr] ? 1 : -1)
    setBooks([...sortedBooks])
    setSortBy(attr)
  }

  const searchBooks = async () => {
    if (query === '' || query === null) {
      setErrors({ queryError: 'Please enter valid value' })
      return
    }

    setLoading(true)

    const docs = await FetchDocs(query)
    docs.length !== 0 ? setHasResult('true') : setHasResult('false')

    setBooks(
      docs
        .filter(doc => (doc.title && doc.first_publish_year && doc.author_name && doc.cover_i))
        .map(doc => ({
          title: doc.title,
          cover: `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`,
          author: doc.author_name[0],
          published_date: doc.first_publish_year
        }))
        .sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1))

    setLoading(false)
    setQueryResult(query)
    setQuery("")
    setErrors({})
  }

  if (loading) return <Loading />

  return (
    <div className="app">
      <Header />
      <div className="container mx-auto">

        <div className="header h-center">
          <div className="search-box">
            <input
              aria-label="search-query"
              value={query}
              onChange={changeHandler}
              placeholder="Plase input the query"
              className={classnames({ 'error': errors.queryError })}
            />
            <button type="button" onClick={searchBooks}>Search</button>
            <p className="text-error"><small>{errors.queryError}</small></p>
          </div>

          <div className="sort-box">
            <label htmlFor="sortBy">Sort By &nbsp;</label>
            <select
              aria-label="sort-by"
              id="sortBy"
              onChange={(e) => sortByAttr(e.target.value)}
              value={sortBy}
            >
              <option value="title">Title</option>
              <option value="published_date">Published Date</option>
            </select>
          </div>
        </div>

        <div className="book-container" data-testid='books'>
          {hasResult === 'true' && <div>
            <h1 className="results-text">Found ({books.length}) results for "{queryResult}"</h1>
            <div className="book-list">
              {books.map((book, index) => (
                <div className="book d-flex" key={index}>
                  <div className="book-details">
                    <p><strong>Title:</strong> {book.title}</p>
                    <p><strong>Author:</strong> {book.title}</p>
                    <p><strong>Published Date:</strong> {book.published_date}</p>
                  </div>
                  <div>
                    <div className="book-cover">
                      <img src={book.cover} width="100%" alt="Cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}

          {hasResult === 'false' && <h1 className="results-text">No Result Found for "{queryResult}"</h1>}
        </div>
      </div>
    </div>
  );
}

export default App;
