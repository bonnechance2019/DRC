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
                    if (key == 'id' || key == 'name' || key == 'trash') { 
                        temp[key] = food[j][key]    // 過濾不依賴份量的key
                    }
                    else {
                        temp[key] = food[j][key]*value[i].quantity  // 將營養素＊份量
                    }
                })
                Food.push(temp)
                j = food.length  
            }
        }
    }
    for (let i = 0; i < Food.length; i++) { // 將營養素的值加入總和
        totalNutrient.quantity += Food[i].quantity
        totalNutrient.calories += Food[i].calories
        totalNutrient.fat += Food[i].fat
        totalNutrient.protein += Food[i].protein
        totalNutrient.carbs += Food[i].carbs
        totalNutrient.grains += Food[i].grains
        totalNutrient.fruits += Food[i].fruits
        totalNutrient.vegetables += Food[i].vegetables
        totalNutrient.oils += Food[i].oils
        totalNutrient.dairy_all += Food[i].dairy_all
        totalNutrient.dairy_low += Food[i].dairy_low
        totalNutrient.dairy_de += Food[i].dairy_de
        totalNutrient.meat_low += Food[i].meat_low
        totalNutrient.meat_med += Food[i].meat_med
        totalNutrient.meat_high += Food[i].meat_high
        totalNutrient.meat_max += Food[i].meat_max
        totalNutrient.dietary_fiber += Food[i].dietary_fiber
        totalNutrient.total_sugar += Food[i].total_sugar
        totalNutrient.sodium += Food[i].sodium
        totalNutrient.potassium += Food[i].potassium
        totalNutrient.calcium += Food[i].calcium
        totalNutrient.magnesium += Food[i].magnesium
        totalNutrient.iron += Food[i].iron
        totalNutrient.zinc += Food[i].zinc
        totalNutrient.phosphorus += Food[i].phosphorus
        totalNutrient.vitaminA += Food[i].vitaminA
        totalNutrient.vision_alcohol += Food[i].vision_alcohol
        totalNutrient.vitaminE += Food[i].vitaminE
        totalNutrient.vitaminB1 += Food[i].vitaminB1
        totalNutrient.vitaminB2 += Food[i].vitaminB2
        totalNutrient.vitaminB6 += Food[i].vitaminB6
        totalNutrient.vitaminB12 += Food[i].vitaminB12
        totalNutrient.vitaminC += Food[i].vitaminC
        totalNutrient.nicotin += Food[i].nicotin
        totalNutrient.folic_acid += Food[i].folic_acid
        totalNutrient.fatty_acidS += Food[i].fatty_acidS
        totalNutrient.fatty_acidM += Food[i].fatty_acidM
        totalNutrient.fatty_acidP += Food[i].fatty_acidP
        totalNutrient.cholesterol += Food[i].cholesterol
    }
    Food.push(totalNutrient)
    return Food
}