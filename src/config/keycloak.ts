import Keycloak from 'keycloak-js';

// Initialize Keycloak with configuration from environment variables
const keycloakConfig = {
  url: process.env.REACT_APP_KEYCLOAK_URL || 'https://keycloak.example.com',
  realm: process.env.REACT_APP_KEYCLOAK_REALM || 'portal',
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || 'portal-frontend',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
