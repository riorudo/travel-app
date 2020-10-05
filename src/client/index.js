import {addClass} from './js/cssClassHandler';
import {removeClass} from './js/cssClassHandler';
import {openFormDialog} from './js/formHandler';
import {closeFormDialog} from './js/formHandler';
import {submitForm} from './js/formHandler';
import {drawChart} from './js/cardRenderer';
import {renderCards} from './js/cardRenderer';
import {clearCard} from './js/cardRenderer';
import {clearAllCards} from './js/cardRenderer';
import {alternativeImage} from './js/cardRenderer';
import {setItem} from './js/storage';
import {updateItem} from './js/storage';
import {getItem} from './js/storage';
import {deleteItem} from './js/storage';
import {clear} from './js/storage';
import {getAllItems} from './js/storage';
import './styles/resets.scss';
import './styles/base.scss';
import './styles/main.scss';
import './styles/header.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/card.scss';
import img from './img/logo.png';

setTimeout(() => {
    renderCards();
}, 0);

export {
    setItem,
    updateItem,
    getItem,
    deleteItem,
    clear,
    getAllItems,
    addClass,
    removeClass,
    openFormDialog,
    closeFormDialog,
    submitForm,
    renderCards,
    clearCard,
    clearAllCards,
    alternativeImage,
    drawChart
}
