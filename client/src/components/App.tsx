import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import './App.css';
import { MainBar } from "./main-bar";
import { Movies } from "./movies";
import { MovieInfo } from "./movie-info";
import { PersonInfo } from "./person-info";
import { useAppApolloClient } from "../hooks/useAppApolloClient";
import { ApolloProvider } from "@apollo/client";
import { Authentication } from "./authentication";
import { Registration } from "./registration";

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
    },
    {
        path: "/login",
        element: <Authentication />
    },
    {
        path: "/register",
        element: <Registration />
    }
])


function App() {

    const client = useAppApolloClient();

    return (
    <div className="App">
        <ApolloProvider client={client}>
            <MainBar />
            <RouterProvider router={router} />
        </ApolloProvider>
    </div>
  );
}

export default App;
