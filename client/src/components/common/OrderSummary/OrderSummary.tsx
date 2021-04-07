import React from "react";
import { Box, Card } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { displayCost } from "../../../helpers";
import { CustomButton } from "..";
import useOrderSummaryStyles from "./order-summary-styles";
import { Link } from "react-router-dom";

interface OrderSummaryProps {
  loading?: boolean;
  subtotal: number;
  taxes: number;
  cart?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  loading,
  subtotal,
  taxes,
  cart,
}: OrderSummaryProps) => {
  const classes = useOrderSummaryStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.card} elevation={3}>
        <Box mb="32px" fontWeight={700} fontSize="h4.fontSize">
          Order Summary
        </Box>
        <table className={classes.table}>
          <tbody>
            <tr>
              <th>subtotal</th>
              <td>
                {loading ? (
                  <Skeleton
                    className={classes.costSkeleton}
                    animation="wave"
                    width={70}
                  />
                ) : (
                  displayCost(subtotal, 2)
                )}
              </td>
            </tr>
            <tr>
              <th>shipping</th>
              <td>
                {loading ? (
                  <Skeleton
                    className={classes.costSkeleton}
                    animation="wave"
                    width={70}
                  />
                ) : (
                  "Free"
                )}
              </td>
            </tr>
            <tr>
              <th>Estimated Taxes</th>
              <td>
                {loading ? (
                  <Skeleton
                    className={classes.costSkeleton}
                    animation="wave"
                    width={70}
                  />
                ) : (
                  displayCost(taxes, 2)
                )}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Estimated Total</th>
              <td>
                {loading ? (
                  <Skeleton
                    className={classes.costSkeleton}
                    animation="wave"
                    width={70}
                  />
                ) : (
                  displayCost(subtotal + taxes, 2)
                )}
              </td>
            </tr>
          </tfoot>
        </table>
        <CustomButton
          component={cart ? Link : undefined}
          to={cart ? "/checkout" : undefined}
          variant="contained"
          buttonClassName={classes.checkoutButton}
          color="secondary"
          size="large"
          fullWidth
        >
          {cart ? "Proceed to Checkout" : "Place Order"}
        </CustomButton>
      </Card>
    </div>
  );
};

export default OrderSummary;
