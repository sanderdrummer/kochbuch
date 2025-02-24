import { ComponentProps } from 'react'
import { Heart, HeartOutline } from '~/components/Icons'
import { useRecipeStore } from '~/resources/recipes-store'

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
      aria-label={isFavorite ? 'nur Favoriten anzeigen' : 'alle anzeigen'}
      onClick={() => {
        setIsFavorite(!isFavorite)
      }}
    />
  )
}

export const FavoriteToggleButton = ({ title }: { title: string }) => {
  const favorites = useRecipeStore((store) => store.favorites)
  const isFavorite = favorites[title] ?? false
  const toggleFavorite = useRecipeStore((store) => store.toggleFavorite)
  return (
    <FavoriteButton
      isFavorite={isFavorite}
      aria-label={
        isFavorite ? 'von Favoriten löschen' : 'zu Favoriten hinzufügen'
      }
      onClick={() => toggleFavorite(title)}
    />
  )
}
