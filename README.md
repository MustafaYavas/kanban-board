# :heavy_check_mark: Kanban Board

It is a tool that allows you to visualize and manage your personal or team projects more easily. You can create your own project or join any of them and you can create new tasks for your project and assign it to a member.

## Table of Contents
* [Preview](#preview)
* [Technologies](#technologies)
* [Installation](#installation)
* [Update sources](#update-sources)
* [Contact](#contact)

## Preview
![Screenshot](https://raw.githubusercontent.com/MustafaYavas/kanban-board/master/client/public/screenshots/1.PNG)
***
![Screenshot](https://raw.githubusercontent.com/MustafaYavas/kanban-board/master/client/public/screenshots/2.PNG)
***
![Screenshot](https://raw.githubusercontent.com/MustafaYavas/kanban-board/master/client/public/screenshots/3.PNG)
***
![Screenshot](https://raw.githubusercontent.com/MustafaYavas/kanban-board/master/client/public/screenshots/4.PNG)
***
![Screenshot](https://raw.githubusercontent.com/MustafaYavas/kanban-board/master/client/public/screenshots/5.PNG)
***
![Screenshot](https://raw.githubusercontent.com/MustafaYavas/kanban-board/master/client/public/screenshots/6.PNG)

## Technologies
* [MongoDB](https://www.mongodb.com/)
* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)
* [React Router](https://reactrouter.com/)
* [Redux](https://redux.js.org/)

## Installation
To run it locally, first you need to clone this project (or download)

```
git clone https://github.com/MustafaYavas/kanban-board.git
```

Then enter the client and api files with the cd command and run the npm install command.

```
cd client
npm install 
cd ..
cd api
npm install 
cd ..
```

After, you need to create 2 env files. One for client and the other one is for api.

The env file located in the client folder should contain the following component.
```
REACT_APP_BACKEND_URL=http://localhost:5000/api
```

The env file located in the api folder should contain the following components.
```
JWT_SIGN_KEY=
MONGO_CONNECT_STRING=
```
Just write anything in the first variable. For the second variable, you need to open an account in Mongo and create a new cluster. Then, after creating a new user from the Database Access tab, copy the connection string given to you here

Finally run **npm start** command on both files separately.


## Update sources
Package usages in the application may vary.
Run the following command to update

```
$ npm run pull
```

## Contact
You can contact me for any bugs or suggestions: mustafayavas40@gmail.com
