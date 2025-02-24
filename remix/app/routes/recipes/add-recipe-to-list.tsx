import { PlusIcon } from '~/components/Icons'
import { LoadingButton } from '~/components/Inputs'
import { useListStore } from '~/resources/list'
import { type Recipe } from '~/resources/recipes'
import { v7 as uuid } from 'uuid'

export const AddRecipeToList = ({
  recipe,
  modifier = 1,
}: {
  recipe: Recipe
  modifier?: number
}) => {
  const addItemsToList = useListStore((store) => store.addTodo)
  return (
    <LoadingButton
      message={`${recipe.title} zur Einkaufsliste hinzugefügt`}
      disabled={recipe === undefined}
      icon={<PlusIcon />}
      label={''}
      onClick={async () => {
        if (recipe) {
          addItemsToList(
            recipe.ingredients.map((item) => {
              return {
                id: uuid(),
                amount: item.amount ? `${Number(item.amount) * modifier}` : '',
                scale: item.scale,
                title: item.name,
              }
            })
          )
        }
      }}
    />
  )
}
