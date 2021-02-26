import { useEffect, useState } from "react";
import { Category, getCategories } from "../../api/category";
import { FacetsState } from "./facets-context-types";

const useProvideFacets = (): FacetsState => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }, []);

  return {
    categories,
    loading,
  };
};

export default useProvideFacets;
