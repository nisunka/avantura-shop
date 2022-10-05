import { ReactComponent as BenefitsIcon } from '../../assets/aboutImg/benefits.svg';
import { ReactComponent as GameIcon } from '../../assets/aboutImg/game.svg';
import { ReactComponent as TrophyIcon } from '../../assets/aboutImg/trophy.svg';
import { ReactComponent as TogetherIcon } from '../../assets/aboutImg/together.svg';
import style from './About.module.css';

const listInfo = [
  {
    title: 'Обучение',
    description: 'Игры развивают навыки счёта, чтения на русском и английском языках',
    img: <BenefitsIcon />,
  },
  {
    title: 'Развлечение',
    description: 'Обучающие задания обёрнуты в весёлую игровую форму',
    img: <GameIcon />,
  },
  {
    title: 'Подарок',
    description: 'Настольные игры и квестики отлично подходят в качестве подарка',
    img: <TrophyIcon />,
  },
  {
    title: 'Сплочение',
    description: 'Игры собирают детей и взрослых с разными интересами за одним столом',
    img: <TogetherIcon />,
  },
];

const About: React.FC = () => {
  return (
    <div className={style.container}>
      <span className={style.head}>
        Развивайте важные школьные навыки с обучающими настольными играми от Авантюры
      </span>
      <div className={style.content}>
        {listInfo.map((item, index) => (
          <div className={style.item} key={index}>
            <div className={style.img}>{item.img}</div>
            <span className={style.title}>{item.title}</span>
            <span className={style.description}>{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
