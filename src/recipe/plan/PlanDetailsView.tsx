import { useNavigate, useParams } from '@solidjs/router'
import { RemoveRecipeFromPlan } from '../RecipeActions'
import { RecipeDetails } from '../RecipeDetailsView'
import { planResource } from '../RecipeResource'

export const PlanDetailsView = () => {
  const params = useParams<{ id: string }>()
  const [plan] = planResource(Number(params.id))
  const navigate = useNavigate();
  return (
    <RecipeDetails recipe={plan()}>
      <RemoveRecipeFromPlan onClick={async () => {
        navigate('/plan')
      }} plan={plan()} />
    </RecipeDetails>
  )
}
