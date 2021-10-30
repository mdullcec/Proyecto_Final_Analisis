import React from 'react';
import logo from './logo.svg';
import './App.css';
import Keycloak from 'keycloak-js'
import {ReactKeycloakProvider} from '@react-keycloak/web'
import { AppRouter } from './routes'


const keycloak = new Keycloak({
realm: "dev",
url: "http://localhost:8080/auth",
clientId: "employee-service",
})

const keycloakProviderInitConfig = {
onLoad: 'check-sso',
}


class App extends React.PureComponent {
onKeycloakEvent = (event, error) => {
console.log('onKeycloakEvent', event, error)
}

onKeycloakTokens = (tokens) => {
console.log('onKeycloakTokens', tokens)
}
render(){
  return (
    <ReactKeycloakProvider
    authClient={keycloak}
    initConfig={keycloakProviderInitConfig}
    onEvent={this.onKeycloakEvent}
    onTokens={this.onKeycloakTokens}
    >
    <AppRouter />
    </ReactKeycloakProvider>
  );
}

}

export default App;
