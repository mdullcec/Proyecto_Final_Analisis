import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Keycloak from "keycloak-js";
import axios from "axios";
import querystring from 'querystring';
const tokenUrl = 'protocol/openid-connect/token';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const Productos = ({ keycloak }) => {
  const classes = useStyles();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (keycloak) {
      const { token } = keycloak;
      console.log(token);
    }
    // axios.get("http://localhost:9002/lista");
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8080/auth/realms/produccion/protocol/openid-connect/certs',
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   data: querystring.stringify({
    //     client_id: 'login_app',
    //     grant_type: 'password',
    //     // client_secret: '1f7ae33f-d158-47ea-b728-07453928060b',
    //     scope: 'openid',
    //     username: 'aacy777@gmail.com',
    //     password: 'haneganai777'
    //   })
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     if (response && response.data) {
    //       const { access_token } = response.data;
    //       axios.get('http://localhost:8000/producto/lista', { headers: { "Authorization": `Bearer ${access_token}` } })
    //         .then((resp) => console.log(resp))
    //         .catch((err) => console.log(err));
    //     }
    //   })
    //   .catch(error => console.error(error));
  }, [keycloak]);

  return (
    <div>
      <h2>Vista Productos</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default Productos;
