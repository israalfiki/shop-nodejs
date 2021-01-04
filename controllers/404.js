exports.loadNotFound = (req,res,next) => {
    // res.status(404).sendFile(path.join(rootDir,'views','not-found.html'))
    res.status(404).render('not-found', {pageTitle: 'Not Found', path: ''});

}