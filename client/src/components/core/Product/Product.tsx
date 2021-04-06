import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Tab, Typography } from "@material-ui/core";
import { useParams } from "react-router";
import { newToken, useCancelToken } from "../../../helpers";
import {
  getProduct,
  getProductImage,
  getRelatedProducts,
  Product as IProduct,
} from "../../../api/product";
import axios from "axios";
import {
  Rating,
  Skeleton,
  TabContext,
  TabList,
  TabPanel,
} from "@material-ui/lab";
import { CustomButton, ProductSlider } from "../../common";
import clsx from "clsx";
import useProductStyles from "./product-styles";
import { useFacets } from "../../../context";
import { addOneToCart } from "../../../api/cart";

const Product: React.FC = () => {
  const classes = useProductStyles();
  const { updateBadget, showSnackbar } = useFacets();
  const { slug } = useParams<{ slug: string }>();
  const cancelSource = useCancelToken();
  const [tabValue, setTabValue] = useState("overview");
  const [product, setProduct] = useState<IProduct | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setProduct(null);
    setRelatedProducts([]);
    cancelSource.current = newToken();
    getProduct(slug, cancelSource.current.token)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.log(err.response.data.err);
        }
      });
    getRelatedProducts(slug, cancelSource.current.token)
      .then((response) => {
        setRelatedProducts([...response.data]);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.log(err.response.data.err);
        }
      });
    return () => {
      cancelSource.current?.cancel();
    };
  }, [slug, cancelSource]);

  const addToCart = () => {
    setIsSubmitting(true);
    addOneToCart({ product: product?._id as string })
      .then((response) => {
        updateBadget(response.data.badget);
        showSnackbar("Item successfully added to your cart.", true);
        setIsSubmitting(false);
      })
      .catch((err) => {
        showSnackbar(err.response.data.error, false);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Box p="60px 4vw 70px" bgcolor="#fff">
        <Typography className={classes.productTitle} variant="h5">
          {product ? (
            product.name
          ) : (
            <>
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" width="25%" />
            </>
          )}
        </Typography>
        <Divider className={classes.divider} />
        <Grid container>
          <Grid item xs={12} md={8}>
            <Box maxWidth="500px" m="24px auto 48px">
              <Box className={classes.imgContainer}>
                <div>
                  {!imageLoaded && (
                    <Skeleton animation="wave" variant="rect" height="100%" />
                  )}
                  {product && (
                    <img
                      className={clsx(classes.img, {
                        [classes.imgLoaded]: imageLoaded,
                      })}
                      src={getProductImage(product.slug)}
                      onLoad={() => setImageLoaded(true)}
                    />
                  )}
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box m="24px 0 48px">
              <Box fontSize="h2.fontSize" fontWeight={700} mb="24px">
                {product ? (
                  "$" + product.price.toLocaleString()
                ) : (
                  <Skeleton animation="wave" width={180} />
                )}
              </Box>
              <Box display="flex" alignItems="center" mb="8px">
                {product ? (
                  <>
                    <Rating
                      className={classes.rating}
                      value={4.3}
                      precision={0.5}
                      readOnly
                    />
                    <Box fontSize="h3.fontSize" fontWeight={700} ml="24px">
                      4.3
                    </Box>
                  </>
                ) : (
                  <Skeleton
                    className={classes.rating}
                    animation="wave"
                    width={240}
                  />
                )}
              </Box>
              <Typography variant="h6">
                {product ? (
                  "12 reviews"
                ) : (
                  <Skeleton animation="wave" width={100} />
                )}
              </Typography>
              <Box
                mt="24px"
                fontSize="h4.fontSize"
                fontWeight={500}
                color={
                  product && product.quantity > 0
                    ? "success.main"
                    : "error.main"
                }
              >
                {product ? (
                  product.quantity > 0 ? (
                    "In Stock"
                  ) : (
                    "Out of Stock"
                  )
                ) : (
                  <Skeleton animation="wave" width={100} />
                )}
              </Box>
              <CustomButton
                variant="contained"
                className={classes.cartButton}
                color="secondary"
                size="large"
                fullWidth
                disabled={!product || product.quantity === 0 || isSubmitting}
                isSubmitting={isSubmitting}
                onClick={addToCart}
              >
                add to cart
              </CustomButton>
              <CustomButton
                variant="contained"
                className={classes.wishlistButton}
                color="primary"
                size="large"
                fullWidth
                disabled={!product || isSubmitting}
                isSubmitting={isSubmitting}
              >
                add to wishlist
              </CustomButton>
            </Box>
          </Grid>
        </Grid>
        <TabContext value={tabValue}>
          <TabList
            className={classes.tabs}
            indicatorColor="primary"
            textColor="primary"
            onChange={(_e, value) => setTabValue(value)}
          >
            <Tab className={classes.tab} label="overview" value="overview" />
            <Tab
              className={classes.tab}
              label="customer reviews"
              value="reviews"
            />
          </TabList>
          <TabPanel value="overview">
            <Typography className={classes.overview} variant="body1">
              {product ? (
                product.description
              ) : (
                <>
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" width="60%" />
                </>
              )}
            </Typography>
          </TabPanel>
          <TabPanel value="reviews">these are the reviews</TabPanel>
        </TabContext>
      </Box>
      <Box p="40px 0 90px">
        <ProductSlider title="You Might Also Like" products={relatedProducts} />
      </Box>
    </>
  );
};

export default Product;
