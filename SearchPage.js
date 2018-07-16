import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'


class SearchPage extends Component {
	handleSubmit = (e) => {
    e.preventDefault()
      const values = serializeForm(e.target, {hash:true})
      if (this.props.onSearchPage)
        this.props.onSearchPage(values)
    }	
  
  state = {
		query:'',
 		 books: []
	}

	static PropTypes = {
    books: PropTypes.array.isRequired,
    onShelfUpdate: PropTypes.func.isRequired
    } 
	
	updateQuery = (query) => {
    this.setState({ query: query.trim() })
    }

	clearQuery = () => {
     this.setState({ query:'' })
    }
	
	componentDidMount(){
	BooksAPI.getAll().then((books) => {
		this.setState({ books })
	})
}

render (){
  	const { books, onShelfUpdate } = this.props
	const { query } = this.state
  
	let showingBooks
	if (query) {
    	const match = new RegExp(escapeRegExp(query), 'i')
      	showingBooks = books.filter((books) => match.test(books.name))
    } else {
     showingBooks = books
    }

	//showingBooks.sort(Sortby('name'))

	return (
	<div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                
                <input 
					type="text" 
					value={query} 
					onChange={(event) => this.updateQuery(event.target.value)}
					placeholder="Search by title or author"
				/>
				<Link to='/BookPage'
				className='return'
				>Go Back</Link>

              </div>

            </div>
            <div className="search-books-results">
              	<ol className="books-grid">
					{showingBooks.map((books) => ( 
 						<li 
                     		key={books.id} 
							className='book-list-item'>
						
							books={books}
							onShelfUpdate={onShelfUpdate} 
						</li>
					))}
				</ol>
            </div>
          </div>
	)
}
}

export default SearchPage;