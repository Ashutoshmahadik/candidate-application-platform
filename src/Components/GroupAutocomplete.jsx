// GroupedAutocomplete.jsx
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import JobCard from "./JobCard";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

const useGroupedAutocomplete = (options) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectOption = (option) => {
    setSelectedOptions([...selectedOptions, option]);
  };

  const handleRemoveOption = (optionToRemove) => {
    setSelectedOptions(
      selectedOptions.filter((option) => option !== optionToRemove)
    );
  };

  return {
    selectedOptions,
    handleSelectOption,
    handleRemoveOption,
  };
};

const GroupedAutocomplete = ({ options = [] }) => {
  const classes = useStyles();
  const { selectedOptions, handleSelectOption, handleRemoveOption } =
    useGroupedAutocomplete(options);

  const [jobs, setJobs] = useState([]);

  // Fetch jobs based on selected options
  // Fetch jobs based on selected options
  useEffect(() => {
    const fetchData = async () => {
      // Construct API request based on selected options
      const selectedRoles = selectedOptions.filter(
        (option) => option.category === "Role"
      );
      const selectedLocations = selectedOptions.filter(
        (option) => option.category === "Location"
      );
      // Make API request with selected roles and locations
      // Replace the fetch call with your actual API call
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roles: selectedRoles,
            locations: selectedLocations,
          }),
        }
      );
      const data = await response.json();
      // Access the jdList property of the data object
      if (data && data.jdList) {
        setJobs(data.jdList);
      }
    };

    fetchData();
  }, [selectedOptions]);

  return (
    <Grid container spacing={2} width={100} className={classes.container}>
      {/* Autocomplete components for different filter options */}
      {/* Role */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Autocomplete
          multiple
          options={options.filter((option) => option.category === "Role")}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Role"
              style={{ width: "80%" }}
            />
          )}
          onChange={(event, value) => handleSelectOption(value)}
          value={selectedOptions.filter((option) => option.category === "Role")}
          renderTags={(value, getTagProps) =>
            value
              ? value.map((option, index) => (
                  <Chip
                    key={index}
                    label={option.title}
                    {...getTagProps({ index })}
                    onDelete={() => handleRemoveOption(option)}
                  />
                ))
              : null
          }
        />
      </Grid>
      {/* Location */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Autocomplete
          multiple
          options={options.filter((option) => option.category === "Location")}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Location"
              style={{ width: "80%" }}
            />
          )}
          onChange={(event, value) => handleSelectOption(value)}
          value={selectedOptions.filter(
            (option) => option.category === "Location"
          )}
          renderTags={(value, getTagProps) =>
            value
              ? value.map((option, index) => (
                  <Chip
                    key={index}
                    label={option.title}
                    {...getTagProps({ index })}
                    onDelete={() => handleRemoveOption(option)}
                  />
                ))
              : null
          }
        />
      </Grid>
      {/* Other filter options can be added similarly */}

      {/* Display Job Cards */}
      {jobs.map((job) => (
        <Grid key={job.jdUid} item xs={12} sm={6} md={4} lg={3}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GroupedAutocomplete;
