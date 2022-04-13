'npm run netlify' allows us to run a netlify server
netlify was installed in the package.json file

netlify.toml tells netlify what to do with our functions.
with that we need a functions directory

netlify.toml stuff
    [build] is a direction to build
    functions = tells build where to find the functions

    [[redirects]]
        from = '/api/*'
        to = '/.netlify/functions/:splat'
        In the url, we type in localhost:8888/api/ whatever
        we're redirected to 'localhost:8888/.netlify/functions/whatever
        BUT! 
        status = 200
        this will make sure the url reads localhost:8888/api/whatever

functions folder
    the naming convention can be anything.  it doesn't have to be 1-hello, 2-whatever, 3-yeah, etc.


function notes
    always export.handler and use async.  (event, context) is the norm
    handler = a function
    event = has info about incoming request. supplied by netlify
    context = where the function is running. won't use here. supplied by netlify
    body = must always return a string.  it can be stringified. 