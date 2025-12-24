-- USERS TABLE

create table users(
    user_id varchar(50) primary key,
    name varchar(100) Not null,
    email varchar(150) not null unique,
    created_at bigint not Null
);
-- USER_PROFILE TABLE


create table user_profile(
    profile_id varchar(50) primary key,
    user_id varchar(50) not null,
    diet_type varchar(50) not null,
    cooking_skill varchar(50) not null,
    allergies Text,
    liked_ingredient Text,
    avoided_ingredient text,
    updated_at bigint Not null,
    constraint fk_user_profile_user
        Foreign key (user_id)
        reference users(user_id)
        on delete cascade
    );

-- RECIPES TABLE

   CREATE TABLE recipes (
    recipe_id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    image_url TEXT,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    diet_tags TEXT,
    cached_at BIGINT NOT NULL
);

-- Reviews table 
CREATE TABLE reviews (
    review_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    recipe_id VARCHAR(50) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at BIGINT NOT NULL,

    CONSTRAINT fk_reviews_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_reviews_recipe
        FOREIGN KEY (recipe_id)
        REFERENCES recipes(recipe_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_recipe_review
        UNIQUE (user_id, recipe_id)
);