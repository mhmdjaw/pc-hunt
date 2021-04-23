import {
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { ArrowRightAlt } from "@material-ui/icons";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { getPosts, Post } from "../../../api/post";
import { displayDate, limitTextLength, useCancelToken } from "../../../helpers";
import { CustomButton } from "../../common";
import useBlogStyles from "./blog-styles";

interface State {
  posts: Post[];
  loading: boolean;
}

const Blog: React.FC = () => {
  const classes = useBlogStyles();
  const cancelSource = useCancelToken();
  const [state, setState] = useState<State>({ posts: [], loading: false });

  useEffect(
    () => {
      getPosts(cancelSource.current?.token)
        .then((response) => {
          setState({ posts: response.data, loading: false });
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
        <Typography className={classes.heading} variant="h4">
          pc hunt&apos;s blog
        </Typography>
        <Typography className={classes.subHeading} variant="subtitle1">
          Here you can find computer industry news
        </Typography>
        {state.loading ? (
          <div className={classes.loading}>
            <CircularProgress disableShrink size={50} />
          </div>
        ) : (
          state.posts.map((post, i) => (
            <Fragment key={post._id}>
              <div className={classes.post}>
                <div className={classes.postHeader}>
                  <Typography className={classes.title} variant="h5">
                    {post.title}
                  </Typography>
                  <Typography className={classes.postedOnBy} variant="caption">
                    Posted on <b>{displayDate(post.createdAt)}</b> by{" "}
                    <b>{post.postedBy}</b>
                  </Typography>
                </div>
                <Divider className={classes.headerSplitter} />
                <div className={classes.contentContainer}>
                  <Typography className={classes.content}>
                    {limitTextLength(post.content, 280)}
                  </Typography>
                  <CustomButton
                    component={RouterLink}
                    to={`/post/${post.slug}`}
                    variant="outlined"
                    color="primary"
                    endIcon={<ArrowRightAlt />}
                  >
                    continue reading
                  </CustomButton>
                </div>
              </div>
              {i < state.posts.length - 1 && (
                <Divider className={classes.postSplitter} />
              )}
            </Fragment>
          ))
        )}
      </div>
    </Container>
  );
};

export default Blog;
