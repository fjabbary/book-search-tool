import './App.css';
import { FetchDocs } from './utils'
import { useState } from 'react'
import Loading from './components/Loading'

function App() {
  const [query, setQuery] = useState('')
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
  }

  if (loading) return <Loading />

  return (
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
        {books.map((book, index) => (
          <div className="book d-flex" key={index}>
            <div className="book-title center"><h5>{book.title}</h5></div>
            <div className="book-cover v-center">
              <img src={book.cover} width="100%" alt="Cover" />
            </div>
            <div className="book-author center"><h5>{book.author}</h5></div>
            <div className="book-published-date center"><h5>{book.published_date}</h5></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
