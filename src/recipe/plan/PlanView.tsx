import { RecipeList } from '../RecipeList'
import { plansResource } from '../RecipeResource'

export const PlanView = () => {
  const [plans, { refetch }] = plansResource()
  return <RecipeList recipes={plans() ?? []} />
}
