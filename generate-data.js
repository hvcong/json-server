const faker = require('faker')
const fs = require('fs')


const randomCategoryList = (n) => {
    if (n <= 0) return []

    // random data
    const categoryList = []
    while (n > 0) {
        const category = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }

        categoryList.push(category)
        n--;
    }

    return categoryList
}

const randomProductList = (categoryList, numberOfProduct) => {
    if (numberOfProduct <= 0) return []

    const productList = []
    for (const category of categoryList) {
        Array.from(new Array(numberOfProduct)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                discription: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl(200, 200),
            }
            productList.push(product)
        })
    }


    return productList
}


(() => {
    //random data
    const categoryList = randomCategoryList(5)
    const productList = randomProductList(categoryList, 5)

    //prepare db object
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Vcong",
        },
    }

    //write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Generate data successfully =))')
    })

})()