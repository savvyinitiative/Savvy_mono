import Keycloak, { KeycloakConfig } from 'keycloak-js'

const keycloakConfig: any = {
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || '',
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || '',
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || ''
  }

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;