module.exports = function(app) {

    app.get('/clients',function(req,res){
        res.render('index', { title: 'Clients' });
    });

};