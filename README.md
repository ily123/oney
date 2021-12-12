
# Oney
[Oney](https://shoponey.herokuapp.com/) is a shopping web-app for handmade products. You can check out the web site by going to the link below.

<div align="center">👉👉👉 <a href="https://shoponey.herokuapp.com/">Live Website Deployed Here</div>

## Oney in Action


🔥Browse selected items and categories on the home page🔥
![homepage](https://raw.githubusercontent.com/ily123/oney/main/readme-gifs/1_home.gif)

🔥Navigate through a list of 250+ product categories🔥
![categories](https://raw.githubusercontent.com/ily123/oney/main/readme-gifs/2_navigation.gif)

🔥Search for items using the search bar🔥
![searchbar](https://raw.githubusercontent.com/ily123/oney/main/readme-gifs/3_search.gif)

🔥View specific items and read reviews!🔥
![product](https://raw.githubusercontent.com/ily123/oney/main/readme-gifs/4_item_page.gif)

🔥Add or remove items from the shopping cart & checkout!🔥
![cart](https://raw.githubusercontent.com/ily123/oney/main/readme-gifs/5_cart.gif)


## Summary of the main features

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
- Shopping car
	- Customers can add or remove products to/from their shopping cart
	- The shopping cart persists between visits
	- Customers can check out their cart
- Search
	- Users can search products by name and description

## Documentation (see wiki)
Detailed documentation with the database schema, back-end routes, front-end routes, user stores, and feature overview can be found in the [wiki](https://github.com/ily123/oney/wiki) 🔥🔥🔥

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

## Code snippet
```
import './ProductCard.css'
import { NavLink } from 'react-router-dom';

const ProductCard = ({id,price,images,title}) => {
	let image = images[0]?.url_570xN
	if (image) {
		return (
			<div className="prod">
				<NavLink to={`/products/${id}`}>
					<div className='product_card'>
					<img className= 'productImage' src={image} alt="Product Photo"/>
					<span className='productTitle'>{title}</span>
					<span className='productPrice'>${price}</span>
					</div>
				</NavLink>
			</div>
		);
	}
	return null
};

export default ProductCard;
```


## Contribution


- [Suchitra Mohan](https://github.com/suchimohan)
- [Ilya Novikov](https://github.com/ily123)
- [Caroline Sarki](https://github.com/Chocoloco123)
- [Kelsey Sry](https://github.com/kelseysry)


## Mock data credit

The app is seeded with mock data from this [paper](http://vision.is.tohoku.ac.jp/~kyamagu/research/etsy-dataset/).
