import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPost, Post as IPost } from "../../../api/post";
import { displayDate, useCancelToken } from "../../../helpers";
import usePostStyles from "./post-styles";

interface State {
  post: IPost | null;
  loading: boolean;
}

const Post: React.FC = () => {
  const classes = usePostStyles();
  const cancelSource = useCancelToken();
  const { slug } = useParams<{ slug: string }>();
  const [state, setState] = useState<State>({ post: null, loading: true });

  useEffect(
    () => {
      getPost(slug, cancelSource.current?.token)
        .then((response) => {
          setState({ post: response.data, loading: false });
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

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        {state.loading ? (
          <div className={classes.loading}>
            <CircularProgress disableShrink size={50} />
          </div>
        ) : state.post ? (
          <>
            <div className={classes.header}>
              <Typography className={classes.title} variant="h4">
                {state.post.title}
              </Typography>
              <Typography className={classes.postedOnBy} variant="caption">
                Posted on <b>{displayDate(state.post.createdAt)}</b> by{" "}
                <b>{state.post.postedBy}</b>
              </Typography>
            </div>
            <Divider className={classes.splitter} />
            <Typography className={classes.content}>
              {state.post.content}
            </Typography>
          </>
        ) : (
          <Box textAlign="left" fontSize="h4.fontSize">
            Looks like this post doesn&apos;t exist. Please, double check the
            URL.
          </Box>
        )}
      </div>
    </Container>
  );
};

export default Post;
