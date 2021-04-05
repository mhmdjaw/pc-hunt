import {
  Box,
  CircularProgress,
  createStyles,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { addManyToCart } from "../../../api/cart";
import { getProducts, Product } from "../../../api/product";
import { useFacets } from "../../../context";
import { useCancelToken } from "../../../helpers";
import { ContainedButton } from "../../common";
import autocompleteCategories from "./autocomplete-categories";

const usePCBuilderStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: "60px 5vw",
      marginBottom: "10vh",
    },
    autocompletePaper: {
      boxShadow: theme.shadows[3],
    },
  })
);

const PCBuilder: React.FC = () => {
  const classes = usePCBuilderStyles();
  const { categories, showSnackbar, updateBadget } = useFacets();
  const cancelSource = useCancelToken();
  const [autocompletes, setAutocompletes] = useState(autocompleteCategories);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadProducts = (categoryName: string, i: number) => {
    const categoryId = categories.find(
      (category) => category.name === categoryName
    )?._id;
    if (!(autocompletes[i].loading || autocompletes[i].loaded)) {
      getProducts({ category: categoryId }, cancelSource.current?.token)
        .then((response) => {
          autocompletes[i].products = response.data.products.filter(
            (product) => product.quantity > 0
          );
          autocompletes[i].loading = false;
          autocompletes[i].loaded = true;
          setAutocompletes([...autocompletes]);
        })
        .catch(() => {
          autocompletes[i].loading = false;
          autocompletes[i].loaded = false;
          showSnackbar("There was a problem loading the products.", false);
          setAutocompletes([...autocompletes]);
        });
    }
  };

  const handleOnChange = (
    _event: React.ChangeEvent<Record<string, unknown>>,
    value: Product | null,
    i: number
  ) => {
    autocompletes[i].value = value ? value._id : "";
    console.log(autocompletes[i].category + autocompletes[i].value);
    setAutocompletes([...autocompletes]);
  };

  const addItemsToCart = () => {
    setIsSubmitting(true);
    const items = autocompletes
      .filter((autocomplete) => autocomplete.value.length > 0)
      .map((autocomplete) => ({ product: autocomplete.value }));
    addManyToCart({ products: items }, cancelSource.current?.token)
      .then((response) => {
        updateBadget(response.data.badget);
        showSnackbar("Items successfully added to cart.", true);
        setIsSubmitting(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          showSnackbar(err.response.data.error, false);
          showSnackbar("Failed to add items to cart.", false);
          setIsSubmitting(false);
        }
      });
  };

  return (
    <Box m="60px 10vw 90px">
      <Typography variant="h4">PC Builder</Typography>
      <Box mt="30px">
        <Paper className={classes.paper} elevation={3}>
          {autocompletes.map((autocomplete, i) => (
            <Box key={i} mb="5vh" maxWidth="600px">
              <Autocomplete
                classes={{ paper: classes.autocompletePaper }}
                options={autocomplete.products}
                loading={autocomplete.loading}
                getOptionLabel={(option) => option.name}
                onOpen={() => loadProducts(autocomplete.category, i)}
                onChange={(event, value) => handleOnChange(event, value, i)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={autocomplete.category}
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {autocomplete.loading && (
                            <CircularProgress color="primary" size={20} />
                          )}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          ))}
          <ContainedButton
            color="primary"
            disabled={
              isSubmitting ||
              !autocompletes.some(
                (autocomplete) => autocomplete.value.length > 0
              )
            }
            isSubmitting={isSubmitting}
            onClick={addItemsToCart}
          >
            add items to cart
          </ContainedButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default PCBuilder;
