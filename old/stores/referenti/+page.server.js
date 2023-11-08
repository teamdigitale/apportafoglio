import { referenti } from '../../stores/globaldata'
import { get } from 'svelte/store';

export async function load({ cookies }) {
    return {
        referenti: get(referenti)    
    };
}