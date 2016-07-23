import axios from 'axios';
import { FETCH_CAVE, FETCH_CAVES } from './types';

export function fetchCave(cave_id) {
  const request = axios.get(`/api/v1/svg/${cave_id}`);

  return {
    type: FETCH_CAVE,
    payload: request
  };
}

export function fetchCaves() {
  const request = axios.get(`/api/v1/caves/`);

  return {
    type: FETCH_CAVES,
    payload: request
  };
}
