import Vue from 'vue'
import { uid, Notify, Loading } from 'quasar'
import firebase from 'firebase/app'
import { getFood } from '../functions/get-food'
import { showError } from 'src/functions/show-error'

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
        { name: 'person', label: '人份', field: 'person' },
        { name: 'restaurant_id', align: 'left', label: '餐廳', field: 'restaurant_id' },
        { name: 'number', align: 'right', label: '編號', field: 'number' },
        { name: 'dish_photo', align: 'center', label: '照片', field: 'dish_photo' },
        
        { name: 'grains', label: '全穀雜糧類', field: 'grains' },
        { name: 'meat_low', label: '蛋豆魚肉類（低脂）', field: 'meat_low' },
        { name: 'meat_med', label: '蛋豆魚肉類（中脂）', field: 'meat_med' },
        { name: 'meat_high', label: '蛋豆魚肉類（高脂）', field: 'meat_high' },
        { name: 'meat_max', label: '蛋豆魚肉類（超高脂）', field: 'meat_max' },
        { name: 'vegetables', label: '蔬菜類', field: 'vegetables' },
        { name: 'fruits', label: '水果類', field: 'fruits' },
        { name: 'dairy_all', label: '乳品類（全脂）', field: 'dairy_all' },
        { name: 'dairy_low', label: '乳品類（低脂）', field: 'dairy_low' },
        { name: 'dairy_de', label: '乳品類（脫脂）', field: 'dairy_de' },
        { name: 'oils', label: '油脂與堅果種子類', field: 'oils' },
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
          label: '名稱',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },

        { name: 'quantity', label: '份量 (100g)', field: 'quantity', sortable: true },
        { name: 'trash', label: '廢棄率 (%)', field: 'trash', sortable: true },
        { name: 'grains', label: '全穀雜糧類', field: 'grains' },
        { name: 'meat_low', label: '蛋豆魚肉類（低脂）', field: 'meat_low' },
        { name: 'meat_med', label: '蛋豆魚肉類（中脂）', field: 'meat_med' },
        { name: 'meat_high', label: '蛋豆魚肉類（高脂）', field: 'meat_high' },
        { name: 'meat_max', label: '蛋豆魚肉類（超高脂）', field: 'meat_max' },
        { name: 'vegetables', label: '蔬菜類', field: 'vegetables' },
        { name: 'fruits', label: '水果類', field: 'fruits' },
        { name: 'dairy_all', label: '乳品類（全脂）', field: 'dairy_all' },
        { name: 'dairy_low', label: '乳品類（低脂）', field: 'dairy_low' },
        { name: 'dairy_de', label: '乳品類（脫脂）', field: 'dairy_de' },
        { name: 'oils', label: '油脂與堅果類', field: 'oils' },
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
    nutrient: {
        calories: 'calories',
        fat: 'fat',
        protein: 'protein',
        carbs: 'carbs',
        // grains: 'grains',
        // fruits: 'fruits',
        // vegetables: 'vegetables',
        // oils: 'oils',
        // dairy_all: 'dairy_all',
        // dairy_low: 'dairy_low',
        // dairy_de: 'dairy_de', 
        // meat_low: 'meat_low',
        // meat_med: 'meat_med',
        // meat_high: 'meat_high',
        // meat_max: 'meat_max',
        dietary_fiber: 'dietary_fiber',
        total_sugar: 'total_sugar',
        sodium: 'sodium',
        potassium: 'potassium',
        calcium: 'calcium',
        magnesium: 'magnesium',
        iron: 'iron',
        zinc: 'zinc',
        phosphorus: 'phosphorus',
        vitaminA: 'vitaminA',
        vision_alcohol: 'vision_alcohol',
        vitaminE: 'vitaminE',
        vitaminB1: 'vitaminB1',
        vitaminB2: 'vitaminB2',
        vitaminB6: 'vitaminB6',
        vitaminB12: 'vitaminB12',
        vitaminC: 'vitaminC',
        nicotin: 'nicotin',
        folic_acid: 'folic_acid',
        fatty_acidS: 'fatty_acidS',
        fatty_acidM: 'fatty_acidM',
        fatty_acidP: 'fatty_acidP',
        cholesterol: 'cholesterol'
    }, // 不包含六大類的27項
    nutrientChinese:{
        calories: '熱量(kcal)',
        fat: '脂肪(g)',
        protein: '蛋白質(g)',
        carbs: '糖類(g)',
        // grains: '全穀雜糧類',
        // fruits: '水果類',
        // vegetables: '蔬菜類',
        // oils: '油脂與堅果類',
        // dairy_all: '乳品類(全脂)',
        // dairy_low: '乳品類(低脂)',
        // dairy_de: '乳品類(脫脂)', 
        // meat_low: '蛋、豆、魚、肉類(低脂)',
        // meat_med: '蛋、豆、魚、肉類(中脂)',
        // meat_high: '蛋、豆、魚、肉類(高脂)',
        // meat_max: '蛋、豆、魚、肉類(超高脂)',
        dietary_fiber: '膳食纖維(g)',
        total_sugar: '糖值總量(g)',
        sodium: '鈉(mg)',
        potassium: '鉀(mg)',
        calcium: '鈣(mg)',
        magnesium: '鎂(mg)',
        iron: '鐵(mg)',
        zinc: '鋅(mg)',
        phosphorus: '磷(mg)',
        vitaminA: '維生素Ａ(IU)',
        vision_alcohol: '視網醇(ug)',
        vitaminE: 'a-維生素E(mg)',
        vitaminB1: '維生素B1(mg)',
        vitaminB2: '維生素B2(mg)',
        vitaminB6: '維生素B6(mg)',
        vitaminB12: '維生素B12(mg)',
        vitaminC: '維生素C(mg)',
        nicotin: '菸鹼素(mg)',
        folic_acid: '葉酸(ug)',
        fatty_acidS: '脂肪酸S(mg)',
        fatty_acidM: '脂肪酸M(mg)',
        fatty_acidP: '脂肪酸P(mg)',
        cholesterol: '膽固醇(mg)'
    }, // 不包含六大類的27項中文

    dish: [
        // {
        //     id: '1',
        //     name: '水餃',
        //     number: '',
        //     person: '',
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
        //     dairy_all: 10,(8<=x)
            // dairy_low: 10,(1<x<8)
            // dairy_de: 10, (x<=1)
            // meat_low: 10,
            // meat_med: 10,
            // meat_high: 10,
            // meat_max: 10,
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
            // description:'怎麼做怎麼幹' （用tooplist顯示）
            // trash: 10(%)
            // quantity: 1,
            // calories: 10,
            // fat: 10,
            // protein: 10,
            // carbs: 10,
            // grains: 10,
            // fruits: 10,
            // vegetables: 10,
            // oils: 10,
            // dairy_all: 10,(8<=x)
            // dairy_low: 10,(1<x<8)
            // dairy_de: 10, (x<=1)
            // meat_low: 10, (x<4)
            // meat_med: 10, (4<=x<9)
            // meat_high: 10, (9<=x<=11)
            // meat_max: 10, (11<x)
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
    clear(state) {
        state.dish_id = ''
        state.dish_photo = '無'
        state.recipe_photo = '無'
        state.search = ''
        state.searchType = ''
        state.select = ''
    },
    clearData(state) {
        state.dish = []
        state.food = []
        state.restaurant = []
        state.contain = []
        state.recipe = []
    },
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
    setDishReadyToUpdate(state, value) {
        state.dishReadyToUpdate = value
    },

    addFood(state, payload) {
        state.food.push(payload)
    },
    addDish(state, payload) {
        state.dish.push(payload)
    },
    setDishId(state, id) {
        state.dish_id = id
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
    },
    updateDish(state, payload) {
        for (let i = 0; i < state.dish.length; i++) {
            if (state.dish[i].id == payload.id) {
                Object.assign(state.dish[i], payload)
            }
        }
    },
    updateRecipe(state, payload) {
        for (let i = 0; i < state.recipe.length; i++) {
            if (state.recipe[i].id == payload.id) {
                Object.assign(state.recipe[i], payload)
            }
        }
    },

    deleteContain(state, payload) {
        for (let i = 0; i < state.contain.length; i++) {
            if (state.contain[i].dish == payload.dish) {
                Vue.delete(state.contain, i)
                i = state.contain.length
            }
        }
    }
}

