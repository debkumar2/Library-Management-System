import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import AddBook from "./Components/Books/AddBook";
import BookList from "./Components/Books/BookList";
import BookDetails from "./Components/Books/BookDetails";
import UpdateBook from "./Components/Books/UpdateBook";
import AddBorrowers from "./Components/Borrowers/AddBorrowers";
import BorrowerList from "./Components/Borrowers/BorrowerList";
import Protected from "./utils/Protected";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: < Protected Component={Dashboard} />
  },
  {
    path: '/books',
    element: <Protected Component={BookList} />
  },
  {
    path: '/books/add',
    element: <Protected Component={AddBook} />

  },
  {
    path: '/books/:id',
    element: < Protected Component={BookDetails} />

  },
  {
    path: '/book/edit/:id',
    element: < Protected Component={UpdateBook} />

  },
  {
    path: '/borrower/add',
    element: < Protected Component={AddBorrowers} />

  },
  {
    path: '/borrower',
    element: < Protected Component={BorrowerList} />

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
