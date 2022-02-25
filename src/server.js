const express = require('express');
const PORT = 8080;
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/reactors', function (req, res) {
 return res.json({message: "hi from server!"});
});


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
