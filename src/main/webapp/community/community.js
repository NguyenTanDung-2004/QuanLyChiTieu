//LOAD CALENDAR & FORUM
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`; 
}

function convertDateToMMDDYYYY(date) {
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
}

let dateInput = document.getElementById('date');
dateInput.addEventListener('change', function() {
    let date = dateInput.value;
    
	if (dateInput.value !== getCurrentDate()) {
		document.querySelector(".createParent").style.display = "none";
		document.querySelector(".main").style.height = '100%';
		document.querySelector(".mainScroll").style.height = '80%';
	} else {
		document.querySelector(".createParent").style.display = "flex";
		document.querySelector(".main").style.height = '90%';
		document.querySelector(".mainScroll").style.height = '90%';
	}
	
	
    generateForumContent(date)
});

  window.onload = function() {
	var urlParams = new URLSearchParams(window.location.search);
    var autoClick = urlParams.get('autoClickDate');

    if (autoClick === 'true') {
      dateInput.value = urlParams.get('date');
              dateInput.max = getCurrentDate()
        generateForumContent(dateInput.value);
    } else {
		dateInput.value = getCurrentDate()
        dateInput.max = getCurrentDate()
        generateForumContent(dateInput.value);
	}
  };

function autoClickDate(date) {
	location.reload();
	dateInput.value = date;
}

function get_list_post(date) {
    return new Promise((resolve, reject) => {
		const formattedDate = convertDateToMMDDYYYY(date);
        var http = new XMLHttpRequest();
        http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_community", true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");


        const params = "date=" + formattedDate + "&action=show";
        http.send(params);

        http.onload = function() {
            try {
                const resp = JSON.parse(http.responseText);
                resolve(resp);
            } catch (error) {
                reject(error);
            }
        };

        http.onerror = function() {
            reject(new Error("Network error"));
        };
    });
}
function get_list_comment(post_id) {
    return new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_community", true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

		
        const params = "postID=" + post_id + "&action=get_detail_comment";
        http.send(params);

        http.onload = function() {
            try {
                const resp = JSON.parse(http.responseText);
                resolve(resp);
            } catch (error) {
                reject(error);
            }
        };

        http.onerror = function() {
            reject(new Error("Network error"));
        };
    });
}
// Hàm để cập nhật giao diện của trang web với dữ liệu mới từ detail_post
function generateForumContent(date) {
	get_list_post(date)
	        .then(itemList => {
			    var forumContentDiv = document.getElementById('forumContent');
			    forumContentDiv.innerHTML = ''; // Xóa nội dung HTML hiện tại
	
	            console.log(itemList);
	
	            itemList.forEach(itemData => {
	                const [postId, content, userId, day, numberOfLike, username, image, time, liked] = itemData;
	
			        var contentForum1Div = document.createElement('div');
			        contentForum1Div.classList.add('contentForum1');
			
			        var parentDiv = document.createElement('div');
			        parentDiv.classList.add('parent');
			
			        // Tạo phần tử infoUserDiv
			        var infoUserDiv = document.createElement('div');
			        infoUserDiv.classList.add('infoUser');
			
			        var img = document.createElement('img');
			        img.classList.add('avaUser');
			        
					var img = document.createElement('img');
					img.classList.add('avaUser');
					if (image !== "") {
					  img.src = image;
					} else {
					  img.src = '../QuanLyChiTieu/img/default_avatar.png';
					}
			        infoUserDiv.appendChild(img);
			
			        var nameUserP = document.createElement('p');
			        nameUserP.classList.add('nameUser');
			        nameUserP.textContent = username;
			        infoUserDiv.appendChild(nameUserP);
			
			        // Tạo phần tử contentDiv
			        var contentDiv = document.createElement('div');
			        contentDiv.classList.add('content');
			
			        var contentP = document.createElement('p');
			        contentP.textContent = content;
			        contentDiv.appendChild(contentP);
			
			        // Tạo phần tử otherDiv
			        var otherDiv = document.createElement('div');
			        otherDiv.classList.add('other');
			
			        var other1Div = document.createElement('div');
			        other1Div.classList.add('other1');
			
			        var certainTimeP = document.createElement('p');
			        certainTimeP.classList.add('certainTime');
			        certainTimeP.textContent = time;
			        other1Div.appendChild(certainTimeP);
			
			        var lineTimeP = document.createElement('p');
			        lineTimeP.classList.add('lineTime');
			        lineTimeP.textContent = '-';
			        other1Div.appendChild(lineTimeP);
			
					var heartImg = document.createElement('img');
							
					var isHeartClicked = false; // Biến lưu trạng thái của ảnh heart
					
					if (liked == 1) {
					    heartImg.src = '../QuanLyChiTieu/img/heartForum.png';
					    isHeartClicked = true;
					} else {
						heartImg.src = '../QuanLyChiTieu/img/heart_white.png';
						answerButtonisHeartClicked = false;
					}

					
					var realLike = numberOfLike;
					var likesP = document.createElement('p');
					likesP.classList.add('likes');
					likesP.textContent = realLike + ' likes';
					other1Div.appendChild(likesP);
					
					var params = "";
					
					heartImg.addEventListener('click', function() {
					  if (isHeartClicked) {
					    heartImg.src = '../QuanLyChiTieu/img/heart_white.png';
					    realLike--; 
					    likesP.textContent = realLike + ' likes'; 
					    
					    params ="postID=" + postId + "&numberOfLike=" + realLike + "&like=0&action=like_post"; 
					  } else {
					    heartImg.src = '../QuanLyChiTieu/img/heartForum.png';
					    realLike++; 
					    likesP.textContent = realLike + ' likes'; 					    
					    params ="postID=" + postId + "&numberOfLike=" + realLike + "&like=1&action=like_post"; 
					  }
					  
					  isHeartClicked = !isHeartClicked; // Đảo ngược trạng thái của ảnh heart
					  
						var http = new XMLHttpRequest();
							http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_community", true);
							http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
							
							http.send(params);
							http.onload = function() {
								var resp = JSON.parse(http.responseText);
								if (resp == "successfully"){
									
								} 
					    };		
				    
					});
					
					other1Div.appendChild(heartImg);
					
			        otherDiv.appendChild(other1Div);
			        
					var answerButton = document.createElement('button');
			        answerButton.classList.add('Answer');
			        answerButton.id = 'answer_' + postId + '_' + username + '_' +  userId;
			        answerButton.textContent = 'Answer';
			        
			        answerButton.addEventListener('click', function() {
						
						  // Tìm input contentAnswer tương ứng với nút answer được nhấn
						  const contentAnswerInputs = document.querySelectorAll(".contentAnswer");
						  for (const contentAnswerInput of contentAnswerInputs) {
								if (contentAnswerInput.classList.contains(postId)) {
									     contentAnswerInput.id = userId;
						   				 contentAnswerInput.value = '@' + username + ' ';
						   				 contentAnswerInput.focus();
						        }
						  }

					});
			        
			        otherDiv.appendChild(answerButton);
			
			        parentDiv.appendChild(infoUserDiv);
			        parentDiv.appendChild(contentDiv);
			        parentDiv.appendChild(otherDiv);
			
			        contentForum1Div.appendChild(parentDiv)

					get_list_comment(postId)
					        .then(commentList => {
					            commentList.forEach(commentData => {
					                const [commentId, commentPostId, commentContent, commentDate, commentUserId, commentParentId, commentName, commentImg, commentTime] = commentData;
					
					               var childDiv = document.createElement('div');
					                childDiv.classList.add('child');
					
					                var child1Div = document.createElement('div');
					                child1Div.classList.add('child1');
					
					                // Tạo phần tử infoUserDiv
					                var infoUserChildDiv = document.createElement('div');
					                infoUserChildDiv.classList.add('infoUser');
					
					                var imgChild = document.createElement('img');
					                imgChild.classList.add('avaUser');
							        imgChild.classList.add('avaUser');
							        if (commentImg !== "") {
										imgChild.src = commentImg;
									} else {
										imgChild.src = '../QuanLyChiTieu/img/default_avatar.png';
									}
					                infoUserChildDiv.appendChild(imgChild);
					
					                var nameUserChildP = document.createElement('p');
					                nameUserChildP.classList.add('nameUser');
					                nameUserChildP.textContent = commentName;
					                infoUserChildDiv.appendChild(nameUserChildP);
					
					                // Tạo phần tử contentDiv
					                var contentChildDiv = document.createElement('div');
					                contentChildDiv.classList.add('content');
					
					                var contentChildP = document.createElement('p');
					                contentChildP.textContent = commentContent;
					                contentChildDiv.appendChild(contentChildP);
					
					                // Tạo phần tử otherDiv
					                var otherChildDiv = document.createElement('div');
					                otherChildDiv.classList.add('other');
					
					                var other1ChildDiv = document.createElement('div');
					                other1ChildDiv.classList.add('other1');
					
					                var certainTimeChildP = document.createElement('p');
					                certainTimeChildP.classList.add('certainTime');
					                certainTimeChildP.textContent = commentTime;
					                other1ChildDiv.appendChild(certainTimeChildP);
					
					                otherChildDiv.appendChild(other1ChildDiv);
					
					                var answerButtonChild = document.createElement('button');
					                answerButtonChild.classList.add('Answer');
					                answerButtonChild.id = 'answer_' + postId + '_' + commentName + '_' + commentUserId;
					                answerButtonChild.textContent = 'Answer';
					                answerButtonChild.addEventListener('click', function() {
									
									  // Tìm input contentAnswer tương ứng với nút answer được nhấn
									  const contentAnswerInputs = document.querySelectorAll(".contentAnswer");
									  for (const contentAnswerInput of contentAnswerInputs) {
											if (contentAnswerInput.classList.contains(postId)) {
													 contentAnswerInput.id = commentUserId;
									   				 contentAnswerInput.value = '@' + commentName + ' ';
									   				 contentAnswerInput.focus();
									        }
									  }
									})
					                otherChildDiv.appendChild(answerButtonChild);
					
					                child1Div.appendChild(infoUserChildDiv);
					                child1Div.appendChild(contentChildDiv);
					                child1Div.appendChild(otherChildDiv);

					
					                childDiv.appendChild(child1Div);
					                contentForum1Div.appendChild(childDiv);
					            });
					                var childUserDiv = document.createElement('div');
					                childUserDiv.classList.add('childUser');
					
					                var answerDiv = document.createElement('div');
					                answerDiv.classList.add('answer');
					
					                var inputAnswer = document.createElement('input');
					                inputAnswer.classList.add('contentAnswer');
					                inputAnswer.classList.add(postId);
					                inputAnswer.setAttribute('type', 'text');
					                inputAnswer.setAttribute('placeholder', 'Write your comment....');
					                
					                answerDiv.appendChild(inputAnswer);
					
					                var iconComment = document.createElement('i');
					                iconComment.classList.add('send_comment');
					                iconComment.classList.add('fa-regular');
					                iconComment.classList.add('fa-paper-plane');
					                
					                iconComment.addEventListener('click', function () {
										  
										  // Lấy content
										  const contentAnswer = this.closest('.answer').querySelector('.contentAnswer').value;
										
										  // Lấy date và time
										  const currentDate = new Date();
										  const date = currentDate.toLocaleDateString();
										  const time = currentDate.toLocaleTimeString();
										
										  // Lấy parentUserId
										  const parentUserIdElement = this.closest('.answer').querySelector('.contentAnswer');
										  const parentUserId = parentUserIdElement.id ? parentUserIdElement.id : 0;
										
											var http = new XMLHttpRequest();
											http.open("POST", "http://localhost:8080/QuanLyChiTieu/servlet_handle_request_from_community", true);
											http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
											var params ="postID=" +postId + "&content=" + contentAnswer + "&date=" + date + "&time=" + time + "&user_parentID=" + parentUserId + "&action=insert_comment"; 

											http.send(params);
											http.onload = function() {
												var resp = JSON.parse(http.responseText);
												if (resp == "successfully"){
													alert("Update comment successfully")
													window.location = "http://localhost:8080/QuanLyChiTieu/community?autoClickDate=true&date=" + dateInput.value;
												} 
											};
											
									})
					                answerDiv.appendChild(iconComment);
					
					                childUserDiv.appendChild(answerDiv);

									contentForum1Div.appendChild(childUserDiv)
					            
					        })
					        .catch(error => {
					            console.error(error);
					        });
										

			        forumContentDiv.appendChild(contentForum1Div);
	            });
	            
	             
	        })
	        .catch(error => {
	            console.error(error);
	        });
}




