import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Collapse,
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { CheckBox, ExpandMore } from "@material-ui/icons";
import axios from "axios";
import clsx from "clsx";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getProducts, Product, SearchParams } from "../../../api/product";
import { useFacets } from "../../../context";
import { newToken, useCancelToken } from "../../../helpers";
import priceRanges from "./price-ranges";
import sort from "./sort";
import { v4 as uuidv4 } from "uuid";

const useShopStyles = makeStyles((theme) =>
  createStyles({
    productsContainer: {
      display: "flex",
      padding: "60px 3vw 90px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    facetContainer: {
      paddingBottom: "30px",
      [theme.breakpoints.up("md")]: {
        flex: "1 1 25%",
      },
    },
    productListContainer: {
      [theme.breakpoints.up("md")]: {
        flex: "1 1 75%",
        paddingLeft: "24px",
      },
    },
    accordionHeading: {
      fontWeight: 700,
    },
    accordionExpandIcon: {
      color: "#000",
    },
    categoryList: {
      padding: "8px 0 16px",
    },
    listItem: {
      "&:active": {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      },
    },
    parentCategoryText: {
      fontWeight: 500,
    },
    categoryExpandIcon: {
      transition: theme.transitions.create("transform"),
      transform: "rotate(0deg)",
    },
    categoryExpanded: {
      transform: "rotate(180deg)",
    },
    nested: {
      paddingLeft: "32px",
    },
  })
);

interface UrlParams {
  brandSlug?: string;
  categorySlug?: string;
  keywords?: string;
}

