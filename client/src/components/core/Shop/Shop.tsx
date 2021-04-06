import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ExpandMore, Tune } from "@material-ui/icons";
import axios from "axios";
import clsx from "clsx";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getProducts, Product, SearchParams } from "../../../api/product";
import { useFacets } from "../../../context";
import { newToken, useCancelToken } from "../../../helpers";
import priceRanges from "./price-ranges";
import sort from "./sort";
import { v4 as uuidv4 } from "uuid";
import { ProductCard, CustomButton } from "../../common";
import useShopStyles from "./shop-styles";

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

interface ProductItem {
  id: string;
  product: Product;
}

interface ProductListProps {
  productList: ProductItem[];
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  productList,
  loading,
}: ProductListProps) => {
  return (
    <Grid container justify="flex-start" spacing={3}>
      {loading
        ? [1, 2, 3, 4].map((i) => (
            <Grid key={i} item xs={6} sm={4} lg={3}>
              <ProductCard loading />
            </Grid>
          ))
        : productList.map((product) => (
            <Grid key={product.id} item xs={6} sm={4} lg={3}>
              <ProductCard product={product.product} />
            </Grid>
          ))}
    </Grid>
  );
};

const Shop: React.FC = () => {
  const classes = useShopStyles();
  const { categories, brands } = useFacets();
  const history = useHistory();
  const { categorySlug, brandSlug, keywords } = useParams<UrlParams>();
  const cancelSource = useCancelToken();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // build initial query based on url params
  const initialQuery: SearchParams = useMemo(() => {
    const query: SearchParams = { skip: 0, limit: 12 };
    if (categorySlug) {
      query.category =
        categories.find((category) => category.slug === categorySlug)?._id ||
        "id not found";
    }
    if (brandSlug) {
      query.brand = [brandSlug];
    }
    if (keywords) {
      query.keywords = decodeURIComponent(keywords);
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

  const [disableFilters, setDisableFilters] = useState(true);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  const numberOfMenus = useMemo(
    () =>
      categories.filter((category) => category.parent.slug === "root").length,
    [categories]
  );
  const [openCategory, setOpenCategory] = useState<boolean[]>(
    new Array(numberOfMenus).fill(false)
  );
  const [openFilters, setOpenFilters] = useState(false);

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
    newQuery.skip =
      trigger === "loadMore"
        ? (newQuery.skip as number) + (newQuery.limit as number)
        : 0;
    getProducts(newQuery, cancelSource.current.token)
      .then((response) => {
        const results = response.data;
        if (trigger === "loadMore") {
          setProducts([
            ...products,
            ...results.products.map((product) => ({ id: uuidv4(), product })),
          ]);
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
          setProducts([
            ...results.products.map((product) => ({ id: uuidv4(), product })),
          ]);
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
    <Box m="60px 3vw 90px">
      <Box m="0 0 30px 16px" fontWeight={700} fontSize="h4.fontSize">
        {categorySlug &&
          (categories.find((category) => category.slug === categorySlug)
            ?.name ||
            `Oops! This category doesn't exist`)}
        {brandSlug &&
          (brands.find((brand) => brand.slug === brandSlug)?.name ||
            `Oops! This brand doesn't exist`)}
        {keywords &&
          (disableFilters || products.length > 0) &&
          `Results for "${decodeURIComponent(keywords)}"`}
        {keywords &&
          !disableFilters &&
          products.length === 0 &&
          `Oops! We couldn't find anything related to "${keywords}"`}
        {!categorySlug && !brandSlug && !keywords && "Shop"}
      </Box>
      {(disableFilters || products.length > 0) && (
        <div className={classes.productsContainer}>
          {isMobile && (
            <Box pb="30px">
              <CustomButton
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<Tune />}
                onClick={() => setOpenFilters(!openFilters)}
              >
                Filters
              </CustomButton>
            </Box>
          )}
          <Collapse
            className={classes.facetContainer}
            in={openFilters}
            timeout="auto"
          >
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={
                    <ExpandMore className={classes.accordionExpandIcon} />
                  }
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
                            primary={parentCategory.name}
                            classes={{ primary: classes.parentCategoryText }}
                          />
                          <ExpandMore
                            className={clsx(classes.categoryExpandIcon, {
                              [classes.categoryExpanded]: openCategory[i],
                            })}
                          />
                        </ListItem>
                        <Collapse in={openCategory[i]} timeout="auto">
                          <List component="div" disablePadding>
                            {categories
                              .filter(
                                (category) =>
                                  category.parent.slug === parentCategory.slug
                              )
                              .map((category, j) => (
                                <ListItem
                                  key={j}
                                  className={clsx(
                                    classes.listItem,
                                    classes.nested
                                  )}
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
                  expandIcon={
                    <ExpandMore className={classes.accordionExpandIcon} />
                  }
                >
                  <Typography className={classes.accordionHeading}>
                    Brands
                  </Typography>
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
                  expandIcon={
                    <ExpandMore className={classes.accordionExpandIcon} />
                  }
                >
                  <Typography className={classes.accordionHeading}>
                    Prices
                  </Typography>
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
                  expandIcon={
                    <ExpandMore className={classes.accordionExpandIcon} />
                  }
                >
                  <Typography className={classes.accordionHeading}>
                    Sort
                  </Typography>
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
          </Collapse>
          <div className={classes.productListContainer}>
            {/* <Box mb="30px" fontSize="h5.fontSize" fontWeight={500}>
          {`${numberOfProducts} Results`}
        </Box> */}
            <ProductList
              productList={products}
              loading={disableFilters && products.length === 0}
            />
            {products.length < numberOfProducts && (
              <Box mt={6} ml={isMobile ? 0 : "25%"}>
                <CustomButton
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth={isMobile ? true : undefined}
                  disabled={disableFilters}
                  isSubmitting={disableFilters}
                  onClick={() => getResults(query, "loadMore")}
                >
                  show more
                </CustomButton>
              </Box>
            )}
          </div>
        </div>
      )}
    </Box>
  );
};

export default Shop;
