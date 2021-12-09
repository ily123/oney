import './CategoryCard.css'
import { NavLink } from 'react-router-dom';

const CategoryCard = () => {

        return (
            <div className="categCard">
                <div className="catge_effect">
                    <NavLink to={`/category/68887312`}>
                        <div className='categ_div'>
                            <img className= 'categ_image' src="https://media.istockphoto.com/photos/fine-art-abstract-floral-painting-background-picture-id1258336471" alt=""/>
                            <span className='categ_name'>Fine Art</span>
                        </div>
                    </NavLink>
                </div>
                <div className="catge_effect">
                    <NavLink to={`/category/68887430`}>
                        <div className='categ_div'>
                            <img className= 'categ_image' src="https://img1.etsystatic.com/039/2/7825924/il_570xN.571298381_jn6o.jpg" alt=""/>
                            <span className='categ_name'>Furniture</span>
                        </div>
                    </NavLink>
                </div>
                <div className="catge_effect">
                    <NavLink to={`/category/68888570`}>
                        <div className='categ_div'>
                            <img className= 'categ_image' src="https://img0.etsystatic.com/032/0/8363836/il_570xN.537149174_h4vf.jpg" alt=""/>
                            <span className='categ_name'>Wall Decor</span>
                        </div>
                    </NavLink>
                </div>
                <div className="catge_effect">
                    <NavLink to={`/category/68888454`}>
                        <div className='categ_div'>
                            <img className= 'categ_image' src="https://img0.etsystatic.com/048/0/5705154/il_570xN.661778006_iyj4.jpg" alt=""/>
                            <span className='categ_name'>Handbags</span>
                        </div>
                    </NavLink>
                </div>
                <div className="catge_effect">
                    <NavLink to={`/category/68889322`}>
                        <div className='categ_div'>
                            <img className= 'categ_image' src="https://img0.etsystatic.com/000/0/5911190/il_570xN.350598016.jpg" alt=""/>
                            <span className='categ_name'>Bath Products</span>
                        </div>
                    </NavLink>
                </div>
                <div className="catge_effect">
                    <NavLink to={`/category/68888468`}>
                        <div className='categ_div'>
                            <img className= 'categ_image' src="https://img0.etsystatic.com/035/0/6942602/il_570xN.625529500_4nce.jpg" alt=""/>
                            <span className='categ_name'>Computer Items</span>
                        </div>
                    </NavLink>
                </div>
                <div className="catge_effect">
                    <NavLink to={`/category/68888548`}>
                        <div className='categ_div'>
                            <img className= 'categ_image' src="https://img0.etsystatic.com/000/0/6319866/il_570xN.309251634.jpg" alt=""/>
                            <span className='categ_name'>Jewelry</span>
                        </div>
                    </NavLink>
                </div>
            </div>
            );
}

export default CategoryCard;
