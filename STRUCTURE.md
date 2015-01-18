Suggested arechticture:

modules register routes, there's an end point that will handle giving all the registered routes and point you to the right one "HADEOS"

for Models or IO, EYEO will handle the connection and will register all the model schemes for the application and export them

global config files handles environment specific options, such as connection info, port 


TODO: 
Finishing up CRUD
Routes display: Implement HATEOAS
ACL module: check the authorization to access based on passport?



