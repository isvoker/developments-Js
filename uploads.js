(function () {
	let fileArray = [];
	let mainImg = "";
	const buttonUpload = document.querySelector(".applicationSummary-details__image_button_upload");
	const input = document.querySelector(".img-upload-default");
	buttonUpload.onclick = (e) => {
		e.preventDefault();
		input.click();
	};
	input.addEventListener("change", (e) => {
		workingWithFiles(input.files);
		document.querySelector(".applicationSummary-details__image_button_save").classList.remove("hide");
	});
	let number = 0;
	function workingWithFiles(files) {
		for (let i = 0, file; (file = files[i]); i++) {
			let reader = new FileReader();
			fileArray.push(files[i]);
			reader.onload = (function (theFile) {
				return function (e) {
					uploadPreview();
					function uploadPreview() {
						const span = document.createElement("span");
						const close = document.createElement("button");
						const div = document.createElement("div");
						const radio = document.createElement("input");
						const label = document.createElement("label");
						span.setAttribute("class", "applicationSummary-details__image_output_span");
						close.setAttribute("class", "removeUploadImg");
						close.setAttribute("data-removeUploadImg", number);
						number++;
						div.setAttribute("class", "selectMainImg");
						close.innerHTML = `<img src="./icons/close.png" alt="close">`;
						label.innerHTML = `<span> Сделать главной</span> `;
						label.setAttribute("class", "custom-radio");
						span.innerHTML = ['<img class="imgPreview" title="',escape(theFile.name),'" src="',e.target.result,'" />',].join("");
						radio.value = theFile.name;
						radio.type = "radio";
						radio.name = "select";
						label.prepend(radio);
						span.append(close);
						div.append(label);
						span.append(div);
						document.getElementById("output").insertBefore(span, null);
						deleteFile(close);
						selectMain(radio);
					}					
				};
			})(file);
			reader.readAsDataURL(file);
		}
		function deleteFile(close) {
            close.addEventListener("click", function (e) {
                let numberRemove = 0;
                let removeUploadImg = close.dataset.removeuploadimg;
                this.parentElement.remove();
                fileArray.splice(removeUploadImg, 1);
                document.querySelectorAll(".removeUploadImg").forEach((element) => {
                        element.setAttribute("data-removeUploadImg",numberRemove);
                        numberRemove++;
                });
                number--;
            });
        }
        function selectMain(radio) {
            radio.addEventListener("click", function (e) {
                mainImg = radio.value;
            });
        }
	}
})();
