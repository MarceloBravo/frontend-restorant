import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import routes from './routes'

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          
          <Route 
            key={index} 
            path={route.path} 
            element={
                <route.layout>
                    <route.component />
                </route.layout>
                } 
            />
            
        ))}
      </Routes>
    </BrowserRouter>
  )
}
