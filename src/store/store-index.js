import Vue from 'vue'
import { uid, LocalStorage } from 'quasar'
import { firebaseData, firebaseAuth } from 'src/boot/firebase'

const state = {
    dish_nutrient: [
        {
          name: 'name',
          required: true,
          label: '名稱',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'restaurant_id', align: 'left', label: '餐廳', field: 'restaurant_id' },
        { name: 'dish_photo', align: 'center', label: '照片', field: 'dish_photo' },
        
        { name: 'calories', label: '熱量 (kcal)', field: 'calories', sortable: true },
        { name: 'fat', label: '脂肪 (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: '糖類 (g)', field: 'carbs', sortable: true },
        { name: 'protein', label: '蛋白質 (g)', field: 'protein', sortable: true },
        { name: 'grains', label: '全穀根莖類 (份)', field: 'grains' },
        { name: 'fruits', label: '水果類 (份)', field: 'fruits' },
        { name: 'vegetables', label: '蔬菜類 (份)', field: 'vegetables' },
        { name: 'oils', label: '油脂與堅果種子類 (份)', field: 'oils' },
        { name: 'dairy', label: '乳品類 (份)', field: 'dairy' },
        { name: 'meat_and_beans', label: '蛋豆魚肉類 (份)', field: 'meat_and_beans' },
        { name: 'dietary_fiber', label: '膳食纖維 (g)', field: 'dietary_fiber', sortable: true },
        { name: 'total_sugar', label: '糖質總量 (g)', field: 'total_sugar', sortable: true },
        { name: 'sodium', label: '鈉 (mg)', field: 'sodium', sortable: true },
        { name: 'potassium', label: '鉀 (mg)', field: 'potassium', sortable: true },
        { name: 'calcium', label: '鈣 (mg)', field: 'calcium', sortable: true },
        { name: 'magnesium', label: '鎂 (mg)', field: 'magnesium', sortable: true },
        { name: 'iron', label: '鐵 (mg)', field: 'iron', sortable: true },
        { name: 'zinc', label: '鋅 (mg)', field: 'zinc', sortable: true },
        { name: 'phosphorus', label: '磷 (mg)', field: 'phosphorus', sortable: true },
        { name: 'vitaminA', label: '維生素Ａ (IU)', field: 'vitaminA', sortable: true },
        { name: 'vision_alcohol', label: '視網醇 (ug)', field: 'vision_alcohol', sortable: true },
        { name: 'vitaminE', label: 'a-維生素E (mg)', field: 'vitaminE', sortable: true },
        { name: 'vitaminB1', label: '維生素B1 (mg)', field: 'vitaminB1', sortable: true },
        { name: 'vitaminB2', label: '維生素B2 (mg)', field: 'vitaminB2', sortable: true },
        { name: 'vitaminB6', label: '維生素B6 (mg)', field: 'vitaminB6', sortable: true },
        { name: 'vitaminB12', label: '維生素B12 (mg)', field: 'vitaminB12', sortable: true },
        { name: 'vitaminC', label: '維生素C (mg)', field: 'vitaminC', sortable: true },
        { name: 'nicotin', label: '菸鹼素 (mg)', field: 'nicotin', sortable: true },
        { name: 'folic_acid', label: '葉酸 (ug)', field: 'folic_acid', sortable: true },
        { name: 'fatty_acidS', label: '脂肪酸S (mg)', field: 'fatty_acidS', sortable: true },
        { name: 'fatty_acidM', label: '脂肪酸M (mg)', field: 'fatty_acidM', sortable: true },
        { name: 'fatty_acidP', label: '脂肪酸P (mg)', field: 'fatty_acidP', sortable: true },
        { name: 'cholesterol', label: '膽固醇 (mg)', field: 'cholesterol', sortable: true },
    ],
    food_nutrient: [
        {
          name: 'name',
          required: true,
          label: '名稱',
          align: 'right',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'quantity', label: '份量 (g)', field: 'quantity', sortable: true },
        { name: 'calories', label: '熱量 (kcal)', field: 'calories', sortable: true },
        { name: 'fat', label: '脂肪 (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: '糖類 (g)', field: 'carbs', sortable: true },
        { name: 'protein', label: '蛋白質 (g)', field: 'protein', sortable: true },
        { name: 'grains', label: '全穀根莖類 (份)', field: 'grains' },
        { name: 'fruits', label: '水果類 (份)', field: 'fruits' },
        { name: 'vegetables', label: '蔬菜類 (份)', field: 'vegetables' },
        { name: 'oils', label: '油脂與堅果種子類 (份)', field: 'oils' },
        { name: 'dairy', label: '乳品類 (份)', field: 'dairy' },
        { name: 'meat_and_beans', label: '蛋豆魚肉類 (份)', field: 'meat_and_beans' },
        { name: 'dietary_fiber', label: '膳食纖維 (g)', field: 'dietary_fiber', sortable: true },
        { name: 'total_sugar', label: '糖質總量 (g)', field: 'total_sugar', sortable: true },
        { name: 'sodium', label: '鈉 (mg)', field: 'sodium', sortable: true },
        { name: 'potassium', label: '鉀 (mg)', field: 'potassium', sortable: true },
        { name: 'calcium', label: '鈣 (mg)', field: 'calcium', sortable: true },
        { name: 'magnesium', label: '鎂 (mg)', field: 'magnesium', sortable: true },
        { name: 'iron', label: '鐵 (mg)', field: 'iron', sortable: true },
        { name: 'zinc', label: '鋅 (mg)', field: 'zinc', sortable: true },
        { name: 'phosphorus', label: '磷 (mg)', field: 'phosphorus', sortable: true },
        { name: 'vitaminA', label: '維生素Ａ (IU)', field: 'vitaminA', sortable: true },
        { name: 'vision_alcohol', label: '視網醇 (ug)', field: 'vision_alcohol', sortable: true },
        { name: 'vitaminE', label: 'a-維生素E (mg)', field: 'vitaminE', sortable: true },
        { name: 'vitaminB1', label: '維生素B1 (mg)', field: 'vitaminB1', sortable: true },
        { name: 'vitaminB2', label: '維生素B2 (mg)', field: 'vitaminB2', sortable: true },
        { name: 'vitaminB6', label: '維生素B6 (mg)', field: 'vitaminB6', sortable: true },
        { name: 'vitaminB12', label: '維生素B12 (mg)', field: 'vitaminB12', sortable: true },
        { name: 'vitaminC', label: '維生素C (mg)', field: 'vitaminC', sortable: true },
        { name: 'nicotin', label: '菸鹼素 (mg)', field: 'nicotin', sortable: true },
        { name: 'folic_acid', label: '葉酸 (ug)', field: 'folic_acid', sortable: true },
        { name: 'fatty_acidS', label: '脂肪酸S (mg)', field: 'fatty_acidS', sortable: true },
        { name: 'fatty_acidM', label: '脂肪酸M (mg)', field: 'fatty_acidM', sortable: true },
        { name: 'fatty_acidP', label: '脂肪酸P (mg)', field: 'fatty_acidP', sortable: true },
        { name: 'cholesterol', label: '膽固醇 (mg)', field: 'cholesterol', sortable: true },
    ],

    dish: [
        {
            id: '2',
            name: '水煮蛋',
            restaurant_id: '第一餐廳',
            dish_photo: 'https://i.imgur.com/s1YrjzKr.jpg',
            calories: 200,
            fat: 200,
            protein: 200,
            carbs: 200,
            grains: 200,
            fruits: 200,
            vegetables: 200,
            oils: 200,
            dairy: 200,
            meat_and_beans: 200,
            dietary_fiber: 200,
            total_sugar: 200,
            sodium: 200,
            potassium: 200,
            calcium: 200,
            magnesium: 200,
            iron: 200,
            zinc: 200,
            phosphorus: 200,
            vitaminA: 200,
            vision_alcohol: 200,
            vitaminE: 200,
            vitaminB1: 200,
            vitaminB2: 200,
            vitaminB6: 200,
            vitaminB12: 200,
            vitaminC: 200,
            nicotin: 200,
            folic_acid: 200,
            fatty_acidS: 200,
            fatty_acidM: 200,
            fatty_acidP: 200,
            cholesterol: 200,
        },
        {
            id: '1',
            name: '水餃',
            restaurant_id: '飯店',
            dish_photo: 'https://i.imgur.com/GzaDoDhb.jpg',
            calories: 125,
            fat: 125,
            protein: 125,
            carbs: 125,
            grains: 125,
            fruits: 125,
            vegetables: 125,
            oils: 125,
            dairy: 125,
            meat_and_beans: 125,
            dietary_fiber: 125,
            total_sugar: 125,
            sodium: 125,
            potassium: 125,
            calcium: 125,
            magnesium: 125,
            iron: 125,
            zinc: 125,
            phosphorus: 125,
            vitaminA: 125,
            vision_alcohol: 125,
            vitaminE: 125,
            vitaminB1: 125,
            vitaminB2: 125,
            vitaminB6: 125,
            vitaminB12: 125,
            vitaminC: 125,
            nicotin: 125,
            folic_acid: 125,
            fatty_acidS: 125,
            fatty_acidM: 125,
            fatty_acidP: 125,
            cholesterol: 125,
        },
        {
            id: '3',
            name: '千層糕',
            restaurant_id: '第一餐廳',
            dish_photo: '',
            calories: 300,
            fat: 300,
            protein: 300,
            carbs: 300,
            grains: 300,
            fruits: 300,
            vegetables: 300,
            oils: 300,
            dairy: 300,
            meat_and_beans: 300,
            dietary_fiber: 300,
            total_sugar: 300,
            sodium: 300,
            potassium: 300,
            calcium: 300,
            magnesium: 300,
            iron: 300,
            zinc: 300,
            phosphorus: 300,
            vitaminA: 300,
            vision_alcohol: 300,
            vitaminE: 300,
            vitaminB1: 300,
            vitaminB2: 300,
            vitaminB6: 300,
            vitaminB12: 300,
            vitaminC: 300,
            nicotin: 300,
            folic_acid: 300,
            fatty_acidS: 300,
            fatty_acidM: 300,
            fatty_acidP: 300,
            cholesterol: 300,
        },
    ],  //水餃、水煮蛋、千層糕

    food: [
        {
            id: '1',
            name: '豬肉',
            quantity: 5,
            calories: 5,
            fat: 5,
            protein: 5,
            carbs: 5,
            grains: 5,
            fruits: 5,
            vegetables: 5,
            oils: 5,
            dairy: 5,
            meat_and_beans: 5,
            dietary_fiber: 5,
            total_sugar: 5,
            sodium: 5,
            potassium: 5,
            calcium: 5,
            magnesium: 5,
            iron: 5,
            zinc: 5,
            phosphorus: 5,
            vitaminA: 5,
            vision_alcohol: 5,
            vitaminE: 5,
            vitaminB1: 5,
            vitaminB2: 5,
            vitaminB6: 5,
            vitaminB12: 5,
            vitaminC: 5,
            nicotin: 5,
            folic_acid: 5,
            fatty_acidS: 5,
            fatty_acidM: 5,
            fatty_acidP: 5,
            cholesterol: 5,
        },
        {
            id: '2',
            name: '豬腳',
            quantity: 5,
            calories: 5,
            fat: 5,
            protein: 5,
            carbs: 5,
            grains: 5,
            fruits: 5,
            vegetables: 5,
            oils: 5,
            dairy: 5,
            meat_and_beans: 5,
            dietary_fiber: 5,
            total_sugar: 5,
            sodium: 5,
            potassium: 5,
            calcium: 5,
            magnesium: 5,
            iron: 5,
            zinc: 5,
            phosphorus: 5,
            vitaminA: 5,
            vision_alcohol: 5,
            vitaminE: 5,
            vitaminB1: 5,
            vitaminB2: 5,
            vitaminB6: 5,
            vitaminB12: 5,
            vitaminC: 5,
            nicotin: 5,
            folic_acid: 5,
            fatty_acidS: 5,
            fatty_acidM: 5,
            fatty_acidP: 5,
            cholesterol: 5,
        },
        {
            id: '3',
            name: '蛋',
            quantity: 10,
            calories: 10,
            fat: 10,
            protein: 10,
            carbs: 10,
            grains: 10,
            fruits: 10,
            vegetables: 10,
            oils: 10,
            dairy: 10,
            meat_and_beans: 10,
            dietary_fiber: 10,
            total_sugar: 10,
            sodium: 10,
            potassium: 10,
            calcium: 10,
            magnesium: 10,
            iron: 10,
            zinc: 10,
            phosphorus: 10,
            vitaminA: 10,
            vision_alcohol: 10,
            vitaminE: 10,
            vitaminB1: 10,
            vitaminB2: 10,
            vitaminB6: 10,
            vitaminB12: 10,
            vitaminC: 10,
            nicotin: 10,
            folic_acid: 10,
            fatty_acidS: 10,
            fatty_acidM: 10,
            fatty_acidP: 10,
            cholesterol: 10,
        },
    ],  //豬肉、高麗菜、蛋
    restaurant: [
        '第一餐廳',
        '飯店'
    ],
    contain: [
        {
            dish: '1',
            food: '1',
            quantity: 10
        },
        {
            dish: '1',
            food: '2',
            quantity: 15
        },
        {
            dish: '2',
            food: '3',
            quantity: 20
        }
    ],
    recipe: [
        {
            id: '1',
            dish: '1',
            photo: 'https://uploads-blog-icook.icook.network/2016/12/2016year-hot-recipe-200ppi-640x800.png',
            text: '1.高麗菜切碎(小丁)、韭黃或蔥皆切末；薑蘑成泥。高麗菜、韭黃、蔥分開加鹽，以保鮮膜密封，放置1小時出水。出水後以清水將鹽分沖掉、儘可能瀝乾水份。2.將豬絞肉(要用時再從冰箱取出)、蔥花、韭黃、薑、水放入盆中攪拌均勻。再加入高麗菜拌勻。加入醬油、白胡椒粉後拌至略有黏性，即可開始包水餃。',
        },
        {
            id: '2',
            dish: '2',
            photo: '',
            text: '1.放入滾水，直到浮起。'
        }
    ],
    editor: [
        {
            dish:'',
            user:'',
            time:''
        }
    ],
    search: '', //開發預設
    searchType: '',
    select: ''
}

const mutations = {
    setSearch(state, value) {
        state.search = value
    },
    clearSearch(state) {
        state.search = ''
    },
    setSelect(state, value) {
        state.select = value
    },
    setSearchType(state, value) {
        state.searchType = value
    },

    addDish(state, payload) {
        state.dish.push(payload)
    },
    addRestaurant(state, restaurant) {
        state.restaurant.push(restaurant)
    },
    addContain(state, contain) {
        for (let i = 0; i < contain.length; i++) {
            state.contain.push(contain[i])
        }
    },
    addRecipe(state, payload) {
        state.recipe.push(payload)
    },
    addDishPhoto(state, url) {
        state.dish[state.dish.length-1].dish_photo = url
    },
    addRecipePhoto(state, url) {
        state.recipe[state.recipe.length-1].photo = url
    }
}

const actions = {
    setSearch({commit}, value) {
        commit('setSearch', value)
    },
    clearSearch({commit}) {
        commit('clearSearch')
    },
    setSelect({commit}, value) {
        commit('setSelect', value)
    }, 
    setSearchType({commit}, value) {
        commit('setSearchType', value)
    },

    addDish({commit}, dish) {
        let dishId = uid()
        let payload = dish
        payload.id = dishId
        commit('addDish', payload)
    },
    addRestaurant({commit}, restaurant) {
        commit('addRestaurant', restaurant)
    },
    addContain({commit}, contain) {
        commit('addContain', contain)
    },
    addRecipe({commit}, recipe) {
        let id = uid()
        let payload = recipe
        payload.id = id
        commit('addRecipe', payload)
    },
    addDownloadURL({commit}, photo) {
        if (photo.type == 'dishs') {
            commit('addDishPhoto', photo.url)
        }
        else if (photo.type == 'recipes') {
            commit('addRecipePhoto', photo.url)
        }
    }
}

const getters = {
    /// 料理
    dishFiltered: (state, getters) => {
        let dishFiltered = []
        let i = 0
        for (i; i < state.dish.length; i++) {
            if (state.dish[i].name.includes(state.search)) {
                dishFiltered.push(state.dish[i])   
            }
        }
        return dishFiltered
    },
    dish: (state, getters) => {
        let dish = []
        dish = getters.dishFiltered
        return dish
    },

    /// 食材
    foodMakeDish: (state, getters) => {
        let contain = state.contain,
            foodMakeDish = [],
            totalNutrient = { 
                name: '總和', 
                quantity: 0,
                calories: 0,
                fat: 0,
                protein: 0,
                carbs: 0,
                grains: 0,
                fruits: 0,
                vegetables: 0,
                oils: 0,
                dairy: 0,
                meat_and_beans: 0,
                dietary_fiber: 0,
                total_sugar: 0,
                sodium: 0,
                potassium: 0,
                calcium: 0,
                magnesium: 0,
                iron: 0,
                zinc: 0,
                phosphorus: 0,
                vitaminA: 0,
                vision_alcohol: 0,
                vitaminE: 0,
                vitaminB1: 0,
                vitaminB2: 0,
                vitaminB6: 0,
                vitaminB12: 0,
                vitaminC: 0,
                nicotin: 0,
                folic_acid: 0,
                fatty_acidS: 0,
                fatty_acidM: 0,
                fatty_acidP: 0,
                cholesterol: 0,
            },
            i = 0,
            j

        for (i; i < contain.length; i++) {
            if (contain[i].dish == state.select) {
                for (j = 0; j < state.food.length; j++) {
                    if (state.food[j].id == contain[i].food) {
                        let temp = { id:'' } // 暫存組成料理的食材份量
                        Object.keys(state.food[j]).forEach(key => {
                            if (key == 'id' || key == 'name') {
                                temp[key] = state.food[j][key] 
                            }
                            else {
                                temp[key] = state.food[j][key]*contain[i].quantity
                            }
                        })
                        
                        foodMakeDish.push(temp)
                        j = state.food.length  
                    }
                }
            }
        }
        for (i = 0; i < foodMakeDish.length; i++) {
            totalNutrient.quantity += foodMakeDish[i].quantity
            totalNutrient.calories += foodMakeDish[i].calories
            totalNutrient.fat += foodMakeDish[i].fat
            totalNutrient.protein += foodMakeDish[i].protein
            totalNutrient.carbs += foodMakeDish[i].carbs
            totalNutrient.grains += foodMakeDish[i].grains
            totalNutrient.fruits += foodMakeDish[i].fruits
            totalNutrient.vegetables += foodMakeDish[i].vegetables
            totalNutrient.oils += foodMakeDish[i].oils
            totalNutrient.dairy += foodMakeDish[i].dairy
            totalNutrient.meat_and_beans += foodMakeDish[i].meat_and_beans
            totalNutrient.dietary_fiber += foodMakeDish[i].dietary_fiber
            totalNutrient.total_sugar += foodMakeDish[i].total_sugar
            totalNutrient.sodium += foodMakeDish[i].sodium
            totalNutrient.potassium += foodMakeDish[i].potassium
            totalNutrient.calcium += foodMakeDish[i].calcium
            totalNutrient.magnesium += foodMakeDish[i].magnesium
            totalNutrient.iron += foodMakeDish[i].iron
            totalNutrient.zinc += foodMakeDish[i].zinc
            totalNutrient.phosphorus += foodMakeDish[i].phosphorus
            totalNutrient.vitaminA += foodMakeDish[i].vitaminA
            totalNutrient.vision_alcohol += foodMakeDish[i].vision_alcohol
            totalNutrient.vitaminE += foodMakeDish[i].vitaminE
            totalNutrient.vitaminB1 += foodMakeDish[i].vitaminB1
            totalNutrient.vitaminB2 += foodMakeDish[i].vitaminB2
            totalNutrient.vitaminB6 += foodMakeDish[i].vitaminB6
            totalNutrient.vitaminB12 += foodMakeDish[i].vitaminB12
            totalNutrient.vitaminC += foodMakeDish[i].vitaminC
            totalNutrient.nicotin += foodMakeDish[i].nicotin
            totalNutrient.folic_acid += foodMakeDish[i].folic_acid
            totalNutrient.fatty_acidS += foodMakeDish[i].fatty_acidS
            totalNutrient.fatty_acidM += foodMakeDish[i].fatty_acidM
            totalNutrient.fatty_acidP += foodMakeDish[i].fatty_acidP
            totalNutrient.cholesterol += foodMakeDish[i].cholesterol
        }
        foodMakeDish.push(totalNutrient)
        return foodMakeDish
    },
    foodFiltered: (state, getters) => {
        let foodFiltered = []
        let i = 0
        for (i; i < state.food.length; i++) {
            if (state.food[i].name.includes(state.search)) {
                foodFiltered.push(state.food[i])   
            }
        }
        return foodFiltered
    },
    food: (state, getters) => {
        if (state.select) {
            return getters.foodMakeDish
        }
        else {
            return getters.foodFiltered
        }
    },

    /// 食譜
    recipeMakeDish: (state, getters) => {
        let recipeMakeDish = []
        let i = 0
        for (i; i < state.recipe.length; i++) {
            if (state.select == state.recipe[i].dish) {
                recipeMakeDish.push(state.recipe[i])   
            }
        }
        return recipeMakeDish
    },
    recipe: (state, getters) => {
        if (state.select) {
            return getters.recipeMakeDish
        }
        return ''
    }
}

export default {
    namespaced: true, 
    state,
    mutations,
    actions,
    getters,
}