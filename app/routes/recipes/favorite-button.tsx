import { ComponentProps, useState } from "react";
import { Heart, HeartOutline } from "~/components/Icons";
import { setIsFavorite as dbSetIsFavorite } from "~/resources/recipes";

const FavoriteButton = ({
  isFavorite,
  ...props
}: ComponentProps<"button"> & { isFavorite: boolean }) => {
  return (
    <button type="button" {...props}>
      {isFavorite ? (
        <Heart className="w-8 fill-stone-500" />
      ) : (
        <HeartOutline className="w-8 fill-stone-500" />
      )}
    </button>
  );
};

export const FavoriteFilterButton = ({
  isFavorite,
  setIsFavorite,
}: {
  isFavorite: boolean;
  setIsFavorite: (favorite: boolean) => void;
}) => {
  return (
    <FavoriteButton
      isFavorite={isFavorite}
      type="button"
      aria-label={isFavorite ? "nur Favoriten anzeigen" : "alle anzeigen"}
      onClick={() => {
        setIsFavorite(!isFavorite);
      }}
    />
  );
};

export const FavoriteToggleButton = ({
  title,
  isFavorite: initialIsFavorite,
}: {
  title: string;
  isFavorite: boolean;
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  return (
    <FavoriteButton
      isFavorite={isFavorite}
      type="button"
      aria-label={
        isFavorite ? "von Favoriten löschen" : "zu Favoriten hinzufügen"
      }
      onClick={async () => {
        setIsFavorite(!isFavorite);
        await dbSetIsFavorite(title, !isFavorite);
      }}
    />
  );
};
