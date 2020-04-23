// 6 - Create a simple REST API for hosting customer data on any simple database or a file system folder. 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');

app.use(express.json());
app.use(bodyParser.json());

const customers = [ // to be replaced with DB or File system
    {id: 1, name: 'matthew'},
    {id: 2, name: 'mark'},
    {id: 3, name: 'luke'},
    {id: 4, name: 'john'},
    {id: 5, name: 'bob'}
]

// a - GET customer (retrieve, search)
app.get('/api/customers', (req, res) => { // returns all customers
    res.send(customers);
});

app.get('/api/customers/:key/:value', (req, res) => { // returns list off customer(s) based on searched key(id/name) and value
    if (!req.params.key) res.status(404).send('Customer field key is required');
    if (!req.params.value) res.status(404).send('Customer field value is required');

    let key = req.params.key;
    let value = req.params.value;
    if (key == 'id') value = parseInt(value, 10);
    let obj = {[key]: value};
    let customer = _.find(customers, obj);

    if (!customer) res.status(404).send('Customer could not be found'); // error handling

    res.send(customer);
});

//b - POST customer (insert)
app.post('/api/customers', (req, res) => { // insert customer
    if (!req.body.name) res.status(400).send('Customer name is required'); // error handling

    const customer = {
        id: customers.length + 1,
        name: req.body.name
    };

    customers.push(customer);
    res.send(customer);
});

//c - PUT customer (update)
app.put('/api/customers/:id', (req, res) => { // update customer fields based on id
    if (!req.params.id) res.status(404).send('Customer field id is required'); // error handling
    if (!req.body.name) res.status(400).send('Customer name is required');

    let value = parseInt(req.params.id, 10);
    let obj = {id: value};
    let customer = _.find(customers, obj);

    if (!customer) res.status(404).send('Customer could not be found'); // error handling

    customer.name = req.body.name;
    res.send(customer);
});

//d - PATCH customer (alter a particular field)
app.patch('/api/customers/:id', (req, res) => { // alter customer fields
    if (!req.params.id) res.status(404).send('Customer field id is required'); // error handling
    if (!req.body.name) res.status(400).send('Customer name is required');

    let value = parseInt(req.params.id, 10);
    let obj = {id: value};
    let customer = _.find(customers, obj);

    if (!customer) res.status(404).send('Customer could not be found'); // error handling

    customer.name = req.body.name;
    res.send(customer);
});

//e - DELETE customer (remove)
app.delete('/api/customers/:id', (req, res) => { // delete customer based on id
    if (!req.params.id) res.status(404).send('Customer field id is required'); // error handling

    let value = parseInt(req.params.id, 10);
    let obj = {id: value};
    let customer = _.find(customers, obj);

    if (!customer) res.status(404).send('Customer could not be found'); // error handling

    let index = customers.indexOf(customer);
    customers.splice(index, 1);
    res.send(customer);
});

app.listen(3000, () => 
    console.log('Listening on port 3000...')
);