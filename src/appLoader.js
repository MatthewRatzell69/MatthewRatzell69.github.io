import * as main from "./main.js";
import "./sw-nav.js";
import "./sw-footer.js";
import "./sw-documentationGuy.js";



window.onload = () => {
	console.log("window.onload called");
	// 1 - do preload here - load fonts, images, additional sounds, etc...
	// 2 - start up app
	if (window.location.href.match('index.html')) 
	{
		main.init();
	}

}

