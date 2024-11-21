const prod = {
  apiKey: 'viajesAuth',
  url: 'https://api-viajes.denariotest.com.co'
}

const dev = {
  apiKey: 'viajesAuth',
  url: 'http://localhost:3000'
}

const local = {
  apiKey: 'viajesAuth',
  url: 'http://192.168.1.71:3000'
}

export const environment = {
  production: true,
  api: prod
};
