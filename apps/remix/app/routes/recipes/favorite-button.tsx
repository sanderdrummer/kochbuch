import { ComponentProps, useState } from 'react'
import { useSWRConfig } from 'swr'
import { Heart, HeartOutline } from '~/components/Icons'
import {
  setIsFavorite as dbSetIsFavorite,
  getRecipes,
} from '~/resources/recipes'

const FavoriteButton = ({
  isFavorite,
  ...props
}: ComponentProps<'button'> & { isFavorite: boolean }) => {
  return (
    <button type="button" {...props}>
      {isFavorite ? (
        <Heart className="w-8 fill-stone-500" />
      ) : (
        <HeartOutline className="w-8 fill-stone-500" />
      )}
    </button>
  )
}

export const FavoriteFilterButton = ({
  isFavorite,
  setIsFavorite,
}: {
  isFavorite: boolean
  setIsFavorite: (favorite: boolean) => void
}) => {
  return (
    <FavoriteButton
      isFavorite={isFavorite}
      type="button"
      aria-label={isFavorite ? 'nur Favoriten anzeigen' : 'alle anzeigen'}
      onClick={() => {
        setIsFavorite(!isFavorite)
      }}
    />
  )
}

export const FavoriteToggleButton = ({
  title,
  isFavorite: initialIsFavorite,
}: {
  title: string
  isFavorite: boolean
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const { mutate } = useSWRConfig()
  return (
    <FavoriteButton
      isFavorite={isFavorite}
      type="button"
      aria-label={
        isFavorite ? 'von Favoriten löschen' : 'zu Favoriten hinzufügen'
      }
      onClick={async () => {
        await dbSetIsFavorite(title, !isFavorite)
        const recipes = await getRecipes()
        await mutate('getRecipes', recipes)
        setIsFavorite(!isFavorite)
      }}
    />
  )
}
