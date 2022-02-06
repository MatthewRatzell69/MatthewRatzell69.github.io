import * as main from "./main.js";
import "./sw-nav.js";
import "./sw-footer.js";
import "./sw-documentationGuy.js";



window.onload = () => {

	console.log("window.onload called");
	if (window.location.href.match('index.html')) 
	{
		main.init();
	}

}

