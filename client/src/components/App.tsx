import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import './App.css';
import { MainBar } from "./main-bar";
import { Movies } from "./movies";
import { MovieEditor } from "./movie-editor";
import { MovieInfo } from "./movie-info";
import { PersonInfo } from "./person-info";
import { useAppApolloClient } from "../hooks/useAppApolloClient";
import { ApolloProvider } from "@apollo/client";
import { Authentication } from "./authentication";
import { Profile } from "./profile";
import { Registration } from "./registration";
import {PersonEditor} from "./person-editor";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Movies />,
    },
    {
        path: "/movie/new",
        element: <MovieEditor />
    },
    {
        path: "/movie/:movieId",
        element: <MovieInfo />
    },
    {
        path: "/movie/:movieId/edit",
        element: <MovieEditor />
    },
    {
        path: "/person/new",
        element: <PersonEditor />
    },
    {
        path: "/person/:personId",
        element: <PersonInfo />
    },
    {
        path: "/person/:personId/edit",
        element: <PersonEditor />
    },
    {
        path: "/login",
        element: <Authentication />
    },
    {
        path: "/register",
        element: <Registration />
    },
    {
        path: "/profile",
        element: <Profile />
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
