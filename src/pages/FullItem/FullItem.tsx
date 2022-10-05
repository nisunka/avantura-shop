import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as BirthdayIcon } from '../../assets/icon/birthday.svg';
import { ReactComponent as GraduateIcon } from '../../assets/icon/graduate.svg';
import { addItem } from '../../redux/slices/cartSlice';
import style from './FullItem.module.css';
import { useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';

const FullItem: React.FC = () => {
  const [item, setItem] = React.useState<{
    name: string;
    age: number;
    direction: string;
    detail: string;
    price: number;
    imgUrl: string;
  }>();
  const { id } = useParams(); // хук делает перерисовку, если адресная строка поменяется (как и useLocation)
  const navigate = useNavigate(); // хук вернет функцию, которая позволит нам делать переходы, типа dispatch для react-router

  React.useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get('https://631717b482797be77ff302e4.mockapi.io/items/' + id);
        setItem(data);
      } catch (error) {
        alert('Не удалось получить товар. Сейчас вы окажетесь на главном экране');
        // если нет заданного товара, идет перееотправка юзера на главную страницу
        navigate('/');
      }
    }
    fetchItem();
  }, []);

  const dispatch = useDispatch();

  const onClickAdd = () => {
    dispatch(addItem(item));
  };

  if (!item) {
    return <Loading />;
  }

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        <img src={item.imgUrl} alt="" className={style.img} />
      </div>
      <div className={style.rightSide}>
        <Link to="/" className={style.link}>
          ← Каталог
        </Link>
        <h2 className={style.title}>{item.name}</h2>
        <div className={style.info}>
          <div className={style.age}>
            <BirthdayIcon className={style.svg} />
            <span>{item.age}+ лет</span>
          </div>
          <div className={style.direction}>
            <GraduateIcon className={style.svg} />
            <span>{item.direction}</span>
          </div>
        </div>
        <p className={style.detail}>{item.detail}</p>
        <div className={style.bottom}>
          <span className={style.price}>{item.price} ₽</span>
          <button onClick={onClickAdd} className={`${style.btn} btnPrimary`}>
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullItem;
