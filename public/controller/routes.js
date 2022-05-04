import * as Home from '../viewpage/home_page.js';
import * as Admin from '../viewpage/admin_page.js';
import * as Maps from '../viewpage/maps_page.js';
import * as Rack_Menus from '../viewpage/rack_menus.js';

export const routePathnames = {
    HOME: '/',
    MAPS: '/maps',
    RACK_MENUS: '/rack_menus',
    ADMIN: '/admin',
}

export const routes = [
    {pathname: routePathnames.HOME, page: Home.home_page},
    {pathname: routePathnames.MAPS, page: Maps.maps_page},
    {pathname: routePathnames.RACK_MENUS, page: Rack_Menus.rack_menus_page},
    {pathname: routePathnames.ADMIN, page: Admin.admin_page},
];

export function routing(pathname, hash) {
    const route = routes.find(r => r.pathname == pathname);
    if (route) route.page();
    else routes[0].page();
}