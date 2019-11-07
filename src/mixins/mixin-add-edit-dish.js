export default {
    methods: {
        submitForm() {
            this.$refs.modalDishName.$refs.name.validate()
            this.$refs.modalDishRestaurant.$refs.restaurant_id.validate()
            this.$refs.modalDishPerson.$refs.person.validate()
            if (!this.containToSubmit.length) {
                this.containError = true
            }
            else {
                if (!this.$refs.modalDishName.$refs.name.hasError 
                    && !this.$refs.modalDishRestaurant.$refs.restaurant_id.hasError
                    && !this.$refs.modalDishPerson.$refs.person.hasError) {
                        this.submitDish()
                }
            }
        },
        clearDish() {
        }
    },
    components: {
        'modal-buttons': require('components/Modals/Shared/ModalButtons.vue').default,
        'modal-dish-name': require('components/Modals/Shared/ModalDishName.vue').default,
        'modal-photo': require('components/Modals/Shared/ModalPhoto.vue').default,
        'modal-dish-restaurant': require('components/Modals/Shared/ModalDishRestaurant.vue').default,
        'modal-dish-food': require('components/Modals/Shared/ModalDishFood.vue').default,
        'modal-dish-recipe': require('components/Modals/Shared/ModalDishRecipe.vue').default,
        'modal-dish-person': require('components/Modals/Shared/ModalDishPerson.vue').default,
        'food-table': require('src/components/Tools/FoodTable.vue').default
    }
}