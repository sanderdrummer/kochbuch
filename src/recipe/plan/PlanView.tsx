import { H1, HeightWrapper } from '@kochbuch/components'
import { AddRecipeToList } from '../RecipeActions'

import { RecipeList } from '../RecipeList'
import { plansResource } from '../RecipeResource'

export const PlanView = () => {
  const [plans, { refetch }] = plansResource()
  return (
    <HeightWrapper>
      <div class="mx-auto container">
        <H1 class="px-2">Geplante Rezepte</H1>
      </div>
      <RecipeList
        getHref={(plan) => plan.id.toString()}
        action={(plan) => (
          <AddRecipeToList
            plan={plan}
            onClick={async () => {
              await refetch()
            }}
          />
        )}
        emptyState="Noch nichts geplant"
        recipes={plans() ?? []}
      />
    </HeightWrapper>
  )
}
