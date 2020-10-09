import {addClass} from './js/cssClassHandler';
import {removeClass} from './js/cssClassHandler';
import {openFormDialog} from './js/formHandler';
import {closeFormDialog} from './js/formHandler';
import {submitForm} from './js/formHandler';
import {chainGetQueryParams} from './js/formHandler';
import {drawChart} from './js/cardRenderer';
import {renderCards} from './js/cardRenderer';
import {removeCard} from './js/cardRenderer';
import {removeAllCards} from './js/cardRenderer';
import {setAlternativeImage} from './js/cardRenderer';
import {setItem} from './js/storage';
import {updateItem} from './js/storage';
import {getItem} from './js/storage';
import {deleteItem} from './js/storage';
import {clear} from './js/storage';
import {getAllItems} from './js/storage';

// To match the requirement: "At least one event listener should be imported."
import {autocomplete} from './js/formHandler';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/main.scss';
import './styles/header.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/card.scss';

// Imports needed for correct sw caching
import './js/chart';
import img from './img/logo.png';
import alternativeImg from './img/alternativeImage.jpg';

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
    removeCard,
    removeAllCards,
    setAlternativeImage,
    drawChart,
    chainGetQueryParams,
    autocomplete
}
