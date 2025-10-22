const openUploadBtn = document.querySelector('.open-file-upload')
const fileForm = document.querySelector('.file-form')
const closeModalBtns = document.querySelectorAll('.close-form')
const modals = document.querySelectorAll('.modal')
const fileModal = document.querySelector('.file-modal')
const newFolderBtn = document.querySelector('.open-new-folder')
const newFolderModal = document.querySelector('.new-folder-modal')
const editFolderBtns = document.querySelectorAll('.edit-btn')
const deleteModalBtns = document.querySelectorAll('.delete-modal-btn')

const deleteModal = document.querySelector('.delete-modal')
const editModal = document.querySelector('.edit-modal')

deleteModalBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        deleteModal.style.display = 'flex'
        const idInput = deleteModal.querySelector('.id-input')
        idInput.value = btn.id
})
})

editFolderBtns.forEach((btn) => {
     btn.addEventListener('click', () => {
    editModal.style.display = 'flex'
    const idInput = editModal.querySelector('.id-input')
    idInput.value = btn.id
})
})
   


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


 