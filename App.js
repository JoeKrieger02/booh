import React  from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
//import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import BookPage from './BookPage'
import SearchPage from './SearchPage'
import { BrowserRouter } from 'react-router-dom';


class App extends React.Component {
  state= {
    books: []
   
  }

componentDidMount(){
	BooksAPI.getAll().then((books) => {
		this.setState({ books })
	})
}



/*UpdateBook=(books: any, shelf: string)=> {
	BooksAPI.update(books, shelf).then(response=> {
		this.GetDisplayedBook();
	})
}
*/
/*
GetDisplayedBook = (e, UpdatedBook) => {
  const shelf = e.target.value
  const book = this.state.book
    e.preventDefault()
      UpdatedBook.shelf = e.target.value
      this.setState({ books })
    	
*/

UpdateBook = ( updatedBook, updatedShelf) => {
	BooksAPI.update(updatedBook, updatedShelf).then (response => {
	 let newBookId = this.state.books.filter( book => book.id !== updatedBook.id )	
      updatedShelf.shelf = updatedShelf
      updatedBook.push(newBookId);
      this.setState({ books : updatedBook})  	
	})
}

  render() {
    return (
    <BrowserRouter>
      <div className="app">
      	<Route exact path="/" render={()=> (
    		<BookPage 
    			UpdateBook={this.UpdateBook}
				books={this.state.books}
			/>
		)}/>
		<Route path="/SearchPage" render={()=> (
      		<SearchPage
             	books={this.state.books}
				UpdateBook={this.UpdateBook}
			/>
		)}/>
	</div> 
</BrowserRouter>
    )
  }

}

export default App
