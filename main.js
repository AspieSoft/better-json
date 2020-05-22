const parseJSON = JSON.parse.bind({});
const stringifyJSON = JSON.stringify.bind({});

newParseJSON = function(text, reviver){
	if(typeof text === 'function' || typeof text === 'undefined' || text === null){return null;}
	if(typeof text === 'object' || Array.isArray(text)){return JSON.parse(JSON.stringify(text));}
	text = text.toString();
	if(text.match(/^[0-9]+(\.[0-9]+|)$/s)){
		return Number(text);
	}else if(text === 'true'){
		return true;
	}else if(text === 'false'){return false;}
	if(!text.match(/[{}\[\]]/g)){return text.toString();}
	if(!text.endsWith('\n')){text += '\n';}
	text = text.replace(/\/\/.*?\n/gm, '').replace(/\/\*.*?\*\//gs, '');
	text = normalizeJson(text);
	try{
		return parseJSON(text, reviver);
	}catch(e){return null;}
};

newStringifyJSON = function(value, replacer, space){
	if(typeof value === 'string' && value.match(/[{}\[\]]/g)){
		value = JSON.parse(value);
	}else if(typeof value === 'string'){
		if(value.match(/^[0-9]+(\.[0-9]+|)$/s)){
			value = Number(value);
		}else if(value === 'true'){
			value = true;
		}else if(value === 'false'){value = false;}
	}return stringifyJSON(value, replacer, space);
};

function normalizeJson(str){
	return str.replace(/[\s\n\r\t]/gs, '').replace(/,([}\]])/gs, '$1')
	.replace(/([,{\[]|)(?:("|'|)([\w_\- ]+)\2:|)("|'|)(.*?)\4([,}\]])/gs, (str, start, q1, index, q2, item, end) => {
		item = item.replace(/"/gsi, '').trim();
		if(index){index = '"'+index.replace(/"/gsi, '').trim()+'"';}
		if(!item.match(/^[0-9]+(\.[0-9]+|)$/) && !['true','false'].includes(item)){item = '"'+item+'"';}
		if(index){return start+index+':'+item+end;}
		return start+item+end;
	});
}

module.exports = (function(){
	const exports = function(){
		JSON.parse = newParseJSON;
		JSON.stringify = newStringifyJSON;
	}
	exports.parse = newParseJSON;
	exports.stringify = newStringifyJSON;
	return exports;
})();
