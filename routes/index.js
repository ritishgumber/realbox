module.exports = (app) => {
    var api = require('../api/index')();

    app.post('/onboarduser', function (req, res) {
        var data=req.body;
        api.onBoardUser(data).then(
            function (result) {
                res.send(result)

            },
            function (error) {
                console.log(error);
                res.send(error);
            });

    })
    app.post('/addPoints', function (req, res) {
        api.addPoints(req.body).then(
            function (result) {
                res.send(result)

            },
            function (error) {
                console.log(error);
                res.send(error);
            });
    })
    app.post('/transaction', function (req, res) {
        api.transaction(req.body).then(
            function (result) {
                res.send(result)

            },
            function (error) {
                console.log(error);
                res.send(error);
            });
    })
    app.get('/promotion', function (req, res) {

        api.applyPromotion().then(
            function (result) {
                res.send(result)

            },
            function (error) {
                console.log(error);
                res.send(error);
            });
    })
    app.post('/card/new', function (req, res) {
        api.createNewCard(req.body).then(
            function (result) {
                res.send(result)

            },
            function (error) {
                console.log(error);
                res.send(error);
            });
    })
    app.post('/card/default', function (req, res) {
        api.setDefaultCard(req.body).then(
            function (result) {
                res.send(result)

            },
            function (error) {
                console.log(error);
                res.send(error);
            });
    })
    app.post('/config/new', function (req, res) {
        api.newConfig(req.body).then(
            function (result) {
                res.send(result)

            },
            function (error) {
                console.log(error);
                res.send(error);
            });
    })
    app.post('/promotion/new', function (req, res) {
        api.createNewPromotion(req.body).then(
            function (result) {
                res.send(result)

            },
            function (error) {
                console.log(error);
                res.send(error);
            });
    })
    app.post('/loyalty/new', function (req, res) {
        api.createNewLoyalty(req.body).then(
            function (result) {
                res.send(result)

            },
            function (error) {
                console.log(error);
                res.send(error);
            });
    })
    app.post('/conversion/new', function (req, res) {
        api.createNewConversion(req.body).then(
            function (result) {
                res.send(result)
            },
            function (error) {
                console.log(error);
                res.send(error);
            });
    })

    app.post('/category/new',function(req,res){
            api.createNewCategory(req.body).then(
            function (result) {
                res.send(result)
            },
            function (error) {
                console.log(error);
                res.send(error);
            });
    
    })

    app.post('/category/type',function(req,res){
            api.mapCategoryToType(req.body).then(
            function (result) {
                res.send(result)
            },
            function (error) {
                console.log(error);
                res.send(error);
            });
    
    })

    
    
    
    
}