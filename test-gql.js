const https = require('https');

async function runTest(i) {
  return new Promise((resolve) => {
    const start = Date.now();
    const data = JSON.stringify({ query: 'query { __typename }' });

    const options = {
      hostname: 'api.expo.dev',
      path: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      resolve(`Node Test ${i}: ${res.statusCode} in ${Date.now() - start}ms`);
    });

    req.on('error', (error) => {
      resolve(`Node Test ${i}: FAILED ${error.message} in ${Date.now() - start}ms`);
    });

    req.write(data);
    req.end();
  });
}

async function run() {
  for (let i = 1; i <= 5; i++) {
    console.log(await runTest(i));
  }
}

run();
