var postMsg = ''

function postText(value){
console.log('iFrame sender: ' + value)
parent.postMessage(value, "*")
}


const scriptsInEvents = {

	async Hud_Event2_Act6(runtime, localVars)
	{
		postText(runtime.globalVars.postMsg)
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

