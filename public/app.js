import * as Auth from './controller/auth.js'
import * as Home from './viewpage/home_page.js'
import * as Rack_Menus from './viewpage/rack_menus.js'

Auth.addEventListeners();
Home.addEventListeners();
Rack_Menus.addEventListeners();