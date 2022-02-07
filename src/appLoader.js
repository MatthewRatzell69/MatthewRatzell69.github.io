import * as main from "./main.js";
import "./sw-nav.js";
import "./sw-footer.js";
import "./sw-documentationGuy.js";

let bool = true;

window.onload = () => {
/*
	if(bool){
		if (location.href.match('www.horseplinko.com')) 
		{
			location.href = '/index.html'
			console.log('loading from web');
	
		}
		bool = false;
	}
	*/
	
	console.log("window.onload called");
	if (window.location.href.match('index.html')) 
	{
		main.init();
	}

}