interface Brand {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface PriceRange {
  id: string;
  from: number;
  to: number;
  count: number;
}

interface FilterValues {
  priceRange: string;
  brand: string[];
  sortBy: string;
}

interface FilterOptions {
  priceRanges: PriceRange[];
  brands: Brand[];
}

const Shop: React.FC = () => {
  const classes = useShopStyles();
  const { categories, brands } = useFacets();
  const { pathname } = useLocation();
  const history = useHistory();
  const { categorySlug, brandSlug, keywords } = useParams<UrlParams>();
  const cancelSource = useCancelToken();

  // build initial query based on url params
  const initialQuery: SearchParams = useMemo(() => {
    const query: SearchParams = { skip: 0, limit: 12 };
    if (categorySlug) {
      query.category = categories.find(
        (category) => category.slug === categorySlug
      )?._id;
    }
    if (brandSlug) {
      query.brand = [brandSlug];
    }
    if (keywords) {
      query.keywords = keywords;
    }

    return query;
  }, [categorySlug, keywords, brandSlug, categories]);

  const [query, setQuery] = useState<SearchParams>(initialQuery);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    priceRange: "0to1000000",
    brand: brandSlug ? [brandSlug] : [],
    sortBy: "sold",
  });
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRanges: [],
    brands: [],
  });
  console.log(filterOptions);

  const [disableFilters, setDisableFilters] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  const numberOfMenus = useMemo(
    () =>
      categories.filter((category) => category.parent.slug === "root").length,
    [categories]
  );
  const [openCategory, setOpenCategory] = useState<boolean[]>(
    new Array(numberOfMenus).fill(false)
  );

  const toggleCategoryExpand = (i: number) => {
    openCategory[i] = !openCategory[i];
    setOpenCategory([...openCategory]);
  };

  const getResults = (
    newQuery: SearchParams,
    trigger: "pathname" | "price" | "brand" | "sort" | "loadMore"
  ) => {
    cancelSource.current?.cancel();
    cancelSource.current = newToken();
    setDisableFilters(true);
    getProducts(newQuery, cancelSource.current.token)
      .then((response) => {
        const results = response.data;
        if (trigger === "loadMore") {
          setProducts([...products, ...results.products]);
        } else {
          if (trigger !== "sort") {
            setFilterOptions({
              priceRanges:
                trigger === "brand" || trigger === "pathname"
                  ? results.priceRanges.map(({ _id, count }) => {
                      const id = uuidv4();
                      const from = _id;
                      const fromIndex = priceRanges.indexOf(_id);
                      const to =
                        _id === 3000
                          ? 1000000
                          : priceRanges[fromIndex + 1] - 0.01;
                      return { id, from, to, count };
                    })
                  : [...filterOptions.priceRanges],
              brands:
                trigger === "price" || trigger === "pathname"
                  ? results.brands.map(({ _id, count }) => ({
                      id: uuidv4(),
                      name: brands.find((brand) => brand.slug === _id)
                        ?.name as string,
                      slug: _id,
                      count,
                    }))
                  : [...filterOptions.brands],
            });
            if (results.count.length > 0) {
              setNumberOfProducts(results.count[0].numberOfResults || 0);
            } else {
              setNumberOfProducts(0);
            }
          }
          setProducts([...results.products]);
        }
        setQuery(newQuery);
        setDisableFilters(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.log(err.response.data.error);
        }
      });
  };

  useEffect(
    () => {
      const newQuery: SearchParams = {
        ...initialQuery,
        sortBy: filterValues.sortBy,
      };
      setFilterValues({
        ...filterValues,
        priceRange: "0to1000000",
        brand: brandSlug ? [brandSlug] : [],
      });
      getResults(newQuery, "pathname");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialQuery]
  );

  const handleBrandToggle = (slug: string) => {
    const index = filterValues.brand.indexOf(slug);
    if (index >= 0) {
      filterValues.brand.splice(index, 1);
    } else {
      filterValues.brand.push(slug);
    }
    const newQuery: SearchParams = { ...query, brand: [...filterValues.brand] };
    setFilterValues({ ...filterValues });
    getResults(newQuery, "brand");
  };

  const handlePriceRangeClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const priceRange = (event.target as HTMLInputElement).value;
    setFilterValues({ ...filterValues, priceRange });
    const newQuery: SearchParams = { ...query, price: priceRange };
    getResults(newQuery, "price");
  };

  const handleSortClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    const sortBy =
      value === "priceLowHigh" || value === "priceHighLow" ? "price" : value;
    const order = value === "priceLowHigh" ? 1 : -1;
    const newQuery: SearchParams = { ...query, sortBy, order };
    setFilterValues({ ...filterValues, sortBy: value });
    getResults(newQuery, "sort");
  };

  return (
    <div className={classes.productsContainer}>
      <div className={classes.facetContainer}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore className={classes.accordionExpandIcon} />}
          >
            <Typography className={classes.accordionHeading}>
              Categories
            </Typography>
          </AccordionSummary>
          <List className={classes.categoryList}>
            {categories
              .filter((category) => category.parent.slug === "root")
              .map((parentCategory, i) => (
                <Fragment key={i}>
                  <ListItem
                    className={classes.listItem}
                    button
                    onClick={() => toggleCategoryExpand(i)}
                  >
                    <ListItemText
                      // className={classes.parentCategoryText}
                      primary={parentCategory.name}
                      classes={{ primary: classes.parentCategoryText }}
                    />
                    <ExpandMore
                      className={clsx(classes.categoryExpandIcon, {
                        [classes.categoryExpanded]: openCategory[i],
                      })}
                    />
                  </ListItem>
                  <Collapse in={openCategory[i]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {categories
                        .filter(
                          (category) =>
                            category.parent.slug === parentCategory.slug
                        )
                        .map((category, j) => (
                          <ListItem
                            key={j}
                            className={clsx(classes.listItem, classes.nested)}
                            button
                            onClick={() =>
                              history.push(`/category/${category.slug}`)
                            }
                          >
                            <ListItemText primary={category.name} />
                          </ListItem>
                        ))}
                    </List>
                  </Collapse>
                </Fragment>
              ))}
          </List>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore className={classes.accordionExpandIcon} />}
          >
            <Typography className={classes.accordionHeading}>Brands</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset" disabled={disableFilters}>
              <FormGroup>
                {filterOptions.brands.map((brand) => (
                  <FormControlLabel
                    key={brand.id}
                    control={
                      <Checkbox
                        color="primary"
                        checked={filterValues.brand.includes(brand.slug)}
                        onChange={() => handleBrandToggle(brand.slug)}
                      />
                    }
                    label={`${brand.name} (${brand.count})`}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore className={classes.accordionExpandIcon} />}
          >
            <Typography className={classes.accordionHeading}>Prices</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset" disabled={disableFilters}>
              <RadioGroup
                value={filterValues.priceRange}
                onChange={handlePriceRangeClick}
              >
                <FormControlLabel
                  value="0to1000000"
                  control={<Radio color="primary" />}
                  label="All"
                />
                {filterOptions.priceRanges.map((priceRange) => (
                  <FormControlLabel
                    key={priceRange.id}
                    value={`${priceRange.from}to${priceRange.to}`}
                    control={<Radio color="primary" />}
                    label={
                      priceRange.from < 3000
                        ? `$${priceRange.from} - $${priceRange.to} (${priceRange.count})`
                        : `${priceRange.from} and up (${priceRange.count})`
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore className={classes.accordionExpandIcon} />}
          >
            <Typography className={classes.accordionHeading}>Sort</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset" disabled={disableFilters}>
              <RadioGroup
                value={filterValues.sortBy}
                onChange={handleSortClick}
              >
                {sort.map((sort, i) => (
                  <FormControlLabel
                    key={i}
                    value={sort.value}
                    control={<Radio color="primary" />}
                    label={sort.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className={classes.productListContainer}></div>
    </div>
  );
};

export default Shop;
