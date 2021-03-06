import { useEffect, useState } from "react";
import { Brand, getBrands } from "../../api/brand";
import { Category, getCategories } from "../../api/category";
import { FacetsState } from "./facets-context-types";

const useProvideFacets = (): FacetsState => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

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
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  return {
    categories,
    brands,
    loading,
  };
};

export default useProvideFacets;
