import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { createContext, useContext } from "react";
import LoadingPage from "../../components/common/LoadingPage";
import { FacetsContext } from "./facets-context-types";
import useProvideFacets from "./facets-provider";

interface ProvideFacetsProps {
  children: React.ReactElement[] | React.ReactElement;
}

const authContext = createContext<FacetsContext | null>(null);

export const ProvideFacets: React.FC<ProvideFacetsProps> = ({
  children,
}: ProvideFacetsProps) => {
  const { loading, snackbar, closeSnackbar, ...facets } = useProvideFacets();

  return (
    <authContext.Provider value={facets}>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={closeSnackbar}
          >
            <Alert
              onClose={closeSnackbar}
              severity={snackbar.success ? "success" : "error"}
              elevation={6}
              variant="filled"
            >
              {snackbar.text}
            </Alert>
          </Snackbar>
          {children}
        </>
      )}
    </authContext.Provider>
  );
};

export const useFacets = (): FacetsContext => {
  return useContext(authContext) as FacetsContext;
};
