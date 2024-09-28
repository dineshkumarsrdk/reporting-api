# E-commerce Campaign Reporting API with JWT Authentication

## Project setup
The postman collection has the API templates
> Please go ahead and fork this Postman collection to test the APIs [API Collection](https://www.postman.com/aviation-specialist-71042673/workspace/reporting-api/collection/36794855-3408f9e1-9ffa-4cc1-9d63-2b91cb8c03a8?action=share&creator=36794855)

You can also clone this repository on your local machine and try it out.
```sh
git clone https://github.com/dineshkumarsrdk/reporting-api.git
```

Install the dependencies and start the server.

```sh
npm i
node index.js
```

## API Endpoints

- GET: http://localhost:3000/user/:id - to get user details by id
- POST: http://localhost:3000/user - to create a new user
- PUT: http://localhost:3000/user/:id - to update the username and email
- DELETE: http://localhost:3000/user/:id - to delete a user by id
- POST: http://localhost:3000/user/login - to login a user
- POST: http://localhost:3000/report/upload-csv - to upload a csv file
- POST: http://localhost:3000/report/campaign?campaignName=<value> - to filter stats by campaign name
- POST: http://localhost:3000/report/fsnID?fsnID=<value> - to filter stats by fsn id
- POST: http://localhost:3000/report/adGroupID?adGroupID=<value> - to filter stats by ad group id
- POST: http://localhost:3000/report/productName?productName=<value> - to filter stats by product name

***Thank You! Have a great day!***

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
