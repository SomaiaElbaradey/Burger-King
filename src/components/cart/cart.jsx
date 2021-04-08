import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@material-ui/lab";

import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, Typography, IconButton } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

import "./cartStyle.css";
import Loading from "../loading";

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
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[200],
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
      padding: theme.spacing(4),
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
  const [inCart, setInCart] = useState(false);
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

  const onDecrement = async function (product) {
    console.log("onDecrement");
    setInCart(false);
    if (product.count != 1) {
      await axios.patch(`http://localhost:8000/products/${product.id}`, {
        count: product.count - 1,
      });
      setInCart(true);
    }
  };

  const onIncrement = async function (product) {
    console.log("onIncrement");
    setInCart(false);
    await axios.patch(`http://localhost:8000/products/${product.id}`, {
      count: product.count + 1,
    });
    setInCart(true);
  };

  const onDelete = async function (product) {
    console.log("onDelete", product);
    setInCart(false);
    await axios.patch(`http://localhost:8000/products/${product.id}`, {
      inCart: false,
      count: 0,
    });
    setInCart(true);
  };

  useEffect(() => {
    paginate();
  }, [currentPage]);

  useEffect(() => {
    getInCart();
  }, [inCart]);

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
        scroll="body"
        PaperProps={{
          style: {
            backgroundColor: "#0d0c0a",
            color: "white",
            font: "bebe, 'Open Sans', 'Helvetica Neue', sans-serif",
            border: "1px #f4b325 solid",
            width: "100%",
          },
        }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Your Cart
        </DialogTitle>
        <DialogContent dividers>
          {!isLoading ? (
            posts.map((product) => (
              <div className="card d-flex flex-row text-start">
                <div>
                  <img width="40" className="m-2" src={product.image} />
                  <div className="container d-inline cart-control">
                    <button
                      className="mr-3 ml-3"
                      onClick={() => onDecrement(product)}
                    >
                      -
                    </button>
                    <span className="mr-3">{product.count}</span>

                    <button
                      className="mr-3"
                      onClick={() => onIncrement(product)}
                    >
                      +
                    </button>
                    <button className="mr-3" onClick={() => onDelete(product)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <span>{product.name}</span>
                </div>
              </div>
            ))
          ) : (
            <div>
              <Loading />
            </div>
          )}
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
