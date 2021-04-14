import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Card,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { getOrders, Order as IOrder, searchOrder } from "../../../api/order";
import { newToken, useCancelToken } from "../../../helpers";
import { CustomIconButton } from "../../common";
import { Search } from "@material-ui/icons";
import Order from "./Order";
import useOrdersStyles from "./orders-styles";

interface State {
  orders: IOrder[];
  loading: boolean;
  noOrders: boolean;
}

const Orders: React.FC = () => {
  const classes = useOrdersStyles();
  const cancelSource = useCancelToken();
  const [state, setState] = useState<State>({
    orders: [],
    loading: true,
    noOrders: false,
  });
  const [value, setValue] = useState("");

  useEffect(
    () => {
      getOrders(cancelSource.current?.token)
        .then((response) => {
          setState({
            orders: response.data,
            noOrders: response.data.length === 0,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const search = () => {
    cancelSource.current?.cancel();
    cancelSource.current = newToken();
    setState({ ...state, loading: true });
    if (value.length > 0) {
      const encodedValue = encodeURIComponent(
        value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      );
      searchOrder(encodedValue, cancelSource.current.token)
        .then((response) => {
          console.log(response.data[0]);
          setState({ orders: response.data, noOrders: false, loading: false });
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    } else {
      getOrders(cancelSource.current?.token)
        .then((response) => {
          setState({
            orders: response.data,
            noOrders: response.data.length === 0,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };

  return (
    <Box m="60px auto 90px" p="0 16px" maxWidth="900px">
      <Typography className={classes.title} variant="h4">
        Your Orders
      </Typography>
      {state.noOrders ? (
        <Box fontSize="h4.fontSize">You have no orders.</Box>
      ) : (
        <>
          <FormControl
            className={classes.searchInput}
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="searchbox">
              Order ID or product name
            </InputLabel>
            <OutlinedInput
              id="searchbox"
              name="Search"
              label="Order ID or product name"
              fullWidth
              value={value}
              onChange={handleInputChange}
              onKeyDown={(event) => event.key === "Enter" && search()}
              endAdornment={
                <InputAdornment position="end">
                  <CustomIconButton edge="end" onClick={search}>
                    <Search />
                  </CustomIconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {state.loading || state.orders.length > 0 ? (
            <Card variant="outlined">
              {state.loading ? (
                <>
                  <Order loading />
                  <Divider />
                  <Order loading />
                </>
              ) : (
                state.orders.map((order, i) => (
                  <Fragment key={order._id}>
                    <Order order={order} />
                    {i < state.orders.length - 1 && <Divider />}
                  </Fragment>
                ))
              )}
            </Card>
          ) : (
            <Box fontSize="h4.fontSize">No results found.</Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Orders;
