Suggested arechticture:

modules register routes, there's an end point that will handle giving all the registered routes and point you to the right one "HADEOS"

for Models or IO, EYEO will handle the connection and will register all the model schemes for the application and export them

global config files handles environment specific options, such as connection info, port 


TODO: 
add an admin module which will take the list of dbs and do a crud on all of them
Finishing up CRUD: implement crud for tutorials
Add search to different routes (concepts, tutorials), I will use filter on client side for now
Add a feature to only add and delete sub documents from routes, for now I am doing only atomic updates
Implement Auth tokens for requests, We will probably disable checking auth for now
Routes display: Implement HATEOAS
