# Oney
[Oney](https://shoponey.herokuapp.com/) is a shopping web-app for handmade products. You can check out the web site by going to the link below.

<div align="center">👉👉👉 <a href="https://shoponey.herokuapp.com/">Live Website Deployed Here</div>

## Screenshots of App in Action

❌Will add screen shots once we are done❌

## Summary of main features

[Oney](https://shoponey.herokuapp.com/) includes MVP functionality for the following features:
- Product listing
		- Customers can add, edit, and delete their own products to the shop
		- Customers can browse other users' product listings
- Product reviews
	- Customers can leave product review
	- Customers can edit or delete their own reviews
	- Customers can read reviews left by other users
-  Product / Category browser
	- All products belong to one of 253 categories and sub-categories
	- Customers can browse products within specific categories using the category browser
- ❌ Shopping car // WORK IN PROGRESS ❌
	- Customers can add products to their shopping cart
	- The shopping cart persists between visits
	- Customers can check out their cart
- ❌ Search ❌
	- Users can search products by name and description

## Tech details

The app is a combination of a Python back-end, wrapped over a relational database, and a React front-end.

- Database
	- **PostgresQL** as the main (and only) data store
	- **SQLAlchemy** for object mapping
	- **Alembic** for easy migration management
- Back-end API (Python)
	- **Flask** with assorted libraries such as **WTForms**
	- Served with **gunicorn** from a **Docker** container
- Front-end client (JavaScript)
	- UI is written in **React** using functional components
	- **Redux** state management
