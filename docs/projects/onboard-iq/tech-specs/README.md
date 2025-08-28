# Onboarding IQ Portal Server

## Overview

This project contains the source code and resources for the merchant onboarding portal, Onboarding IQ.

Follow the instructions below for instructions on setting up your database and configuration to get started.

## Database Setup

### Database Creation

Create a local onboarding database:

```
createdb onboarding
```

### User Creation and Grants
Create a user named versatile:
```
create user versatile;

grant all on schema public to versatile;
```

### Database UUID Extension

Make sure that use have the UUID extension installed.

From the **psql** prompt in your omni_event database:

```
CREATE EXTENSION "uuid-ossp";
```

### Database Crypto Extension

Make sure that use have the pgcrypto extension installed.

From the **psql** prompt in your omni_event database:

```
CREATE EXTENSION pgcrypto;
```

## Configuration

This application uses *Spring Framework* application properties.

When running locally on your laptop, create an **application-local.properties** file and run the **Application** class using the *local* profile.

## Network Connectivity

You should be logged into the Versatile VPN if you want to connect to any non-local databases.


## Database User Setup

Grant the versatile user all privileges on the public schema:
```
GRANT all ON schema public to versatile;
```

## Running the Project

Run the `Application` kotliln class from IntelliJ.

Make sure to specify a sping profile:  local, dev, test, prod

Add the following JVM Option to avoid seeing RMI errors on your laptop:  `-Djava.rmi.server.hostname=localhost`