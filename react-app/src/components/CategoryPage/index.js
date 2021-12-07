import {useParams } from 'react-router-dom';

export default function CategoryPage() {
  const { categoryId } = useParams();
  return <h2>{`Category ${categoryId} items will go here.`}</h2>
}
