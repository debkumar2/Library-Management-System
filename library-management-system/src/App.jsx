import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import AddBook from "./Components/Books/AddBook";
import BookList from "./Components/Books/BookList";
import BookDetails from "./Components/Books/BookDetails";
import UpdateBook from "./Components/Books/UpdateBook";
import AddBorrowers from "./Components/Borrowers/AddBorrowers";
import BorrowerList from "./Components/Borrowers/BorrowerList";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/books',
    element: <BookList />
  },
  {
    path: '/books/add',
    element: <AddBook />
  },
  {
    path: '/books/:id',
    element: <BookDetails />
  },
  {
    path: '/book/edit/:id',
    element: <UpdateBook />
  },
  {
    path: '/borrower/add',
    element: <AddBorrowers />
  },
  {
    path: '/borrower',
    element: <BorrowerList />
  }

])
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
