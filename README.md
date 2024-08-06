# Appointment app

This is an Appointment app's server side.

This app has the main purpose to give ability to customers make an appointment with one of business's artists.

Steps to start server:

- clone [appointment-be](https://github.com/baxamf/appointment-be)
- inside appointment-be folder execute yarn to install packages
- create .env and copy content from .env.example
- execute docker-compose up (docker and docker-compose has to be installed in system)
- yarn start

After backend has been started, you can run client side:

- clone [appointment-fe](https://github.com/baxamf/appointment-fe)
- run yarn to install packages
- run yarn compile to generate types from server graphql schema
- run dev

Admin credentials:

- email: admin@mail.com
- password: password

Staff credentials:

- email: staff1@mail.com
- password: password
