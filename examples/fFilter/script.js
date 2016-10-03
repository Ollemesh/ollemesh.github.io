//---------- class List -----------------------------------

function List(elements, container) {
	this.elements = this.showingElements = elements || [];
	this.container = container;
	this.searchField;
}

List.prototype.considerSavedList = function(savedList) {
	savedList.elements.forEach((friend) => {
		this.removeElement(friend.user_id); 
	})
};

List.prototype.renderListOnPage = function() {
	this.renderElementsOnPage(this.showingElements);
};

List.prototype.add = function(friendElement) {
	this.elements.push(friendElement);
	this.renderElementsOnPage([friendElement]);
};

List.prototype.remove = function(friendsVkId) {
	this.container.removeChild(this.container.querySelector(`[data-vk-id="${friendsVkId}"]`));
	this.removeElement(friendsVkId);
};

List.prototype.removeElement = function(friendsVkId) {
	let index;
	this.elements.forEach((element, i) => {
		if (element.user_id === friendsVkId) index = i;
	})
	this.elements.splice(index, 1);
};

List.prototype.getFriendByVkId = function(vkId) {
	return this.elements.filter((friend) => friend.user_id === parseInt(vkId))[0];
};

List.prototype.renderElementsOnPage = function(elementsArray) {
	let source = friendPostTemplate.innerHTML;
	let tamplateFn = Handlebars.compile(source);
	let tamplate = tamplateFn({list: elementsArray});
	this.container.innerHTML += tamplate;
};

List.prototype.showSuitableFriends = function(e) {
	searchFieldValue = e.target.value;
	this.showingElements = this.elements.filter(this.isSuitable);
	this.container.innerHTML = '';
	this.renderListOnPage();
};

List.prototype.isSuitable = function(friend, index, arr) {
	let searchWord = this.searchFieldValue.toLowerCase();
	for(let i = 0; i < searchWord.length; i++) {
		if (searchWord[i] === (friend.first_name+' '+friend.last_name)[i].toLowerCase()) continue;
		else return false;
	}
	return true;
};

//-------------------------------------------------

//------  getFriendsList([callaback]) -------------
function getFriendsList(callback) {

	new Promise (resolve => {
		document.readyState === 'complete' ? resolve() : window.onload = resolve;
	}).then(() =>{
		return new Promise((resolve, reject) => {
			VK.init({
				apiId: 5570832
			});

			VK.Auth.login(response => {
				response.session ? resolve(response) : reject(new Error('Не удалось авторизоваться'));
			}, 2);
		});
	}).then(() => {
		return new Promise((resolve, reject) => {
			VK.api('users.get', {version: '5.53'}, (response) => {
				if(response.error)
					reject(new Error(response.error.error_msg));
				else {
					resolve();
				}
			});
		})
	}).then(() => {
		return new Promise((resolve, reject) => {
			VK.api('friends.get', {fields: 'photo_100'}, friendsList => {
				if(friendsList.error) 
					reject(new Error(response.error.error_msg));
				else {
					console.log('GET FRIENDS LIST');
					resolve(friendsList);
				}
			})
		});
	}).then((friendsList)=>{
		if(callback) callback(friendsList.response);
	}).catch(function(e) {
		alert(`Ошибка: ${e.message}`);
	});
};
//-----------------------------------------------------------

//---------------- Drag&Drop mobule --------------------------
let body = document.querySelector('body');
function startDrag(e) {
	let friendItem = e.target.closest(".friendItem");
	if(!friendItem) return
  let scroll = leftContainer.scrollTop;
	friendItem.style.zIndex = '1';
	friendItem.style.position = 'absolute';
	friendItem.dataset.container = friendItem.closest('#leftContainer') ? 'left' : 'right';

	let offsetX = e.clientX - friendItem.getBoundingClientRect().left;
	let offsetY = e.clientY - friendItem.getBoundingClientRect().top;

	e.preventDefault();

  move(e);

	body.addEventListener('mousemove', move);
	body.addEventListener('mouseup', stopDrag);

	//Функция перемещения блока. Определена внутри startDrag, чтобы объект текущего блока хранился в замыкании, и доступ 
	//к нему сохранялся при резком рывке мышкой. 
	function move(e) {
    console.log(leftContainer.scrollTop);
		friendItem.style.left = e.clientX - offsetX + 'px';
		friendItem.style.top = e.clientY - offsetY - scroll + 'px';
	};

	//Функция окончания перетаскивания блока. Определена внутри startDrag, чтобы иметь доступ к локальним переменным move и block 
	function stopDrag(e) {
		friendItem.style.zIndex = '0';
		friendItem.style.position = 'static';
		friendItem.style.left = 'auto';
		friendItem.style.top = 'auto';

		if(friendItem.dataset.container === 'left') {
			if(document.elementFromPoint(e.clientX, e.clientY).closest('#rightContainer')) {
				rightSideList.add(leftSideList.getFriendByVkId(friendItem.dataset.vkId));
				leftSideList.remove(friendItem.dataset.vkId);
			}
		} else {
			if(document.elementFromPoint(e.clientX, e.clientY).closest('#leftContainer')) {
				leftSideList.add(rightSideList.getFriendByVkId(friendItem.dataset.vkId));
				rightSideList.remove(friendItem.dataset.vkId);
			}
		}
		body.removeEventListener('mousemove', move);
		body.removeEventListener('mouseup', stopDrag);
	};
};
//------------------------------------------------------------

//----------------- save to LocalStorage module -------------
function getSavedFriendsElements() {
	if(localStorage.friendsList)
		return JSON.parse(localStorage.friendsList).elements;
	else return [];
};

function saveFriendsList() {
	localStorage.friendsList = JSON.stringify(this);
};
//------------------------------------------------------------

//-------------------main Code--------------------------------
let leftSideList, rightSideList;

//Обработчик
body.addEventListener('mousedown', startDrag);



//Получаем список друзей с сервера VK
new Promise(require => {
	getFriendsList(require);
}).then((friendsList) => {

	rightSideList = new List(getSavedFriendsElements(), rightContainer);
	leftSideList = new List(friendsList, leftContainer);

	if(rightSideList.elements.length) {
		leftSideList.considerSavedList(rightSideList);
		rightSideList.renderListOnPage();
	}

	leftSideList.renderListOnPage();

	leftContainer.addEventListener('click', (e) => {
		if(e.target.dataset.button){
			let friendItem = e.target.closest('li');
			rightSideList.add(leftSideList.getFriendByVkId(friendItem.dataset.vkId));
			leftSideList.remove(friendItem.dataset.vkId);
		}
	});

	rightContainer.addEventListener('click', (e) => {
		if(e.target.dataset.button){
			let friendItem = e.target.closest('li');
			leftSideList.add(rightSideList.getFriendByVkId(friendItem.dataset.vkId));
			rightSideList.remove(friendItem.dataset.vkId);
		}
	});

	leftSearchField.addEventListener('keyup', leftSideList.showSuitableFriends.bind(leftSideList));
	rightSearchField.addEventListener('keyup', rightSideList.showSuitableFriends.bind(rightSideList));
	save.addEventListener('click', saveFriendsList.bind(rightSideList));
});
//----------------------------------------------------------------
