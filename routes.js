/**
 * Created by Chris on 4/11/2017.
 */
module.exports = function(app){
    app.get('/submitpdf/:path', function(req, res){
        console.log(req.params['path']);
    });
}