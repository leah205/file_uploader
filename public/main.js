const openUploadBtn = document.querySelector('.open-file-upload')
const fileForm = document.querySelector('.file-form')
const closeFileFormBtn = document.querySelector('.close-file-form')
const modals = document.querySelectorAll('.modal')
const fileModal = document.querySelector('.file-modal')
openUploadBtn.addEventListener('click', ()=> {
    fileModal.style.display = 'flex'
})

closeFileFormBtn.addEventListener('click', () => {
    fileModal.style.display='none'
})

modals.forEach((modal) => {
     window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
})

 