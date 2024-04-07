import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() { 
    await new Promise(resolve => setTimeout(resolve, 5000)); //Forcefully added to get the feel of Loading

    // throw new Error("Some issue occurred"); // to see the error page
    return db.prepare('SELECT * FROM meals').all(); //all: fetch al rows, run: modify the data, get: fetch a single row
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); //this pattern should be used for dynamic fields to avoid sql injection
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public//images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            throw new Error('Saving iomage failed');
        }
    });

    meal.image = `/images/${fileName}`; // since the content of public folder is send as root directory

    db.prepare(`
        INSERT INTO meals 
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}