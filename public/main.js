const openUploadBtn = document.querySelector('.open-file-upload')
const fileForm = document.querySelector('.file-form')
const closeFileFormBtn = document.querySelector('.close-file-form')
openUploadBtn.addEventListener('click', ()=> {
    if(fileForm.classList.contains('hidden')){
        fileForm.classList.remove('hidden')
    }
})

closeFileFormBtn.addEventListener('click', () => {
    fileForm.classList.add('hidden')
})