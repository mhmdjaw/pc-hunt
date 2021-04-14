import React, { useState } from "react";
import { Box, Collapse, Link, Typography } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Order as IOrder } from "../../../../api/order";
import { getProductImage } from "../../../../api/product";
import { displayCost, displayDate } from "../../../../helpers";
import useOrderStyles from "./order-styles";
import { CustomButton } from "../../../common";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";

type LoadingOrderProps = {
  loading: true;
  order?: never;
};

type LoadedOrderProps = {
  loading?: false;
  order: IOrder;
};

type OrderProps = LoadedOrderProps | LoadingOrderProps;

const Order: React.FC<OrderProps> = ({ order, loading }: OrderProps) => {
  const classes = useOrderStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={classes.order}>
      <div className={classes.cornerInfo}>
        <Typography>
          {order ? (
            displayDate(order.createdAt)
          ) : (
            <Skeleton animation="wave" width={95} />
          )}
        </Typography>
        <Typography>
          {order ? (
            <b>
              {displayCost(
                order.orderSummary.productTotal + order.orderSummary.taxes,
                2
              )}
            </b>
          ) : (
            <Skeleton animation="wave" width={75} />
          )}
        </Typography>
      </div>
      <div className={classes.productContent}>
        {(!imageLoaded || loading) && (
          <Skeleton
            className={classes.skeletonImg}
            animation="wave"
            variant="rect"
          />
        )}
        {order && (
          <img
            className={clsx(classes.img, {
              [classes.imgLoaded]: imageLoaded,
            })}
            src={getProductImage(order.item.product.slug)}
            onClick={() => history.push(`/product/${order.item.product.slug}`)}
            onLoad={() => setImageLoaded(true)}
            alt="product-image"
          />
        )}
        <div className={classes.productDetails}>
          <div className={classes.productTitleContainer}>
            {order ? (
              <Link
                component={RouterLink}
                to={`/product/${order.item.product.slug}`}
                variant="body1"
                className={classes.productTitle}
              >
                {order.item.product.name}
              </Link>
            ) : (
              <Typography variant="body1">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" width={100} />
              </Typography>
            )}
          </div>
          <Typography>
            {order ? (
              `Quantity: ${order.item.quantity}`
            ) : (
              <Skeleton animation="wave" width={80} />
            )}
          </Typography>
        </div>
      </div>
      {order && (
        <Collapse in={open}>
          <div className={classes.details}>
            <div className={classes.detail}>
              <Typography>
                <b>Payment Method:</b>
              </Typography>
              <Box display="flex" alignItems="center">
                <img
                  className={classes.paymentImg}
                  src={order.paymentMethod.imageUrl}
                  alt="payment-method-img"
                />
                <div>
                  <Typography variant="body2">
                    {order.paymentMethod.card
                      ? `****${order.paymentMethod.card.last4}`
                      : order.paymentMethod.paypalEmail}
                  </Typography>
                  <Typography variant="body2">
                    {order.paymentMethod.card
                      ? order.paymentMethod.card.cardType
                      : "PayPal"}
                  </Typography>
                </div>
              </Box>
            </div>
            <div className={classes.detail}>
              <Typography>
                <b>Address:</b>
              </Typography>
              <Typography>
                {order.address.firstName + " " + order.address.lastName}
              </Typography>
              <Typography>{order.address.addressLine}</Typography>
              <Typography>{`${order.address.city}, ${order.address.province}, ${order.address.postalCode}`}</Typography>
              <Typography>{order.address.phone}</Typography>
            </div>
            <div className={classes.detail}>
              <Typography>
                <b>Order Summary:</b>
              </Typography>
              <div className={classes.orderSummaryDetail}>
                <Typography>Product Total</Typography>
                <Typography>
                  {displayCost(order.orderSummary.productTotal, 2)}
                </Typography>
              </div>
              <div className={classes.orderSummaryDetail}>
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
              </div>
              <div className={classes.orderSummaryDetail}>
                <Typography>Taxes</Typography>
                <Typography>
                  {displayCost(order.orderSummary.taxes, 2)}
                </Typography>
              </div>
              <div className={classes.orderSummaryDetail}>
                <Typography className={classes.orderTotal}>
                  Order Total
                </Typography>
                <Typography className={classes.orderTotal}>
                  {displayCost(
                    order.orderSummary.productTotal + order.orderSummary.taxes,
                    2
                  )}
                </Typography>
              </div>
            </div>
            <div className={classes.detail}>
              <Typography>
                <b>Shipment Status:</b>
              </Typography>
              <Typography>{order.status}</Typography>
            </div>
          </div>
        </Collapse>
      )}
      <div className={classes.cornerInfo}>
        <Typography className={classes.orderId}>
          {order ? (
            <>
              <b>Order ID</b> {order.orderId}
            </>
          ) : (
            <Skeleton animation="wave" width={110} />
          )}
        </Typography>
        <CustomButton
          buttonClassName={classes.textButton}
          color="primary"
          disabled={loading}
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide Details" : "Show Details"}
        </CustomButton>
      </div>
    </div>
  );
};

export default Order;
