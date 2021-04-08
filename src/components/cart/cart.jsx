import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@material-ui/lab";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

export default function Cart({ count, products }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  const [isLoading, setIsLoading] = useState(false);
  const [inCartProducts, setInCartProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const getInCart = async function () {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        const filteredProducts = response.data.filter((p) => p.inCart == true);
        setInCartProducts(filteredProducts);
        let indexOfLastPost = 1 * postsPerPage;
        let indexOfFirstPost = indexOfLastPost - postsPerPage;
        setPosts(filteredProducts.slice(indexOfFirstPost, indexOfLastPost));
        setIsLoading(false);
      })
      .catch((err) => console.log(err, "err"));
  };

  const paginate = async function () {
    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    await setPosts(inCartProducts.slice(indexOfFirstPost, indexOfLastPost));
  };

  useEffect(() => {
    paginate();
  }, [currentPage]);

  useEffect(() => {
    getInCart();
  }, []);

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <i className="fas fa-shopping-bag">
          <span
            className={
              count === 0
                ? "ml-2 badge badge-warning"
                : "ml-2 badge badge-light"
            }
          >
            {count}
          </span>
        </i>
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Cart
        </DialogTitle>
        <DialogContent dividers>
          {posts.map((product) => (
            <div>
              <span>{product.name}</span>
              <span
                className={
                  count === 0
                    ? "badge badge-warning m-2"
                    : "badge badge-primary m-2"
                }
              >
                {count}
              </span>
              <button
                // onClick={() => this.props.onIncrement(this.props.product)}
                className="btn btn-primary btn-sm m-2"
              >
                +
              </button>
              <button
                // onClick={() => this.props.onDelete(this.props.product)}
                className="btn btn-danger btn-sm m-2"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
            // <Product
            //   key={prdct.id}
            //   product={prdct}
            //   onDelete={this.props.onDelete}
            //   onIncrement={this.props.onIncrement}
            // />
          ))}

          {/* <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography> */}
        </DialogContent>
        <div className="text-center">
          <Pagination
            variant="outlined"
            color="primary"
            count={Math.ceil(inCartProducts.length / postsPerPage)}
            onChange={(event, page) => {
              setCurrentPage(page);
            }}
          />
        </div>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
