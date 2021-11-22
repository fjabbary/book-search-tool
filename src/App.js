import './App.css';
import { FetchDocs } from './utils'
import { useState } from 'react'
import Loading from './components/Loading'
import Header from './components/Header'

function App() {
  const [query, setQuery] = useState('')
  const [queryResult, setQueryResult] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('title')


  const sortByAttr = (attr) => {
    const sortedBooks = books.sort((a, b) => a[attr] > b[attr] ? 1 : -1)
    setBooks([...sortedBooks])
    setSortBy(attr)
  }

  const searchBooks = async () => {
    if (query === '' || query === null) return

    setLoading(true)

    const docs = await FetchDocs(query)

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
              onChange={e => setQuery(e.target.value)}
              placeholder="Plase input the query"
            />
            <button type="button" onClick={searchBooks}>Search</button>
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
          {books.length !== 0 ? <h1 className="results-text">Found ({books.length}) results for {queryResult}</h1> : ""}
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
        </div>
      </div>
    </div>
  );
}

export default App;
