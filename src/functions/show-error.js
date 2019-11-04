import { Dialog,Loading } from 'quasar'

export function showError(error) {
    Loading.hide()
    
    Dialog.create({ 
        title: 'Error!!!',
        message: error
     })
}