const actions = {
    clear({commit}) {
        commit('clear')
    },
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
    setDishReadyToUpdate({commit}, value) {
        commit('setDishReadyToUpdate', value)
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
            console.log('Photo of dish:', photo.url)
            commit('addDishPhoto', photo.url)
        }
        else if (photo.type == 'recipes') {
            console.log('Photo of recipe:', photo.url)
            commit('addRecipePhoto', photo.url)
        }
    },

    updateSix({dispatch}, payload) {
        dispatch('fbUpdateSix', payload)
    },
    updateNutrient({dispatch}, payload) {
        dispatch('fbUpdateNutrient', payload)
    },
    updateDish({dispatch}, payload) {
        dispatch('fbUpdateDish', payload)
    },
    updateRecipe({dispatch}, payload) {
        dispatch('fbUpdateRecipe', payload)
    },

    deleteContain({dispatch}, id) {
        dispatch('fbDeleteContain', id)
    },
    deletePhoto({dispatch}, url) {
        dispatch('fbDeletePhoto', url)
    },

    fbReadData({commit}) {
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
                if (change.type === "modified") {
                    commit('updateDish', change.doc.data())
                }
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
                if (change.type === "modified") {
                    commit('updateRecipe', change.doc.data())
                }
            })
        })
        db.collection("contains").onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    commit('addContain', change.doc.data())
                }
                if (change.type === "removed") {
                    commit('deleteContain', change.doc.data())
                }
            })
        })
    },

    fbAddDish({}, payload) {
        // let userId = firebaseAuth.currentUser.uid
        let dishRef = firebase.firestore().collection("dishs")
        dishRef.add(payload)
        .then(function() {
            Notify.create({
                color: 'blue-10',
                icon: 'done',
                message:'料理新增成功！',
                position: 'top',
                timeout: 500
            })
        })
        .catch(function(error) {
            showError(error.message)
        });
    },
    fbAddRestaurant({}, payload) {
        // let userId = firebaseAuth.currentUser.uid
        let restaurantRef = firebase.firestore().collection("restaurants")
        restaurantRef.add(payload)
        .then(function() {
            Notify.create({
                color: 'cyan-8',
                icon: 'done',
                message:'餐廳新增成功！',
                position: 'top',
                timeout: 500
            })
        })
        .catch(function(error) {
            showError(error.message)
        });
    },
    fbAddRecipe({}, payload) {
        // let userId = firebaseAuth.currentUser.uid
        let recipeRef = firebase.firestore().collection("recipes")
        recipeRef.add(payload)
        .then(function() {
            Notify.create({
                color: 'teal-7',
                icon: 'done',
                message:'食譜新增成功！',
                position: 'top',
                timeout: 500
            })
        })
        .catch(function(error) {
            showError(error.message)
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
            showError(error.message)
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
                        dairy_all: payload.dairy_all,
                        dairy_low: payload.dairy_low,
                        dairy_de: payload.dairy_de,
                        meat_low: payload.meat_low,
                        meat_med: payload.meat_med,
                        meat_high: payload.meat_high,
                        meat_max: payload.meat_max
                    })
                    .then(() => {
                        Notify.create({
                            color: 'orange-6',
                            icon: 'done',
                            message:'六大類修改成功！',
                            position: 'bottom',
                            timeout: 500
                        })
                    })
                    .catch((error) => {
                        showError(error.message)
                    })
                }
            })
        })
    },
    fbUpdateNutrient({}, payload) {
        let foodRef = firebase.firestore().collection("foods")

        foodRef.get().then(snapshot => {
            snapshot.forEach((doc) => {
                if (doc.data().id == payload.id) {
                    foodRef.doc(doc.id).update(payload)
                    .then(() => {
                        Notify.create({
                            color: 'orange-6',
                            icon: 'done',
                            message:'營養素修改成功！',
                            position: 'bottom',
                            timeout: 500
                        })
                    })
                    .catch((error) => {
                        showError(error.message)
                    })
                }
            })
        })
    },
    fbUpdateDish({}, payload) {
        // let userId = firebaseAuth.currentUser.uid
        let dishRef = firebase.firestore().collection("dishs")
            
        dishRef.get().then(snapshot => {
            snapshot.forEach((doc) => {
                if (doc.data().id == payload.id) {
                    dishRef.doc(doc.id).update(payload)
                    .then(() => {
                        Notify.create({
                            color: 'blue-10',
                            icon: 'done',
                            message:'料理修改成功！',
                            position: 'bottom',
                            timeout: 500
                        })
                    })
                    .catch((error) => {
                        showError(error.message)
                    })
                }
            })
        })
    },
    fbUpdateRecipe({}, payload) {
        let recipeRef = firebase.firestore().collection("recipes")
            
        recipeRef.get().then(snapshot => {
            snapshot.forEach((doc) => {
                if (doc.data().id == payload.id) {
                    recipeRef.doc(doc.id).update(payload)
                    .catch((error) => {
                        showError(error.message)
                    })
                }
            })
        })
    },

    fbDeleteContain({}, id) {
        let containRef = firebase.firestore().collection("contains")

        containRef.get().then(snapshot => {
            snapshot.forEach((doc) => {
                if (doc.data().dish == id) {
                    containRef.doc(doc.id).delete()
                }
            })
        })
    },
    fbDeletePhoto({}, url) {
        firebase.storage().refFromURL(url).delete()
    }
}

