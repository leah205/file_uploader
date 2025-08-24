const openUploadBtn = document.querySelector('.open-file-upload')
const fileForm = document.querySelector('.file-form')
const closeModalBtns = document.querySelectorAll('.close-form')
const modals = document.querySelectorAll('.modal')
const fileModal = document.querySelector('.file-modal')
const newFolderBtn = document.querySelector('.open-new-folder')
const newFolderModal = document.querySelector('.new-folder-modal')
const editFolderBtn = document.querySelector('.edit-btn')

const editModal = document.querySelector('.edit-modal')

if(editFolderBtn){
    editFolderBtn.addEventListener('click', () => {
    editModal.style.display = 'flex'
    const idInput = document.querySelector('.id-input')
    idInput.value = editFolderBtn.id
})
}

openUploadBtn.addEventListener('click', ()=> {
    fileModal.style.display = 'flex'
})
newFolderBtn.addEventListener('click', ()=> {
    console.log('hello')
    newFolderModal.style.display = 'flex'
})

closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal')
        modal.style.display = 'none'
    })
})


   
    window.onclick = (event) => {
       modals.forEach((modal) => {
             if (event.target === modal) {
         console.log(modal.classList)
        modal.style.display = "none";
      }
       })
     
    };


 