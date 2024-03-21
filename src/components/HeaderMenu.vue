<script setup>
import { httpClient } from '@/lib/httpClient'; // Ensure you have this set up similarly to your React app
import Keycloak from 'keycloak-js';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { ref } from 'vue';


let initOptions = {
  url: 'http://localhost:8080/',
  realm: 'master',
  clientId: 'vue-client',
};

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: 'login-required',
  checkLoginIframe: true,
  pkceMethod: 'S256',
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.info("Authenticated");
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;
    kc.onTokenExpired = () => {
      console.log('token expired');
    };
  }
}).catch(() => {
  console.error("Authentication Failed");
});

const infoMessage = ref('');

function isAuthenticated() {
  infoMessage.value = kc.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE';
}

function login() {
  kc.login();
}

function logout() {
  kc.logout({ redirectUri: 'http://localhost:9000/' });
}

function showAccessToken() {
  infoMessage.value = kc.token;
}

function showParsedAccessToken() {
  infoMessage.value = JSON.stringify(kc.tokenParsed);
}

function checkTokenExpired() {
  infoMessage.value = kc.isTokenExpired(5).toString();
}

function updateToken() {
  kc.updateToken(10).then((refreshed) => {
    infoMessage.value = 'Token Refreshed: ' + refreshed.toString();
  }).catch(() => {
    infoMessage.value = 'Refresh Error';
  });
}

function callBackend() {
  httpClient.get('https://postman-echo.com/get?test=123')
}

// Role checks functions would go here, similar to updateToken or isAuthenticated

</script>

<template>
  <div class="flex flex-col justify-center items-center gap-6 p-5 max-w-1/2 min-w-1/2">
    <div class="flex flex-row mx-auto gap-4 p-5 bg-surface-200">
      <Button class="text-white" label="Is Authenticated" @click="isAuthenticated"></Button>
      <Button label="Login" @click="login"></Button>
      <Button label="Show Access Token" @click="showAccessToken"></Button>
      <Button label="Show Parsed Access token" @click="showParsedAccessToken"></Button>
      <Button label="Check Token expired" @click="checkTokenExpired"></Button>
      <Button label="Update Token" @click="updateToken"></Button>
      <Button label="Send HTTP Request" @click="callBackend"></Button>
      <Button label="Logout" @click="logout"></Button>
    </div>
    <Card class="accordion-down my-auto max-w-3/4">
      <template #content>
        <p class="break-all">
          {{ infoMessage }}
        </p>
      </template>
    </Card>

  </div>

</template>

<style></style>
