# knockoutjs-like-binding
Vanilla JS Knockout-like data &amp; event binding

Two ways binding only for:
- "click" events
- "input" events
- "value" properties

HTML :
```
<input
	id="input-1"
	class="form-control"
	type="text"
	size="50"
	data-bind="saisie"
>
```

```
<button
	id="clear" 
	class="btn btn-warning"
	data-bind="click: clear"
>
	Clear
</button>
```

JS
```
<script src="pseudo-ko.js"></script>
```
and then:
```
let viewModel = {
	saisie: '',
	clear: function() { this.saisie = '';}
}

ko.applyBindings(viewModel);
```
