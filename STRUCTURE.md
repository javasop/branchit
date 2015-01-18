Suggested arechticture:

modules register routes, there's an end point that will handle giving all the registered routes and point you to the right one "HADEOS"

pass running app to the module and the module will handle hooking route to it.

for Models or IO, a module will handle the connection and will register all the model schemes for the application

the purpose of IO is to hand over the object that's going to handle querying data?

global config files handles environment specific options, such as connection info, port, 

