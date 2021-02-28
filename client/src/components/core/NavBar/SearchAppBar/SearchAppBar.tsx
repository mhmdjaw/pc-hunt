import React, { useEffect, useMemo, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Box, InputBase, Popper } from "@material-ui/core";
import { Autocomplete, FilterOptionsState } from "@material-ui/lab";
import useSearchAppBarStyles from "./search-app-bar-styles";
import { Product } from "../../../../api/product";
import { asyncScheduler, BehaviorSubject, scheduled } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { API } from "../../../../config";
import clsx from "clsx";
import { useFacets } from "../../../../context";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { matchSorter } from "match-sorter";

interface SearchOption {
  name: string;
  slug: string;
  type: "categories" | "products";
}

const searchSubject = new BehaviorSubject("");

const searchResultObs$ = searchSubject.pipe(
  filter((val) => val.length > 1),
  debounceTime(500),
  distinctUntilChanged(),
  switchMap((val) =>
    ajax(`${API}/products/search?keywords=${val}`).pipe(
      map((res) => res.response),
      catchError((err) => {
        return scheduled(err, asyncScheduler);
      })
    )
  ),
  map((products: Product[]): SearchOption[] =>
    products.map((product) => ({
      name: product.name,
      slug: product.slug,
      type: "products",
    }))
  )
);

const filterOptions = (
  options: SearchOption[],
  { inputValue }: FilterOptionsState<SearchOption>
) => {
  const sortedCategories = matchSorter(
    options.filter((option) => option.type === "categories"),
    inputValue,
    { keys: ["name"] }
  );

  const sortedProducts = matchSorter(
    options.filter((option) => option.type === "products"),
    inputValue,
    { keys: ["name"] }
  );

  return [...sortedCategories, ...sortedProducts];
};

const SearchAppBar: React.FC = () => {
  const classes = useSearchAppBarStyles();
  const [options, setOptions] = useState<SearchOption[]>([]);
  const [closePopper, setClosePopper] = useState(false);

  const { categories } = useFacets();
  const categoriesOptions: SearchOption[] = useMemo(
    () =>
      categories.map((category) => ({
        name: category.name,
        slug: category.slug,
        type: "categories",
      })),
    [categories]
  );

  useEffect(() => {
    const subscription = searchResultObs$.subscribe({
      next: (results) => {
        setOptions([...categoriesOptions, ...results]);
      },
      error: (err) => console.log(err),
    });
    return () => subscription.unsubscribe();
  }, [categoriesOptions]);

  const handleOptionChange = (
    _event: React.ChangeEvent<Record<string, unknown>>,
    value: string | SearchOption | null
  ) => {
    if (value) {
      if (typeof value === "string") {
        console.log(value);
      } else if (typeof value === "object") {
        console.log(value.slug);
      }
      setClosePopper(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    searchSubject.next(value);

    if (value.length < 2 && !closePopper) {
      setClosePopper(true);
    } else if (value.length > 1 && closePopper) {
      setClosePopper(false);
    }
  };

  return (
    <Box className={classes.search}>
      <Box className={classes.searchIcon}>
        <SearchIcon />
      </Box>
      <Autocomplete
        classes={{
          paper: classes.paper,
          popper: clsx(classes.popper, { [classes.closePopper]: closePopper }),
        }}
        PopperComponent={(props) => (
          <Popper {...props} placement="bottom-end" />
        )}
        id="pc-hunt-search"
        freeSolo
        options={options}
        getOptionLabel={(option) =>
          option.name || ((option as unknown) as string)
        }
        groupBy={(option) => option.type}
        onChange={handleOptionChange}
        filterOptions={filterOptions}
        value={null}
        renderInput={(params) => (
          <InputBase
            placeholder="Search…"
            fullWidth
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            ref={params.InputProps.ref}
            inputProps={{ ...params.inputProps }}
            onChange={handleInputChange}
          />
        )}
        renderOption={(option, { inputValue }) => {
          const matches = match(option.name, inputValue);
          const parts = parse(option.name, matches);

          return (
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          );
        }}
      />
    </Box>
  );
};

export default SearchAppBar;
