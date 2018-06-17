import { remote } from 'electron';
import en from '../locale/en.json';
import fr from '../locale/fr.json';

// taken from main process
const defaultLocale = remote.app.getLocale().split('/')[0]; // in case en-US, fallback to en

const supportedLocales = {
  en, fr
}

const initialState = {
  locale: defaultLocale,
  locales: Object.keys(supportedLocales),
  messages: en
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LOCALE': {
      const locale = (action.locale).toLowerCase();
      const nextState = {
        locale,
        messages: supportedLocales[locale]
      };
      return {
        ...state,
        ...nextState
      };
    }
    default: {
      return state;
    }
  }
}
