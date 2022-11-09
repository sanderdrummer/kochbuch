import { Router, hashIntegration, Routes } from '@solidjs/router'
import { RecipeNavTab, RecipePlanNavTab, RecipeRoutes } from '@kochbuch/recipes'
import { Navbar } from '@kochbuch/components'
import {ListNavTab, ListRoutes} from '@kochbuch/list'

const BottomTabs = () => {
  return (
    <Navbar>
      <RecipeNavTab />
      <RecipePlanNavTab />
      <ListNavTab />
    </Navbar>
  )
}

export const MainRouters = () => {
  return (
    <Router source={hashIntegration()}>
      <Routes>
        <RecipeRoutes />
        <ListRoutes />
      </Routes>
      <BottomTabs />
    </Router>
  )
}
