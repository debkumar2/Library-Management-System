import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import AddBook from "./Components/Books/AddBook";
import BookList from "./Components/Books/BookList";
import BookDetails from "./Components/Books/BookDetails";
import UpdateBook from "./Components/Books/UpdateBook";


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
