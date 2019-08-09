const ko = (function(){
	// module pattern
	
	applyBindings = model => {	
	
		/* quand on set la property, met à jour la value pour tous les [data-bind="property"] */
		const handler = {
			set: (object, property, value) => {
				object[property] = value;
				console.log('handler called for property ' + property + ', value >' + value + '<');
				const selector = '[data-bind="' + property + '"]';
				document.querySelectorAll(selector).forEach(
					element => element.value = value
				);
				return true;
			}
		};			
	
		/* applique ce handler au model */
		let state = new Proxy(
			model,
			handler
		);		
	
		/* pour chaque propriété : event binding ou property binding */
		Object.keys(model).forEach(
			modelProperty => {
				if(typeof model[modelProperty] === "function") {
					// event binding (only "click")
					const selector = '[data-bind="click: ' + modelProperty + '"]';
					document.querySelectorAll(selector).forEach(
						element => {
							element.addEventListener(
								'click',
								model[modelProperty].bind(state)
							);
						}
					);
				} else {
					// property binding (only "value")
					const selector = '[data-bind="' + modelProperty + '"]';
					document.querySelectorAll(selector).forEach(
						element => {
							element.addEventListener(
								'input',
								event => {
									state[modelProperty] = event.target.value;
								}
							);
						}
					);						
				}
			}
		);
	}	
	
	return {
		applyBindings
	}
})();