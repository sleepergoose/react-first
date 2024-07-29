import devModeVars from './config.dev.js';
import prodModeVars from './config.prod.js';

const modeVars =
  import.meta.env.MODE === 'production' ? prodModeVars : devModeVars;

export default {
  apiBaseUrl: '',
  isProduction: false,
  mode: '',
  ...modeVars,
};
