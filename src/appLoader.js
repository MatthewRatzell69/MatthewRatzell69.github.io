import * as main from "./main.js";
import "./sw-nav.js";
import "./sw-footer.js";
import "./sw-documentationGuy.js";



window.onload = () => {
	//if on horseplinko .com go to index
	if (location.href.match('www.horseplinko.com')) 
	{
		location.href = 'www.horseplinko.com/index.html'
		console.log('loading from web');

	}
	
	console.log("window.onload called");
	if (window.location.href.match('index.html')) 
	{
		main.init();
	}

}

