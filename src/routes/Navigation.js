import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import routes from './routes'

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          return route.layout === null ? (
            <Route 
              key={index} 
              path={route.path} 
              element={<route.component />} 
              />
          ) : (
          <Route key={index} path="/" element={<route.layout menu={route.menu}/>}>
            <Route                
              path={route.path} 
              element={<route.component/>} 
            />
          </Route>
          )
    })}
      </Routes>
    </BrowserRouter>
  )
}
