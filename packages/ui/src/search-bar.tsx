import { CrossIcon, SearchIcon } from "./icons";

export const SearchBar = ({
  placeholder,
  query,
  setQuery,
}: {
  placeholder?: string;
  query: string;
  setQuery: (query: string) => void;
}) => {
  return (
    <label className="w-full block relative">
      <span className="sr-only">{placeholder ?? "Suche"}</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <SearchIcon className="h-5 w-5 fill-stone-300" />
      </span>
      <input
        className="font-extralight rounded block px-9 py-2 w-full placeholder-stone-500 border-stone-800 text-stone-400 bg-stone-800 shadow shadow-lg focus:outline-none focus:border-stone-400 focus:ring-stone-400 focus:ring-1"
        type="text"
        placeholder={placeholder}
        value={query}
        onInput={(event) => setQuery(event.currentTarget.value)}
      />
      {query.length > 0 && (
        <button
          onClick={() => setQuery("")}
          className="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <CrossIcon className="h-5 w-5 fill-stone-300" />
        </button>
      )}
    </label>
  );
};
