import * as main from "./main.js";
import "./sw-nav.js";
import "./sw-footer.js";
import "./sw-documentationGuy.js";


window.onload = () => {

	//method to reload on first load
	if(!window.location.hash) {
        //setting window location
        window.location = window.location + '/'+'index.html'+'#loaded';
        //using reload() method to reload web page
        window.location.reload();
    }

	console.log("window.onload called");
	if (window.location.href.match('index.html')) 
	{
		main.init();
	}

}

