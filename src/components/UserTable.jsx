import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ACCOUNT_TYPE, INTEGRATION_TYPE } from '../config/config';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  table: {
    margin: '2rem auto',
    maxWidth: '90%',
  },
  buttonRight: {
    margin: '4px',
  },
  special: {
    whiteSpace: 'pre-line',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  filterElement: {
    width: '150px',
    margin: '2rem',
  },
});

export default function UsersTable({ users: rows, convertAccount }) {
  const classes = useStyles();

  const [integrationFilter, setIntegrationFilter] = useState();
  const [accountTypeFilter, setAccountTypeFilter] = useState();
  const [finalUsers, setFinalUsers] = useState([]);

  useEffect(() => {
    console.log('calling users');
    setFinalUsers([...rows]);
  }, [rows]);

  useEffect(() => {
    let usersData = [...rows];
    if (integrationFilter) {
      usersData = usersData.filter(
        user => user.integrationType === integrationFilter,
      );
    }
    if (accountTypeFilter) {
      usersData = usersData.filter(
        user => user.accountType === accountTypeFilter,
      );
    }
    setFinalUsers(usersData);
  }, [rows, integrationFilter, accountTypeFilter]);

  const download = () => {
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(finalUsers));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'users.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleChange = event => {
    console.log(event);
    if (event.target.name === 'integrationFilter') {
      setIntegrationFilter(event.target.value);
    } else {
      setAccountTypeFilter(event.target.value);
    }
  };

  return (
    <>
      <Box>
        <div className="filters-wrapper">
          <FormControl className={classes.filterElement}>
            <InputLabel id="integration-Filter">Integration Type</InputLabel>
            <Select
              labelId="integration-Filter"
              id="integrationFilter"
              name="integrationFilter"
              value={integrationFilter}
              label="integrationFilter"
              onChange={handleChange}
              className={classes.sortSelect}
            >
              <MenuItem key={'null'} value={undefined}>
                All
              </MenuItem>
              {Object.keys(INTEGRATION_TYPE).map(i => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}

              {/* <MenuItem value={'gsuite'}>Miles Per Gallon</MenuItem>
              <MenuItem value={'github'}>Cylinders</MenuItem> */}
            </Select>
          </FormControl>
          <FormControl className={classes.filterElement}>
            <InputLabel id="accountType-Filter">Account Type</InputLabel>
            <Select
              labelId="accountType-Filter"
              id="accountTypeFilter"
              name="accountTypeFilter"
              value={accountTypeFilter}
              label="accountTypeFilter"
              onChange={handleChange}
              className={classes.sortSelect}
            >
              <MenuItem key={'null'} value={undefined}>
                All
              </MenuItem>
              {Object.keys(ACCOUNT_TYPE).map(i => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Integration Type</TableCell>
                <TableCell>Account Type</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finalUsers.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell className={classes.capitalize}>
                    {row.integrationType}
                  </TableCell>
                  <TableCell className={classes.capitalize}>
                    {row.accountType}
                  </TableCell>
                  <TableCell>
                    {row.accountType === ACCOUNT_TYPE.human ? (
                      <Button
                        className={classes.buttonRight}
                        onClick={() =>
                          convertAccount(row.id, ACCOUNT_TYPE.robo)
                        }
                        variant="contained"
                        color="primary"
                      >
                        Convert To Robo
                      </Button>
                    ) : (
                      <Button
                        className={classes.buttonRight}
                        onClick={() =>
                          convertAccount(row.id, ACCOUNT_TYPE.human)
                        }
                        variant="contained"
                        color="primary"
                      >
                        Convert To Human
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={download} variant="contained" color="primary">
          Download Users
        </Button>
      </Box>
    </>
  );
}
