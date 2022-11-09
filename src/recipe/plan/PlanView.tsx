import { HeightWrapper } from '@kochbuch/components'
import { AddRecipeToList } from '../RecipeActions'

import { RecipeList } from '../RecipeList'
import { plansResource } from '../RecipeResource'

export const PlanView = () => {
  const [plans, { refetch }] = plansResource()
  return (
    <HeightWrapper>
      <div class="mx-auto container">
        <h1 class="px-2 py-4 text-3xl	font-normal">Geplante Rezepte</h1>
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
