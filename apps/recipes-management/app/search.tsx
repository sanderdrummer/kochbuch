"use client";

import { SearchBar } from "@kochbuch/ui/search-bar";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

type SearchInput = {
  query: string;
};

export const SearchForm = ({ defaultValue }: { defaultValue: string }) => {
  const { control, handleSubmit } = useForm<SearchInput>();
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        handleSubmit((values) => {
          if (values.query) {
            router.push(`/?query=${encodeURIComponent(values.query)}`);
          } else {
            router.push("/");
          }
        })(e);
      }}
    >
      <Controller
        control={control}
        name="query"
        defaultValue={defaultValue}
        render={({ field: { onChange, value, ...field } }) => (
          <SearchBar
            {...field}
            query={value}
            setQuery={(query) => {
              onChange({ target: { value: query } });
            }}
          />
        )}
      />
    </form>
  );
};
