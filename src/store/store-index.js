import Vue from 'vue'
import { uid, Notify } from 'quasar'
import firebase from 'firebase/app';
import 'firebase/firestore';

const state = {
    dish_nutrient: [
        {
          name: 'name',
          required: true,
          label: '名稱',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'restaurant_id', align: 'left', label: '餐廳', field: 'restaurant_id' },
        { name: 'dish_photo', align: 'center', label: '照片', field: 'dish_photo' },
        
        { name: 'grains', label: '全穀根莖類 (份)', field: 'grains' },
        { name: 'meat_and_beans', label: '蛋豆魚肉類 (份)', field: 'meat_and_beans' },
        { name: 'vegetables', label: '蔬菜類 (份)', field: 'vegetables' },
        { name: 'fruits', label: '水果類 (份)', field: 'fruits' },
        { name: 'dairy', label: '乳品類 (份)', field: 'dairy' },
        { name: 'oils', label: '油脂與堅果種子類 (份)', field: 'oils' },
        { name: 'calories', label: '熱量 (kcal)', field: 'calories', sortable: true },
        { name: 'protein', label: '蛋白質 (g)', field: 'protein', sortable: true },
        { name: 'fat', label: '脂肪 (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: '糖類 (g)', field: 'carbs', sortable: true },
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
        { name: 'nicotin', label: '菸鹼素 (mg)', field: 'nicotin', sortable: true },
        { name: 'vitaminB6', label: '維生素B6 (mg)', field: 'vitaminB6', sortable: true },
        { name: 'vitaminB12', label: '維生素B12 (mg)', field: 'vitaminB12', sortable: true },
        { name: 'folic_acid', label: '葉酸 (ug)', field: 'folic_acid', sortable: true },
        { name: 'vitaminC', label: '維生素C (mg)', field: 'vitaminC', sortable: true },
        { name: 'fatty_acidS', label: '脂肪酸S (mg)', field: 'fatty_acidS', sortable: true },
        { name: 'fatty_acidM', label: '脂肪酸M (mg)', field: 'fatty_acidM', sortable: true },
        { name: 'fatty_acidP', label: '脂肪酸P (mg)', field: 'fatty_acidP', sortable: true },
        { name: 'cholesterol', label: '膽固醇 (mg)', field: 'cholesterol', sortable: true },
    ],
    food_nutrient: [
        {
          name: 'name',
          required: true,
          label: '名稱(100g serving)',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'quantity', label: '份量 (g)', field: 'quantity', sortable: true },
        { name: 'grains', label: '全穀根莖類 (份)', field: 'grains' },
        { name: 'meat_and_beans', label: '蛋豆魚肉類 (份)', field: 'meat_and_beans' },
        { name: 'vegetables', label: '蔬菜類 (份)', field: 'vegetables' },
        { name: 'fruits', label: '水果類 (份)', field: 'fruits' },
        { name: 'dairy', label: '乳品類 (份)', field: 'dairy' },
        { name: 'oils', label: '油脂與堅果種子類 (份)', field: 'oils' },
        { name: 'calories', label: '熱量 (kcal)', field: 'calories', sortable: true },
        { name: 'protein', label: '蛋白質 (g)', field: 'protein', sortable: true },
        { name: 'fat', label: '脂肪 (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: '糖類 (g)', field: 'carbs', sortable: true },
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
        { name: 'nicotin', label: '菸鹼素 (mg)', field: 'nicotin', sortable: true },
        { name: 'vitaminB6', label: '維生素B6 (mg)', field: 'vitaminB6', sortable: true },
        { name: 'vitaminB12', label: '維生素B12 (mg)', field: 'vitaminB12', sortable: true },
        { name: 'folic_acid', label: '葉酸 (ug)', field: 'folic_acid', sortable: true },
        { name: 'vitaminC', label: '維生素C (mg)', field: 'vitaminC', sortable: true },
        { name: 'fatty_acidS', label: '脂肪酸S (mg)', field: 'fatty_acidS', sortable: true },
        { name: 'fatty_acidM', label: '脂肪酸M (mg)', field: 'fatty_acidM', sortable: true },
        { name: 'fatty_acidP', label: '脂肪酸P (mg)', field: 'fatty_acidP', sortable: true },
        { name: 'cholesterol', label: '膽固醇 (mg)', field: 'cholesterol', sortable: true },
    ],

    dish: [
        // {
        //     id: '1',
        //     name: '水餃',
        //     restaurant_id: '飯店',
        //     dish_photo: 'https://i.imgur.com/GzaDoDhb.jpg',
        //     calories: 125,
        //     fat: 125,
        //     protein: 125,
        //     carbs: 125,
        //     grains: 125,
        //     fruits: 125,
        //     vegetables: 125,
        //     oils: 125,
        //     dairy: 125,
        //     meat_and_beans: 125,
        //     dietary_fiber: 125,
        //     total_sugar: 125,
        //     sodium: 125,
        //     potassium: 125,
        //     calcium: 125,
        //     magnesium: 125,
        //     iron: 125,
        //     zinc: 125,
        //     phosphorus: 125,
        //     vitaminA: 125,
        //     vision_alcohol: 125,
        //     vitaminE: 125,
        //     vitaminB1: 125,
        //     vitaminB2: 125,
        //     vitaminB6: 125,
        //     vitaminB12: 125,
        //     vitaminC: 125,
        //     nicotin: 125,
        //     folic_acid: 125,
        //     fatty_acidS: 125,
        //     fatty_acidM: 125,
        //     fatty_acidP: 125,
        //     cholesterol: 125,
        // },
    ],  

    food: [
        // {
            // id: '3',
            // name: '蛋',
            // quantity: 1,
            // calories: 10,
            // fat: 10,
            // protein: 10,
            // carbs: 10,
            // grains: 10,
            // fruits: 10,
            // vegetables: 10,
            // oils: 10,
            // dairy: 10,
            // meat_and_beans: 10,
            // dietary_fiber: 10,
            // total_sugar: 10,
            // sodium: 10,
            // potassium: 10,
            // calcium: 10,
            // magnesium: 10,
            // iron: 10,
            // zinc: 10,
            // phosphorus: 10,
            // vitaminA: 10,
            // vision_alcohol: 10,
            // vitaminE: 10,
            // vitaminB1: 10,
            // vitaminB2: 10,
            // vitaminB6: 10,
            // vitaminB12: 10,
            // vitaminC: 10,
            // nicotin: 10,
            // folic_acid: 10,
            // fatty_acidS: 10,
            // fatty_acidM: 10,
            // fatty_acidP: 10,
            // cholesterol: 10,
        //}
    ],
    restaurant: [  
        // '餐廳'
    ],
    contain: [
        // {
        //     dish: '1',
        //     food: '1',
        //     quantity: 10
        // },
    ],
    recipe: [
        // {
        //     id: '1',
        //     dish: '1',
        //     photo: 'https://uploads-blog-icook.icook.network/2016/12/2016year-hot-recipe-200ppi-640x800.png',
        //     text: '1.高麗菜切碎(小丁)、韭黃或蔥皆切末；薑蘑成泥。高麗菜、韭黃、蔥分開加鹽，以保鮮膜密封，放置1小時出水。出水後以清水將鹽分沖掉、儘可能瀝乾水份。2.將豬絞肉(要用時再從冰箱取出)、蔥花、韭黃、薑、水放入盆中攪拌均勻。再加入高麗菜拌勻。加入醬油、白胡椒粉後拌至略有黏性，即可開始包水餃。',
        // }
    ],
    editor: [
        {
            dish:'',
            user:'',
            time:''
        }
    ],
    dish_id: '',
    dish_photo:'無',
    recipe_photo: '無',
    search: '', //開發預設
    searchType: 'dish',
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

    addFood(state, payload) {
        state.food.push(payload)
    },
    addDish(state, payload) {
        state.dish.push(payload)
    },
    setDishId(state, payload) {
        state.dish_id = payload
    },
    addRestaurant(state, restaurant) {
        state.restaurant.push(restaurant)
    },
    addContain(state, contain) {
        state.contain.push(contain)
    },
    addRecipe(state, payload) {
        state.recipe.push(payload)
    },
    addDishPhoto(state, url) {
        state.dish_photo = url
    },
    addRecipePhoto(state, url) {
        state.recipe_photo = url
    },

    updateFood(state, payload) {
        for (let i = 0; i < state.food.length; i++) {
            if (state.food[i].id == payload.id) {
                Object.assign(state.food[i], payload)
            }
        }
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

    addDish({commit, dispatch}, dish) {
        let dishId = uid()
        let payload = dish
        payload.id = dishId
        commit('setDishId', payload.id)
        dispatch('fbAddDish', payload)
    },
    addRestaurant({dispatch}, restaurant) {
        let payload = {
            name: restaurant
        }
        dispatch('fbAddRestaurant', payload)
    },
    addContain({dispatch}, contain) {
        for (let i = 0; i < contain.length; i++) {
            dispatch('fbAddContain', contain[i])
        }
    },
    addRecipe({dispatch}, recipe) {
        let id = uid()
        let payload = recipe
        payload.id = id
        dispatch('fbAddRecipe', payload)
    },
    addDownloadURL({commit}, photo) {
        if (photo.type == 'dishs') {
            commit('addDishPhoto', photo.url)
        }
        else if (photo.type == 'recipes') {
            commit('addRecipePhoto', photo.url)
        }
    },

    updateSix({dispatch}, payload) {
        dispatch('fbUpdateSix', payload)
    },

    fbReadData({ commit }) {
        // let userId = firebaseAuth.currentUser.uid
        let db = firebase.firestore()
        
        // // initial get foods form firestore
        // db.collection('foods').get().then(snapshot => {
        //     snapshot.forEach((doc) => {
        //         commit('addFood', doc.data())
        //     })
        // })
        
        // listen realtime update and handle data
        db.collection("foods").onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    commit('addFood', change.doc.data())
                }
                if (change.type === "modified") {
                    commit('updateFood', change.doc.data())
                }
                // if (change.type === "removed") {
                    
                // }
            })
        })
        db.collection("dishs").onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    commit('addDish', change.doc.data())
                }
                // if (change.type === "modified") {
                    
                // }
                // if (change.type === "removed") {
                    
                // }
            })
        })
        db.collection("restaurants").onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    commit('addRestaurant', change.doc.data().name)
                }
            })
        })
        db.collection("recipes").onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    commit('addRecipe', change.doc.data())
                }
            })
        })
        db.collection("contains").onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    commit('addContain', change.doc.data())
                }
            })
        })
    },

    fbAddDish({}, payload) {
        // let userId = firebaseAuth.currentUser.uid
        let dishRef = firebase.firestore().collection("dishs")
        dishRef.add(payload)
        .then(function() {
            // Notify.create('添加成功！')
        })
        .catch(function(error) {
            console.error("Error adding dish: ", error);
        });
    },
    fbAddRestaurant({}, payload) {
        // let userId = firebaseAuth.currentUser.uid
        let restaurantRef = firebase.firestore().collection("restaurants")
        restaurantRef.add(payload)
        .then(function() {
            // Notify.create('添加成功！')
        })
        .catch(function(error) {
            console.error("Error adding restaurant: ", error);
        });
    },
    fbAddRecipe({}, payload) {
        // let userId = firebaseAuth.currentUser.uid
        let recipeRef = firebase.firestore().collection("recipes")
        recipeRef.add(payload)
        .then(function() {
            // Notify.create('添加成功！')
        })
        .catch(function(error) {
            console.error("Error adding recipe: ", error);
        });
    },
    fbAddContain({}, payload) {
        // let userId = firebaseAuth.currentUser.uid
        let containRef = firebase.firestore().collection("contains")
        containRef.add(payload)
        .then(function() {
            // Notify.create('添加成功！')
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    },

    fbUpdateSix({}, payload) {
        // let userId = firebaseAuth.currentUser.uid
        let foodRef = firebase.firestore().collection("foods")

        foodRef.get().then(snapshot => {
            snapshot.forEach((doc) => {
                if (doc.data().id == payload.id) {
                   foodRef.doc(doc.id).update({
                        grains: payload.grains,
                        fruits: payload.fruits,
                        vegetables: payload.vegetables,
                        oils: payload.oils,
                        dairy: payload.dairy,
                        meat_and_beans: payload.meat_and_beans
                   })
                }
            })
        })
    },
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
        for (let i = 0; i < state.food.length; i++) {
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