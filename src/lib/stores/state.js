import { writable } from 'svelte/store';

export const user = writable({ id: '', type: '', name: '', email: '' });
export const ordersDateRange = writable('');
export const usersTableComponentInView = writable('table');
