import TestButton from '../components/TestButton';
import HallOfFameButton from '../components/HallOfFameButton';

const MainSection = () => {
  const mainSection = document.createElement('section');
  mainSection.classList.add('mainSection');

  mainSection.appendChild(TestButton());
  mainSection.appendChild(HallOfFameButton());

  return mainSection;
};
export default MainSection;
