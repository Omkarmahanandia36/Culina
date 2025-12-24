# Culina — Database Schema 

This document describes the **logical database schema** for **Culina**, a Recipe Management System.
Although the application is deployed as a **static web application**, the schema is designed using
relational principles and can be directly migrated to a backend database if required.

For runtime persistence, the application uses **client-side storage** while preserving this schema structure.


## 1. Design Constraints & Assumptions

- The application is deployed on a **static server**
- Data persistence is handled on the client side
- One active user per browser session 
- Schema is designed to mirror a real backend database
- SQL schema is provided separately for academic and design purposes

---

## 2. USERS

### Purpose
Stores basic user identity information required for registration and session management.

### Logical Table
**USERS**

### Client Storage Mapping
- **Storage Key:** `culina_user`
- **Type:** Object

### Fields

| Field     | Type   | Required | Description                    |
|----- -----|--------|----------|--------------------------------|
| user_id   | string | Yes      | Unique identifier for the user |
| name      | string | Yes      | User’s full name               |
| email     | string | Yes      | User’s email address           |
| created_at| number | Yes      | Account creation timestamp     |

### Rules
- No password is stored
- Authentication is client-side only
- Only one active user exists per session

---

## 3. USER_PROFILE

### Purpose
Stores dietary preferences, allergies, ingredient choices, and cooking skill level.

### Logical Table
**USER_PROFILE**

### Client Storage Mapping
- **Storage Key:** `culina_user_profile`
- **Type:** Object

### Fields

| Field               | Type   | Required | Description                         |
|---------------------|--------|----------|-------------------------------------|
| user_id             | string | Yes      | Reference to USERS                  |
| diet_type           | string | Yes      | Vegetarian / Non-vegetarian / Vegan |
| cooking_skill       | string | Yes      | Beginner / Intermediate / Advanced  |
| allergies           | array  | No       | List of food allergies              |
| liked_ingredients   | array  | No       | Preferred ingredients               |
| avoided_ingredients | array  | No       | Ingredients to avoid                |
| updated_at          | number | Yes      | Last profile update timestamp       |

### Rules
- Profile must be completed before accessing recipes
- Profile data can be updated at any time

---

## 4. RECIPES_CACHE

### Purpose
Caches recipe data fetched from an external recipe API to reduce repeated API calls
and ensure application reliability.

### Logical Table
**RECIPES**

### Client Storage Mapping
- **Storage Key:** `culina_recipes_cache`
- **Type:** Object / Collection

### Fields

| Field        | Type   | Description                    |
|--------------|--------|--------------------------------|
| recipe_id    | string | API-provided recipe identifier |
| title        | string | Recipe title                   |
| image        | string | Recipe image URL               |
| ingredients  | array  | List of ingredients            |
| instructions | string | Cooking instructions           |
| diet_tags    | array  | Dietary labels                 |
| cached_at    | number | Cache creation timestamp       |

### Rules
- Cached data may be refreshed periodically
- Cached recipes are used if the API is unavailable

---

## 5. REVIEWS

### Purpose
Stores user ratings and textual reviews for recipes.

### Logical Table
**REVIEWS**

### Client Storage Mapping
- **Storage Key:** `culina_reviews`
- **Type:** Array

### Fields

| Field      | Type   | Required | Description              |
|------------|--------|----------|--------------------------|
| review_id  | string | Yes      | Unique review identifier |
| user_id    | string | Yes      | Reference to USERS       |
| recipe_id  | string | Yes      | Reference to RECIPES     |
| rating     | number | Yes      | Rating value (1–5)       |
| comment    | string | No       | Optional review text     |
| created_at | number | Yes      | Review creation timestamp|

### Rules
- One user can review a recipe only once
- Updating a review replaces the previous one
- Rating values must be between 1 and 5

---

## 6. Relationships

- One user has exactly one profile
- One user can submit multiple reviews
- One recipe can have multiple reviews
- Each review is associated with one user and one recipe

---

## 7. Mapping to Implementation

Although the schema is relational in design, it is implemented using client-side storage:

- Tables are represented as JavaScript objects or arrays
- Relationships are maintained using unique identifiers
- Data persistence is handled via browser LocalStorage

This approach ensures:
- Refresh-safe behavior
- Full functionality on static hosting
- Clear separation between data and UI logic

---

## 8. Schema Justification

This schema is intentionally minimal and structured to:

- Satisfy all project requirements
- Support user preferences, recipe discovery, and reviews
- Work reliably without a backend server
- Enable easy migration to SQL or NoSQL databases in the future
