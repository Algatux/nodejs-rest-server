require('./clients/client')(app);

module.exports = function(app) {

  app.get('/',function(req,res){
      res.render('index', { title: 'ipRestSrv', subtitle : 'iPiccolo REST Server' });
  });

};
