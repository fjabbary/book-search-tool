import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import { FetchDocs } from './utils'

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders search input and button with "Search" text', () => {
  render(<App />);
  expect(screen.getByLabelText('search-query')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
})


test('renders sort select dropdown', () => {
  render(<App />);
  expect(screen.getByLabelText('sort-by')).toBeInTheDocument();
})


const search = {
  data: {
    // Check http://openlibrary.org/search.json?q=the+great+gatsby
    docs: [
      {
        title: 'Before Gatsby',
        author: 'F. Scott Fitzgerald',
        published_date: '2001',
        cover: 'https://covers.openlibrary.org/b/id/815772-M.jpg',
      },
      {
        title: 'Beyond Gatsby',
        author: 'Robert McParland',
        published_date: '2015',
        cover: 'https://covers.openlibrary.org/b/id/8869915-M.jpg',
      },
      {
        title: 'Forced into Heavens War',
        author: 'Jonathan D Gatsby',
        published_date: '2020',
        cover: 'https://covers.openlibrary.org/b/id/11059644-M.jpg',
      },
    ]
  }
};

jest.mock("axios");

describe("FetchDocs", () => {
  describe("when API call is successful", () => {
    it("should return doc list", async () => {
      const docs = [
        {
          title: 'Before Gatsby',
          author: 'F. Scott Fitzgerald',
          published_date: '2001',
          cover: 'https://covers.openlibrary.org/b/id/815772-M.jpg',
        },
        {
          title: 'Beyond Gatsby',
          author: 'Robert McParland',
          published_date: '2015',
          cover: 'https://covers.openlibrary.org/b/id/8869915-M.jpg',
        },
        {
          title: 'Forced into Heavens War',
          author: 'Jonathan D Gatsby',
          published_date: '2020',
          cover: 'https://covers.openlibrary.org/b/id/11059644-M.jpg',
        },
      ];

      axios.get.mockResolvedValueOnce(search);
      const result = await FetchDocs();

      expect(result).toEqual(docs);
    });
  });
});

