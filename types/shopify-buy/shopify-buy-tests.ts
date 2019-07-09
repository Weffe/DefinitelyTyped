// Initializing the Client
const client = ShopifyBuy.Client.buildClient({
    domain: 'buyapitypestest.myshopify.com',
    storefrontAccessToken: '9f30a6806b613e0cb551b7db59c5ca02',
});

//#region Product Methods
//-------------------------------
client.product.fetch('123').then(product => {
    const availableForSale: boolean = product.availableForSale;
    const createdAt: string = product.createdAt;
    const updatedAt: string = product.updatedAt;
    const descriptionHtml: string = product.descriptionHtml;
    const description: string = product.description;
    const handle: string = product.handle;
    const productType = product.productType;
    const title: string = product.title;
    const vendor: string = product.vendor;
    const publishedAt: string = product.publishedAt;
    const onlineStoreUrl: string = product.onlineStoreUrl;
    const id: string = product.id;

    const options = product.options;
    const images = product.images;
    const variants = product.variants;

    // making sure we can loop over the options array
    for (let opt of options) {
        const { id, name, values } = opt;

        let concatValues = '';
        for (let value of values) {
            concatValues += value;
        }
    }

    const hasNextPage = images.pageInfo.hasNextPage;
    const hasPreviousPage = images.pageInfo.hasPreviousPage;

    images.edges.forEach(image => {
        const cursor = image.cursor;
        const { altText, id, src } = image.node;
    });

    const a = variants.pageInfo.hasNextPage;
    const b = variants.pageInfo.hasPreviousPage;

    variants.edges.forEach(variant => {
        const cursor = variant.cursor;
        const {
            available,
            compareAtPrice,
            id,
            image,
            presentmentPrices,
            price,
            selectedOptions,
            sku,
            title,
            weight,
        } = variant.node;
    });
});

client.product.fetchAll(5).then(products => {
    products.forEach(product => {
        const {
            availableForSale,
            createdAt,
            updatedAt,
            descriptionHtml,
            description,
            handle,
            productType,
            title,
            vendor,
            publishedAt,
            onlineStoreUrl,
            options,
            images,
            variants,
            id,
        } = product;
    });
});

client.product.fetchByHandle('my-product').then(product => {
    const {
        availableForSale,
        createdAt,
        updatedAt,
        descriptionHtml,
        description,
        handle,
        productType,
        title,
        vendor,
        publishedAt,
        onlineStoreUrl,
        options,
        images,
        variants,
        id,
    } = product;
});

client.product.fetchMultiple(['1', '2', '3']).then(products => {
    products.forEach(product => {
        const {
            availableForSale,
            createdAt,
            updatedAt,
            descriptionHtml,
            description,
            handle,
            productType,
            title,
            vendor,
            publishedAt,
            onlineStoreUrl,
            options,
            images,
            variants,
            id,
        } = product;
    });
});

const productQry: ShopifyBuy.ProductQuery = {
    first: 20,
    sortKey: ShopifyBuy.ProductSortKeys.PRICE,
    reverse: true,
    query: 'test',
};
client.product.fetchQuery(productQry).then(products => {
    products.forEach(product => {
        const {
            availableForSale,
            createdAt,
            updatedAt,
            descriptionHtml,
            description,
            handle,
            productType,
            title,
            vendor,
            publishedAt,
            onlineStoreUrl,
            options,
            images,
            variants,
            id,
        } = product;
    });
});

// testing variantForOptions
client.product.fetch('123').then(product => {
    const variant = client.product.helpers.variantForOptions(product, {
        size: 'small',
    });

    const { title, price, presentmentPrices, weight, sku, available, compareAtPrice, image, selectedOptions } = variant;

    presentmentPrices.edges.forEach(edge => {
        const amount = edge.node.price.amount;
        const currencyCode = edge.node.price.currencyCode;
    });
});
//#endregion Product Methods

//#region Collection Methods
//-------------------------------
client.collection.fetch('123').then(collection => {
    const { description, descriptionHtml, image, id, handle, title, updatedAt } = collection;
    const { altText, src } = image;
    const imageId = image.id;
});

client.collection.fetchAll(5).then(collections => {
    collections.forEach(collection => {
        const { description, descriptionHtml, image, id, handle, title, updatedAt } = collection;
        const { altText, src } = image;
        const imageId = image.id;
    });
});

client.collection.fetchAllWithProducts().then(collections => {
    collections.forEach(collection => {
        const { description, descriptionHtml, image, id, handle, title, updatedAt, products } = collection;
        const { altText, src } = image;
        const imageId = image.id;

        products.forEach(product => {
            const {
                availableForSale,
                createdAt,
                updatedAt,
                descriptionHtml,
                description,
                handle,
                productType,
                title,
                vendor,
                publishedAt,
                onlineStoreUrl,
                options,
                images,
                variants,
                id,
            } = product;
        });
    });
});

client.collection.fetchByHandle('my-product').then(collection => {
    const { description, descriptionHtml, image, id, handle, title, updatedAt } = collection;
    const { altText, src } = image;
    const imageId = image.id;
});

const collectionQry: ShopifyBuy.CollectionQuery = {
    first: 5,
    query: 'test',
    reverse: false,
    sortKey: ShopifyBuy.CollectionSortKeys.RELEVANCE,
};
client.collection.fetchQuery(collectionQry).then(collections => {
    collections.forEach(collection => {
        const { description, descriptionHtml, image, id, handle, title, updatedAt } = collection;
        const { altText, src } = image;
        const imageId = image.id;
    });
});

client.collection.fetchWithProducts('123').then(collection => {
    const { description, descriptionHtml, image, id, handle, title, updatedAt, products } = collection;
    const { altText, src } = image;
    const imageId = image.id;

    products.forEach(product => {
        const {
            availableForSale,
            createdAt,
            updatedAt,
            descriptionHtml,
            description,
            handle,
            productType,
            title,
            vendor,
            publishedAt,
            onlineStoreUrl,
            options,
            images,
            variants,
            id,
        } = product;
    });
});
//#endregion Collection Methods

//#region Image Methods
//-------------------------------
client.image;
//#endregion Image Methods
