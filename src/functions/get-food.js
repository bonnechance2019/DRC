import NP from 'number-precision'

export function getFood(value, food) {
    let Food = [],
        totalNutrient = {   // 總和的欄位
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
            dairy_all: 0,
            dairy_low: 0,
            dairy_de: 0,
            meat_low: 0,
            meat_med: 0,
            meat_high: 0,
            meat_max: 0,
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
        }
    for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < food.length; j++) {
            if (food[j].id == value[i].food) {
                let temp = { id:'' }    // 暫存組成料理的食材份量
                Object.keys(food[j]).forEach(key => { 
                    if (key == 'id' || key == 'name' || key == 'trash' || key == 'description') { 
                        temp[key] = food[j][key]    // 過濾不依賴份量的key
                    }
                    else {
                        temp[key] = NP.times(food[j][key], value[i].quantity)  // 將營養素＊份量
                    }
                })
                Food.push(temp)
                j = food.length  
            }
        }
    } 
    for (let i = 0; i < Food.length; i++) { // 將營養素的值加入總和
        Object.keys(totalNutrient).forEach(key => {
            if (key != 'name') {
                totalNutrient[key] = NP.plus(Food[i][key], totalNutrient[key])
            }
        })
    }
    Food.push(totalNutrient)
    return Food
}