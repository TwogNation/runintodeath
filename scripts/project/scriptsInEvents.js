var postMsg = ''

function postText(value){
console.log('iFrame sender: ' + value)
parent.postMessage(value, "*")
}


const scriptsInEvents = {

	async EventSheet1_Event1_Act29(runtime, localVars)
	{
		runtime.globalVars.webSocket.onMessage = (event) => {
			if (event.data.startsWith('s:')){
				const score_ = event.data.split(':')[1];
				console.log(score_);
				runtime.globalVars.score = score_;
				runtime.callFunction("updateScore")
			}
		}
	},

	async EventSheet1_Event19_Act3(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:1")
	},

	async EventSheet1_Event31_Act1(runtime, localVars)
	{
		console.log(runtime.globalVars.LastClickTime > runtime.globalVars.Clickcooldown)
		const now = Date.now();
		runtime.globalVars.LastClickTime = now;
		console.log("last click", runtime.globalVars.LastClickTime)
	},

	async EventSheet1_Event35_Act7(runtime, localVars)
	{
		runtime.globalVars.Clickcooldown = runtime.globalVars.LastClickTime + 1000;
		console.log("cooldown", runtime.globalVars.Clickcooldown)
		
	},

	async Hud_Event2_Act2(runtime, localVars)
	{
		runtime.globalVars.webSocket.close();
	},

	async Hud_Event2_Act3(runtime, localVars)
	{
		window.parent.postMessage("WebSocketClosed", "*");
	},

	async Start_event_Event8_Act1(runtime, localVars)
	{
		const textInstance = runtime.objects.ErrorText.getFirstInstance()
		textInstance.text = "PLEASE ROTATE SCREEN"
		console.log("PLEASE ROTATE")
	},

	async Start_event_Event10_Act1(runtime, localVars)
	{
		const queryParams = new URLSearchParams(window.location.search)
		const token = queryParams.get('token');
		const gameId = queryParams.get('gameId');
		console.log("clicked")
					const textInstance = runtime.objects.Text.getFirstInstance()
					textInstance.text = "PLEASE WAIT..."
					const button = runtime.objects.GunHand.getFirstInstance();
					button.destroy(); 
		// Add a variable to track if the WebSocket is already connected or in the process of connecting
		let isWebSocketConnectingOrConnected = false; 
					
		try {
		    // Check if the WebSocket is already connected or in the process of connecting
		    if (!isWebSocketConnectingOrConnected) {
		        const webSocket = new WebSocket('wss://arcade.shadow.legacyarcade.com/ws', [token, gameId]);
		        runtime.globalVars.webSocket = webSocket;
		
		        webSocket.onopen = (event) => {
		            isWebSocketConnectingOrConnected = true;  // Set the flag to true when connection is established
		            runtime.callFunction('startendless');
		        };
		
		        webSocket.onclose = (event) => {
		            isWebSocketConnectingOrConnected = false; // Reset the flag when the connection is closed
		        };
		
		        webSocket.onerror = (event) => {
		            isWebSocketConnectingOrConnected = false; // Reset the flag on error
		        };
		
		        runtime.globalVars.playable = 1;
		    }
		} catch (e) {
		    const textInstance = runtime.objects.ErrorText.getFirstInstance();
		    textInstance.text = "ERROR CONNECTING";
		    console.log("error connecting to server", e);
		}
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

