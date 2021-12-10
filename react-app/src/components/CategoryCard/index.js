import './CategoryCard.css'
import { NavLink } from 'react-router-dom';

let cardDetailsList = [{"id" : 68887312, "image" : "https://media.istockphoto.com/photos/fine-art-abstract-floral-painting-background-picture-id1258336471", "title": "Fine Art" },
                        {"id" : 68887430, "image": "https://img1.etsystatic.com/039/2/7825924/il_570xN.571298381_jn6o.jpg", "title": "Furniture"},
                        {"id" : 68888570, "image": "https://img0.etsystatic.com/032/0/8363836/il_570xN.537149174_h4vf.jpg", "title": "Wall Decor"},
                        {"id" : 68888454, "image": "https://img0.etsystatic.com/048/0/5705154/il_570xN.661778006_iyj4.jpg", "title" : "Handbags"},
                        {"id" : 68889322, "image": "https://img0.etsystatic.com/000/0/5911190/il_570xN.350598016.jpg", "title": "Bath Products"},
                        {"id" : 68888468, "image": "https://img0.etsystatic.com/035/0/6942602/il_570xN.625529500_4nce.jpg", "title": "Computer Items"},
                        {"id" : 68888548, "image": "https://img0.etsystatic.com/000/0/6319866/il_570xN.309251634.jpg", "title": "Jewelry"}
                        ]

const CategoryCard = () => {

        return (
            <div className="categ_parent_div">
                <div className="bgcolor_div"></div>
                <div className="categCard">
                    {(cardDetailsList.map(cardDetails =>{
                        return (
                            <div key={"cardDetails-"+cardDetails.id} className="catge_effect">
                                <NavLink to={"/category/"+cardDetails.id}>
                                    <div className='categ_div'>
                                        <img className= 'categ_image' src={cardDetails.image} alt="Photo"/>
                                        <span className='categ_name'>{cardDetails.title}</span>
                                    </div>
                                </NavLink>
                            </div>
                        )
                    }))}
                </div>
            </div>
            );
}

export default CategoryCard;
