const prod = {
  apiKey: 'viajesAuth',
  url: 'https://api-viajes.denariotest.com.co',
  production: true,
}

const dev = {
  apiKey: 'viajesAuth',
  url: 'http://localhost:3000',
  production: false,
}

const local = {
  apiKey: 'viajesAuth',
  url: 'http://192.168.1.71:3000',
  production: false,
}

export const environment = {
  production: true,
  api: prod
};
