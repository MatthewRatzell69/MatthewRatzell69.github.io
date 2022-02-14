import * as main from "./main.js";
import "./sw-nav.js";
import "./sw-footer.js";
import "./sw-documentationGuy.js";


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
	

	if (window.location.href.match('index.html')) 
	{
		console.log("window.onload called");
		main.init();
	}

	/*
	//method to reload on first load
	if(!window.location.hash) {
        //setting window location
        window.location = window.location + '#loaded';
        //using reload() method to reload web page
        window.location.reload();
    }
	*/
}

