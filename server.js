const cl = console.log;
const PORT = 3000;
const app = require('./app.js');
app.listen(PORT, () => {
    cl(`Blog is fetched in port ${PORT}`);
})