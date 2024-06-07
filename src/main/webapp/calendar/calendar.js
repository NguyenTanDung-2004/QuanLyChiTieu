
// chọn avatar
const avatarImg = document.querySelector('.modal .avatar-img');

avatarImg.addEventListener('click', function() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.addEventListener('change', function() {
    const file = input.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.addEventListener('load', function() {
        const imageDataUrl = reader.result;
        const img = document.querySelector('.avatar-img img');
        const img1 = document.querySelector('.avatar img');
        img.src = imageDataUrl;
        img1.src = imageDataUrl;
      });

      reader.readAsDataURL(file);
    }
  });

  input.click();
});add_expense

// => show-all
var add_expense = document.querySelector("#add-expense");
add_expense.addEventListener("click", () => 
	{
		window.location = "http://localhost:8080/QuanLyChiTieu/show_all";
	}
)



