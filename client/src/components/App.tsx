import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import './App.css';
import { Movies } from "./movies";
import { MovieInfo } from "./movie-info";
import { PersonInfo } from "./person-info";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Movies />,
    },
    {
        path: "/movie/:movieId",
        element: <MovieInfo />
    },
    {
        path: "/person/:personId",
        element: <PersonInfo />
    }
])


function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
