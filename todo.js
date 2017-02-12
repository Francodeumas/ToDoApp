(function(){

	'use strict';

	var todoLogic = {
		updateID : function(arr){
			arr.forEach(function(item,position){
				item.id = 1;
				item.id = item.id + position;
			})
		},

		removeExtraToDoItems : function(){
			var todoLists = document.getElementById('todoLists');
			    while(todoLists.hasChildNodes()){
			    	todoLists.removeChild(todoLists.lastChild);
			    }
		},

		displayTodo : function(){
			var todoLists = document.getElementById('todoLists'),
			     todoItems = JSON.parse(localStorage.getItem('datas'));
			     this.removeExtraToDoItems();
			     if(todoItems !== null){
			     todoItems.forEach(function(item,position){
			     	var lielement = document.createElement('li'),
			     		itemSpanElement = document.createElement('span'),
			     		editSpanElement = document.createElement('span'),
			     		deleteSpanElement = document.createElement('span'),
			     		editimage = document.createElement('img'),
			     		deleteimage = document.createElement('img');
			     		itemSpanElement.className = "todoitem";
			     		editSpanElement.className = "edit";
			     		deleteSpanElement.className = "delete";
			     		itemSpanElement.innerHTML = item.itemname;
			     		editimage.setAttribute('src','images/edit.png');
			     		editimage.className = "editIcon";
			     		editimage.id = "editimage "+item.id;
			     		deleteimage.setAttribute('src','images/close_icon.png');
			     		deleteimage.className = "deleteIcon";
			     		deleteimage.id = "deleteimage "+item.id;
			     		lielement.appendChild(itemSpanElement);
			     		editSpanElement.appendChild(editimage);
			     		deleteSpanElement.appendChild(deleteimage);
			     		lielement.appendChild(editSpanElement);
			     		lielement.appendChild(deleteSpanElement);
			     		todoLists.appendChild(lielement);
			     })
			}
		},

		storeData : function(todoitem){
			var lists = {
				'itemname' : todoitem,
				'id':1
			}
			if(localStorage.getItem('datas') === null){
				var arr = [];
				arr.push(lists);
				localStorage.setItem('datas',JSON.stringify(arr));
			}
			else {
				var arr = JSON.parse(localStorage.getItem('datas'));
				arr.push(lists);
				this.updateID(arr);
				localStorage.setItem('datas',JSON.stringify(arr));
			}
			this.displayTodo();
		},

		validateInput : function(){
			var todoTypeValue = document.getElementById('todoType').value.trim();
			if(todoTypeValue !== ''){
				this.storeData(todoTypeValue);
				document.getElementById('todoType').value = "";
			}
			else {
				alert('Oops... Type Something');
				document.getElementById('todoType').value = "";
				return false;
			}
		},

		deleteToDo : function(element){
			var id = element.id,
			    arr = JSON.parse(localStorage.getItem('datas'));
			   id = id.split(' ');
			   id = id[1] * 1;
			   arr.forEach(function(item,position){
			   	  if(item.id === id){
			   	  	arr.splice(position,1);
			   	  	localStorage.setItem('datas',JSON.stringify(arr));
			   	  }
			   })
		},

		editToDo : function(element){
			var id = element.id,
			    arr = JSON.parse(localStorage.getItem('datas'));
			   id = id.split(' ');
			   id = id[1] * 1;
			   arr.forEach(function(item,position){
			   	  if(item.id === id){
			   	  	var inputElement = document.createElement('input'),
			   	  	    todoitem = document.getElementsByClassName('todoitem'),
			   	  	    lielement = document.getElementsByTagName('li'),
			   	  	    btnElement = document.createElement('button');
			   	  	    inputElement.setAttribute('type','text');
			   	  	    inputElement.setAttribute('value',item.itemname);
			   	  	    inputElement.setAttribute('autofocus',true);
			   	  	    inputElement.id = "customTextBox";
			   	  	    btnElement.innerHTML = "Done";
			   	  	    btnElement.id = "doneBtn";
			   	  	    todoitem[position].style.display = "none";
			   	  	    lielement[position].appendChild(inputElement);
			   	  	    lielement[position].appendChild(btnElement);

			   	  }
			   })
		},

		editDone : function(element){
			var todoitem = document.getElementsByClassName('todoitem'),
				customTextBox = document.getElementById('customTextBox'),
				doneBtn = document.getElementById('doneBtn'),
				arr = JSON.parse(localStorage.getItem('datas'));
			
			for(var i=0; i<todoitem.length; i++){
				if(window.getComputedStyle(todoitem[i],null).getPropertyValue('display') === "none"){
					 todoitem[i].style.display = "inline-block";
					 	var value = customTextBox.value;
                         arr[i].itemname = value;
                         localStorage.setItem('datas',JSON.stringify(arr));
					 	customTextBox.style.display = "none";
					 	doneBtn.remove();
					 	this.displayTodo();

				}
			}

		}

	}



	 var events = {
	 	keyboardEvent : function(){
	 		document.addEventListener('keypress',function(event){
	 			if(event.which === 13 && event.target.id === "todoType"){
	 				todoLogic.validateInput();
	 			}
	 		});
	 		document.addEventListener('click',function(event){
	 			if(event.target.className === "deleteIcon"){
	 				todoLogic.deleteToDo(event.target);
	 				todoLogic.displayTodo();
	 			}
	 			else if(event.target.className === "editIcon"){
	 				todoLogic.editToDo(event.target);
	 			}
	 			else if(event.target.id === "doneBtn"){
	 				todoLogic.editDone(event.target);
	 			}
	 		})
	 	}
	 }

	 events.keyboardEvent();
	 todoLogic.displayTodo();

})();