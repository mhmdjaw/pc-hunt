import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Fab,
  Link,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { newToken, useCancelToken } from "../../../helpers";
import { CustomButton, CustomIconButton } from "../../common";
import { Add, Delete } from "@material-ui/icons";
import { useFacets } from "../../../context";
import axios from "axios";
import { Post, getMyPosts, deletePost } from "../../../api/post";
import useMyPostsStyles from "./my-posts-styles";
import clsx from "clsx";

interface State {
  posts: { post: Post; removing: boolean }[];
  loading: boolean;
}

const MyPosts: React.FC = () => {
  const classes = useMyPostsStyles();
  const cancelSource = useCancelToken();
  const { showSnackbar } = useFacets();
  const [state, setState] = useState<State>({
    posts: [],
    loading: true,
  });
  const [dialog, setDialog] = useState({
    open: false,
    postIndex: -1,
  });

  useEffect(
    () => {
      getMyPosts(cancelSource.current?.token)
        .then((response) => {
          setState({
            posts: response.data.map((post) => ({
              post,
              removing: false,
            })),
            loading: false,
          });
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            console.log(err.response.data.error);
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const confirmRemovePost = () => {
    cancelSource.current?.cancel();
    cancelSource.current = newToken();
    const i = dialog.postIndex;
    setDialog({ ...dialog, open: false });
    state.posts[i].removing = true;
    setState({ ...state });
    deletePost(state.posts[i].post.slug, cancelSource.current.token)
      .then((response) => {
        state.posts.splice(i, 1);
        setState({ ...state });
        showSnackbar(response.data.message, "success");
      })
      .catch((err) => {
        state.posts[i].removing = false;
        setState({ ...state });
        if (!axios.isCancel(err)) {
          showSnackbar(err.response.data.error, "error");
        }
      });
  };

  const removePost = (i: number) => {
    setDialog({ open: true, postIndex: i });
  };

  return (
    <Box m="60px auto 90px" p="0 16px" maxWidth="700px">
      <Typography className={classes.title} variant="h4">
        Your Posts
      </Typography>
      {state.loading ? (
        <div className={classes.loading}>
          <CircularProgress disableShrink size={50} />
        </div>
      ) : state.posts.length === 0 ? (
        <Box fontSize="h4.fontSize">
          You have no posts. Click on the button at the bottom right of the page
          to create your first post.
        </Box>
      ) : (
        <Card variant="outlined">
          {state.posts.map((item, i) => (
            <Fragment key={item.post._id}>
              <div
                className={clsx(classes.post, {
                  [classes.removingProduct]: item.removing,
                })}
              >
                {item.removing && <div className={classes.disablePost} />}
                <div className={classes.postTitleContainer}>
                  <Typography className={classes.postTitle} variant="body1">
                    {item.post.title}
                  </Typography>
                </div>
                <CustomIconButton color="primary" onClick={() => removePost(i)}>
                  <Delete />
                </CustomIconButton>
              </div>
              {i < state.posts.length - 1 && <Divider />}
            </Fragment>
          ))}
        </Card>
      )}
      <Dialog
        open={dialog.open}
        onClose={() => setDialog({ ...dialog, open: false })}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure your want to remove this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            color="primary"
            onClick={() => setDialog({ ...dialog, open: false })}
          >
            No
          </CustomButton>
          <CustomButton color="primary" onClick={confirmRemovePost}>
            Yes
          </CustomButton>
        </DialogActions>
      </Dialog>
      <Fab
        component={RouterLink}
        to={"/post/create"}
        className={classes.fabAddProduct}
        color="secondary"
        focusVisibleClassName={classes.fabFocusVisible}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default MyPosts;
