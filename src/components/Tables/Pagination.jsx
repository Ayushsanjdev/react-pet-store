import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const Pagination = (props) => {
  const classes = useStyles();
  const { count, page, rowsPerPage, onPageChange } = props;

  const isPageIconDisabled = page >= Math.ceil(count / rowsPerPage) - 1;
  const handleLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

  const handlePageButtonClick = (event, pageAction) => {
    onPageChange(event, pageAction);
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={(e) => handlePageButtonClick(e, 0)}
        disabled={page === 0}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={(e) => handlePageButtonClick(e, page - 1)}
        disabled={page === 0}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={(e) => handlePageButtonClick(e, page + 1)}
        disabled={isPageIconDisabled}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={(e) => handlePageButtonClick(e, handleLastPage)}
        disabled={isPageIconDisabled}
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
};

export default Pagination;
