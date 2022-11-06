import { HeightWrapper } from '@kochbuch/components'
import { RemoveRecipeFromPlan } from '../RecipeActions'

import { RecipeList } from '../RecipeList'
import { plansResource } from '../RecipeResource'

export const PlanView = () => {
  const [plans, { refetch }] = plansResource()
  return (
    <HeightWrapper>
      <RecipeList
        getHref={plan => plan.id.toString()}
        action={(plan) => (
          <RemoveRecipeFromPlan
            plan={plan}
            onClick={async () => {
              await refetch()
            }}
          />
        )}
        emptyState="Leider kein Rezept gefunden"
        recipes={plans() ?? []}
      />
    </HeightWrapper>
  )
}
