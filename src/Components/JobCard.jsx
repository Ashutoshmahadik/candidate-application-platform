import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 20,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#55EFC4",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  overlayContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

const JobCard = ({ job }) => {
  const classes = useStyles();
  const [showOverlay, setShowOverlay] = useState(false);

  const handleApply = () => {
    window.open(job.jdLink, "_blank");
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  if (!job) {
    return null; // Return null or some placeholder if job is undefined
  }

  return (
    <>
      <Card className={classes.root} onClick={toggleOverlay}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            {job.jobRole}
          </Typography>
          <Typography className={classes.description}>
            <img src={job.logoUrl} alt="Company Logo" style={{ width: 100 }} />
          </Typography>
          <Typography className={classes.description}>
            Company: {job.companyName}
          </Typography>
          <Typography className={classes.description}>
            Location: {job.location}
          </Typography>
          <Typography className={classes.description}>
            Description: {job.jobDetailsFromCompany.substring(0, 100)}
            {job.jobDetailsFromCompany.length > 100 && "..."}
          </Typography>
          <Typography className={classes.description}>
            Experience Required: {job.minExp} - {job.maxExp} years
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleApply}
          >
            Apply
          </Button>
        </CardContent>
      </Card>
      {showOverlay && (
        <div className={classes.overlay} onClick={toggleOverlay}>
          <div
            className={classes.overlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Button className={classes.closeButton} onClick={toggleOverlay}>
              Close
            </Button>
            <Typography className={classes.title} gutterBottom>
              {job.jobRole}
            </Typography>
            <Typography className={classes.description}>
              <img
                src={job.logoUrl}
                alt="Company Logo"
                style={{ width: 100 }}
              />
            </Typography>
            <Typography className={classes.description}>
              Company: {job.companyName}
            </Typography>
            <Typography className={classes.description}>
              Location: {job.location}
            </Typography>
            <Typography className={classes.description}>
              Description: {job.jobDetailsFromCompany}
            </Typography>
            <Typography className={classes.description}>
              Experience Required: {job.minExp} - {job.maxExp} years
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
