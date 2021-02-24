import {
  Box,
  Collapse,
  Link,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import useTopBarStyles from "./top-bar-styles";

interface HideOnScrollProps {
  children: React.ReactElement;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({
  children,
}: HideOnScrollProps) => {
  const trigger = useScrollTrigger({
    threshold: 0,
  });

  return (
    <Collapse appear={false} unmountOnExit in={!trigger}>
      {children}
    </Collapse>
  );
};

const TopBar: React.FC = () => {
  const classes = useTopBarStyles();

  return (
    <HideOnScroll>
      <Box className={classes.topBar}>
        <Typography className={classes.topBarText} variant="subtitle2">
          hunt down the pc of your dream!
        </Typography>
        <Link
          className={classes.topBarLink}
          underline="none"
          component={RouterLink}
          to="#"
        >
          Contact Us
        </Link>
      </Box>
    </HideOnScroll>
  );
};

export default TopBar;
