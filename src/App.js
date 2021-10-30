import React from 'react';
import './App.css';
import Keycloak from 'keycloak-js';
import Productos from './components/productos';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      keycloak: null,
      authenticated: false
    }
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');

    keycloak.init({ onLoad: 'login-required' })
      .then((authenticated) => {
        this.setState({
          keycloak,
          authenticated: authenticated
        });
      })
      .catch((err) => console.error(err));
  }

  salirFunc = () => {
    if (this.state.keycloak) {
      this.state.keycloak.logout();
    }
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <p>
              Componentes asegurados
            </p>
            <button onClick={this.salirFunc} >Salir</button>
          </div>
          <Productos keycloak={this.state.keycloak} />
        </div>
      ); else return (<div>No se pudo autenticar!</div>)
    }

    return (
      <div>Initializing Keycloak...</div>
    );
  }
}

export default App;
