// import { actionCreator } from './helpers';
import { action } from 'typesafe-actions';

// export function toggle = (openStatus: boolean) => {
//   actionCreator('TOGGLE_NOTIFICATION_PANEL', { isOpen: openStatus });
// }
 
export const toggle = (openStatus: boolean) => action('TOGGLE_NOTIFICATION_PANEL', { isOpen: openStatus });