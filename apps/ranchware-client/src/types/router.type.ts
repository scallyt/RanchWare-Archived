import { RouteObject } from 'react-router-dom';
export type Route = RouteObject & {
  title?: string | undefined;
  children?: Route[];
};