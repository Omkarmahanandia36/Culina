# culina - Database Schema

This Document defines the logical database chema for culina .
this application is statistically deployed and uses brower LocalStorage and its presistence layer.

## 1. USERS 
**Storage Key** `culina_user`
**Type:** Object

###fields
| Field | Type | Required |        Description        |
|-------|------|----------|---------------------------|
|user-id|String|   yes    |unique unser Identification|
| name  |String|   yes    |        User Name          |
| email |String|   yes    |        user Email         |
|created|number|  yes     |      Time Stamp           |


## 2. USER-PROFILE
**Storage key:** `Culina_user_profile`
**Type:** `Object`
|      field      |   Type | Requered |  Description                        | 
|      user_id    | string |   yes    | Reference to user                   |
|     diet_type   | string |   yes    | Veg / Non-veg / Vegan               |
|  cooking_skill  | string |   yes    | Beginner / Intermediate / Advanced  |
|     allergies   | array  |   no     | List of allergies                   |
|liked_ingredient | array  |   no     | Preferred ingredients               |
|avoide_ingredient| array  |   no     | Ingredients to avoid                |
|    updated_at   | number |   yes    | Timestamp                           |


## 3. RECIPES_CACHE

**Storage Key:** `culina_recipes_cache`
**Type:** `Object`
|  Field       | Type   | Description    |
|  recipe_id   | string | API recipe ID  |
|  title       | string | Recipe name    |
|  image       | string | Image URL      |
|  ingredients | array  | Ingredient list| 
|  instructions| string | Cooking steps  |
|  diet_tags   | array  | Dietary labels |
|  cached_at   | number | Timestamp      |

## 4.Reviews
**Storage Key:** `cilina reviews`
**Type:** `culina_reviews`
|   Field     | Type   | Required| Description         |
|   review_id | string | yes     | Unique review ID    |
|   user_id   | string | yes     | Reference to user   |
|   recipe_id | string | yes     | Reference to recipe |
|   rating    | number | yes     | Rating (1–5)        | 
|   comment   | string | no      | Review text         |
|   created_at| number | yes     | Timestamp           |
