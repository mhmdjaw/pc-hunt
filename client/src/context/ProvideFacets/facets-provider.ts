import { useEffect, useState } from "react";
import { Brand, getBrands } from "../../api/brand";
import { getBadget } from "../../api/cart";
import { Category, getCategories } from "../../api/category";
import { useAuth } from "../ProvideAuth";
import { FacetsState } from "./facets-context-types";

interface SnackBar {
  open: boolean;
  severity: "error" | "success" | "info" | "warning";
  text: string;
}

const useProvideFacets = (): FacetsState => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [badget, setBadget] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<SnackBar>({
    open: false,
    severity: "success",
    text: "",
  });

  useEffect(() => {
    Promise.all([
      getCategories()
        .then((response) => {
          setCategories(response.data);
        })
        .catch((err) => {
          console.log(err.response.data.error);
        }),
      getBrands()
        .then((response) => {
          setBrands(response.data);
        })
        .catch((err) => {
          console.log(err.response.data.error);
        }),
      new Promise<void>((resolve): void => {
        if (user) {
          getBadget()
            .then((response) => {
              setBadget(response.data.badget);
              resolve();
            })
            .catch((err) => {
              console.log(err.response.data.error);
              resolve();
            });
        } else {
          setBadget(0);
          resolve();
        }
      }),
    ]).then(() => {
      setLoading(false);
    });
  }, [user]);

  const updateBadget = (number: number) => {
    setBadget(number);
  };

  const showSnackbar = (
    text: string,
    severity: "error" | "success" | "info" | "warning"
  ) => {
    setSnackbar({ open: true, severity, text });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return {
    categories,
    brands,
    badget,
    updateBadget,
    loading,
    snackbar,
    showSnackbar,
    closeSnackbar,
  };
};

export default useProvideFacets;
