const ex = require('express');
const app = ex();

const RequestIp = require('@supercharge/request-ip')

const fs = require('fs');

app.get('/list', async (req, res) => {

    fs.readFile('listIp.txt', 'utf-8', (err, data) => {
      if (err) throw err;
      res.send(data.split(','));
    }
      );
  
  });

app.use(async (req, res) => {
  try {
    const data = await fs.promises.readFile('listIp.txt', 'utf-8');
    const r = data.split(',');
    const ip = RequestIp.getClientIp(req)


    if (!r.includes(ip)) {
      r.push(ip);

      fs.writeFileSync('listIp.txt', r.join());
    } else throw 'error';

    res.send(r);
  } catch (error) {
    res.statusCode = 400;
    res.end(error);
  }
});

app.listen(9999, () => console.log('connected'));
