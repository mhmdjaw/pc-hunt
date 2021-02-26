import React, { createContext, useContext } from "react";
import LoadingPage from "../../components/common/LoadingPage";
import { FacetsContext } from "./facets-context-types";
import useProvideFacets from "./facets-provider";

interface ProvideFacetsProps {
  children: React.ReactElement[];
}

const authContext = createContext<FacetsContext | null>(null);

export const ProvideFacets: React.FC<ProvideFacetsProps> = ({
  children,
}: ProvideFacetsProps) => {
  const { loading, ...facets } = useProvideFacets();

  return (
    <authContext.Provider value={facets}>
      {loading ? <LoadingPage /> : children}
    </authContext.Provider>
  );
};

export const useFacets = (): FacetsContext => {
  return useContext(authContext) as FacetsContext;
};
