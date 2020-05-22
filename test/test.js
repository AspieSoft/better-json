function runTest(json){

	console.log(json.parse(`
		{
    		option1: string,
    		//option2: true, /* commented out */
    		option3: true,
		}
	`));

	console.log(json.stringify({test: 2, unwantedFunction: function(){}}));

}

module.exports = runTest;
/\s*?"@aspiesoft\//