import * as Style from '../styledComponents/CategoryStyle';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { categories } from '../data/categoryData';
import { communityProps } from '../types/types';

const Category = ({
  selectedCategoryId,
  setSelectedCategoryId
}: Pick<communityProps, 'selectedCategoryId' | 'setSelectedCategoryId'>) => {
  const handleCategorySelect = (category: string) => {
    setSelectedCategoryId(category);
  };

  return (
    <Style.CategoryContainer>
      <div className="category-title">
        <h2>토끼굴🐰</h2>
        <Link to="/write">
          <Button value="작성하기" color="darkPurple" />
        </Link>
      </div>
      <div className="category-list">
        <p className="category-list-title">토픽</p>
        <ul>
          {categories.map(category => (
            <li key={category.id}>
              <Link
                to={`/community/post/${category.id}`}
                onClick={() => handleCategorySelect(category.id)}
                className={selectedCategoryId === category.id ? 'active' : ''}
              >
                <img src={category.icon} alt={category.name} />
                <p>{category.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Style.CategoryContainer>
  );
};

export default Category;