const getters = {
     /// dish的contain
     contain: (state, getters) => {
        let contain = []
        for (let i = 0; i < state.contain.length; i++) {
            if (state.contain[i].dish == state.select) {
                contain.push(state.contain[i])
            }
        }
        
        return contain
    },

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
        let foodMakeDish
        foodMakeDish = getFood(getters.contain, state.food)
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
        let recipeMakeDish = {
            id: '',
            dish: '',
            photo: '無',
            text: '',
        }

        for (let i = 0; i < state.recipe.length; i++) {
            if (state.select == state.recipe[i].dish) {
                recipeMakeDish = state.recipe[i]   
            }
        }
        return recipeMakeDish
    },
    recipe: (state, getters) => {
        return getters.recipeMakeDish
    }
}

export default {
    namespaced: true, 
    state,
    mutations,
    actions,
    getters,
}

// {
    //     restaurant_id: payload.restaurant_id,
    //     dish_photo: payload.dish_photo,
//     name: payload.name,
//     calories: payload.calories,
//     fat: payload.fat,
//     protein: payload.protein,
//     carbs: payload.carbs,
//     grains: payload.grains,
//     fruits: payload.fruits,
//     vegetables: payload.vegetables,
//     oils: payload.oils,
//     dairy_all: payload.dairy_all,
//     dairy_low: payload.dairy_low,
//     dairy_de: payload.dairy_de, 
//     meat_low: payload.meat_low,
//     meat_med: payload.meat_med,
//     meat_high: payload.meat_high,
//     meat_max: payload.meat_max,
//     dietary_fiber: payload.dietary_fiber,
//     total_sugar: payload.total_sugar,
//     sodium: payload.sodium,
//     potassium: payload.potassium,
//     calcium: payload.calcium,
//     magnesium: payload.magnesium,
//     iron: payload.iron,
//     zinc: payload.zinc,
//     phosphorus: payload.phosphorus,
//     vitaminA: payload.vitaminA,
//     vision_alcohol: payload.vision_alcohol,
//     vitaminE: payload.vitaminE,
//     vitaminB1: payload.vitaminB1,
//     vitaminB2: payload.vitaminB2,
//     vitaminB6: payload.vitaminB6,
//     vitaminB12: payload.vitaminB12,
//     vitaminC: payload.vitaminC,
//     nicotin: payload.nicotin,
//     folic_acid: payload.folic_acid,
//     fatty_acidS: payload.fatty_acidS,
//     fatty_acidM: payload.fatty_acidM,
//     fatty_acidP: payload.fatty_acidP,
//     cholesterol: payload.cholesterol,
// }