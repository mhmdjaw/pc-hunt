import {
  Box,
  CircularProgress,
  createStyles,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { addManyToCart } from "../../../api/cart";
import { getProducts, Product } from "../../../api/product";
import { useFacets } from "../../../context";
import { useCancelToken } from "../../../helpers";
import { CustomButton, FormLayout } from "../../common";
import autocompleteCategories from "./autocomplete-categories";

const usePCBuilderStyles = makeStyles((theme) =>
  createStyles({
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
    <FormLayout title="PC Builder" maxWidth={800}>
      {autocompletes.map((autocomplete, i) => (
        <Box key={i} mb="24px">
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
      <CustomButton
        variant="contained"
        color="primary"
        disabled={
          isSubmitting ||
          !autocompletes.some((autocomplete) => autocomplete.value.length > 0)
        }
        isSubmitting={isSubmitting}
        onClick={addItemsToCart}
      >
        add items to cart
      </CustomButton>
    </FormLayout>
  );
};

export default PCBuilder;
