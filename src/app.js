const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Navjot'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Navjot'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Navjot'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.latitude || !req.query.longitude) {
        return res.send({
            Error: 'You must provide both latitude and longitude!'
        });
    }

    geocode(req.query.longitude, req.query.latitude, (error, data) => {
        if (error) {
            return res.send({ error });
        }

        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location: data.location,
                latitude: data.latitude
            });
        });
    });
});
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Canada',
    //     address: req.query.address
    // })

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            Error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Error', {
        title: '404 help',
        name: 'Navjot',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404Error',{
        title: '404',
        name: 'Navjot',
        errorMessage:'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})