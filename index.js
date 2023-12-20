const ex = require('express');
const app = ex();

const fs = require('fs');

app.use(async (req, res) => {
  try {
    const data = await fs.promises.readFile('listIp.txt', 'utf-8');
    const r = data.split(',');

    const ip = req.ip;

    if (!r.includes(ip)) {
      r.push(req.ip);

      fs.writeFileSync('listIp.txt', r.join());
    } else throw 'error';

    res.send(r);
  } catch (error) {
    res.statusCode = 400;
    res.end(error);
  }
});
app.listen(9999, () => console.log('connected'));
