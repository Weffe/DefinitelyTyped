// Initializing the Client
const client = ShopifyBuy.Client.buildClient({
    domain: 'buyapitypestest.myshopify.com',
    storefrontAccessToken: '9f30a6806b613e0cb551b7db59c5ca02',
});

//#region fetchNextPage
//-------------------------------
const fakeProducts: ShopifyBuy.Product[] = [];
const nextFakeProducts: ShopifyBuy.Product[] = client.fetchNextPage(fakeProducts);

const fakeCollection: ShopifyBuy.Collection[] = [];
const nextFakeCollection: ShopifyBuy.Collection[] = client.fetchNextPage(fakeCollection);

const fakeShop: ShopifyBuy.Shop[] = [];
const nextFakeShop: ShopifyBuy.Shop[] = client.fetchNextPage(fakeShop);

const fakeCheckout: ShopifyBuy.Checkout[] = [];
const nextFakeCheckout: ShopifyBuy.Checkout[] = client.fetchNextPage(fakeCheckout);

const fakeImage: ShopifyBuy.Image[] = [];
const nextFakeImage: ShopifyBuy.Image[] = client.fetchNextPage(fakeImage);
//#endregion fetchNextPage

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
    const onlineStoreUrl: string | null = product.onlineStoreUrl;
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

    if (image) {
        const { altText, id, src } = image;

        if (altText) {
            altText.charAt(3);
        }

        if (id) {
            id.charAt(3);
        }

        src.charAt(3);
    }
});

client.collection.fetchAll(5).then(collections => {
    collections.forEach(collection => {
        const { description, descriptionHtml, image, id, handle, title, updatedAt } = collection;

        if (image) {
            const { altText, id, src } = image;

            if (altText) {
                altText.charAt(3);
            }

            if (id) {
                id.charAt(3);
            }

            src.charAt(3);
        }
    });
});

client.collection.fetchAllWithProducts().then(collections => {
    collections.forEach(collection => {
        const { description, descriptionHtml, image, id, handle, title, updatedAt, products } = collection;

        if (image) {
            const { altText, id, src } = image;

            if (altText) {
                altText.charAt(3);
            }

            if (id) {
                id.charAt(3);
            }

            src.charAt(3);
        }

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

            options.forEach(opt => {
                const { id, name, values } = opt;

                values.map(v => v.charAt(1));
            });

            images.edges.forEach(edge => {
                const { cursor, node } = edge;

                cursor.charAt(1);

                const { altText, id, src } = node;

                if (altText) {
                    altText.charAt(1);
                }

                if (id) {
                    id.charAt(1);
                }

                src.charAt(2);
            });

            variants.edges.forEach(edge => {
                const { cursor, node } = edge;

                cursor.charAt(1);

                const {
                    available,
                    compareAtPrice,
                    selectedOptions,
                    sku,
                    title,
                    weight,
                    id,
                    image,
                    presentmentPrices,
                    price,
                } = node;

                selectedOptions.forEach(opt => {
                    const { name, value } = opt;
                });

                presentmentPrices.edges.forEach(edge => {
                    const { price } = edge.node;
                    const { amount, currencyCode } = price;

                    const foo = currencyCode === ShopifyBuy.CurrencyCode.BZD;
                });
            });
        });
    });
});

client.collection.fetchByHandle('my-product').then(collection => {
    const { description, descriptionHtml, image, id, handle, title, updatedAt } = collection;

    if (image) {
        const { altText, id, src } = image;

        if (altText) {
            altText.charAt(3);
        }

        if (id) {
            id.charAt(3);
        }

        src.charAt(3);
    }
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

        if (image) {
            const { altText, id, src } = image;

            if (altText) {
                altText.charAt(3);
            }

            if (id) {
                id.charAt(3);
            }

            src.charAt(3);
        }
    });
});

client.collection.fetchWithProducts('123').then(collection => {
    const { description, descriptionHtml, image, id, handle, title, updatedAt, products } = collection;

    if (image) {
        const { altText, id, src } = image;

        if (altText) {
            altText.charAt(3);
        }

        if (id) {
            id.charAt(3);
        }

        src.charAt(3);
    }

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

        options.forEach(opt => {
            const { id, name, values } = opt;

            values.map(v => v.charAt(1));
        });

        images.edges.forEach(edge => {
            const { cursor, node } = edge;

            cursor.charAt(1);

            const { altText, id, src } = node;

            if (altText) {
                altText.charAt(1);
            }

            if (id) {
                id.charAt(1);
            }

            src.charAt(2);
        });

        variants.edges.forEach(edge => {
            const { cursor, node } = edge;

            cursor.charAt(1);

            const {
                available,
                compareAtPrice,
                selectedOptions,
                sku,
                title,
                weight,
                id,
                image,
                presentmentPrices,
                price,
            } = node;

            selectedOptions.forEach(opt => {
                const { name, value } = opt;
            });

            presentmentPrices.edges.forEach(edge => {
                const { price } = edge.node;
                const { amount, currencyCode } = price;

                const foo = currencyCode === ShopifyBuy.CurrencyCode.BZD;
            });
        });
    });
});
//#endregion Collection Methods

//#region Image Methods
//-------------------------------
// testing ImageHelpers
client.product.fetch('123').then(product => {
    const img = product.variants.edges[0].node.image;

    if (img) {
        const newImgSrc: string = client.image.helpers.imageForSize(img, { maxWidth: 50, maxHeight: 50 });
    }
});
//#endregion Image Methods

//#region Shop Methods
//-------------------------------
client.shop.fetchInfo().then(shop => {
    const { currencyCode, description, moneyFormat, name, paymentSettings, primaryDomain } = shop;

    if (currencyCode === ShopifyBuy.CurrencyCode.AFN) {
        return;
    }

    for (let c of paymentSettings.enabledPresentmentCurrencies) {
        if (c === ShopifyBuy.CurrencyCode.ANG) {
            return;
        }
    }

    const { host, sslEnabled, url } = primaryDomain;
});

client.shop.fetchPolicies().then(policies => {
    const { privacyPolicy, refundPolicy, termsOfService } = policies;

    if (privacyPolicy) {
        const { body, url, title, id } = privacyPolicy;
    }
    if (refundPolicy) {
        const { body, url, title, id } = refundPolicy;
    }
    if (termsOfService) {
        const { body, url, title, id } = termsOfService;
    }
});
//#endregion Shop Methods

//#region Checkout Methods
//-------------------------------
client.checkout.addDiscount('123', '15off').then(checkout => {
    const {
        id,
        appliedGiftCards,
        orderStatusUrl,
        updatedAt,
        completedAt,
        createdAt,
        currencyCode,
        customAttributes,
        discountApplications,
        email,
        lineItems,
        lineItemsSubtotalPrice,
        note,
        order,
        paymentDue,
        paymentDueV2,
        ready,
        requiresShipping,
        shippingAddress,
        shippingLine,
        taxExempt,
        taxesIncluded,
        totalPrice,
        totalPriceV2,
        totalTax,
        totalTaxV2,
        webUrl,
    } = checkout;

    appliedGiftCards.forEach(appliedGiftCard => {
        const { id, amountUsedV2, balanceV2, lastCharacters, presentmentAmountUsed } = appliedGiftCard;

        if (amountUsedV2) {
            const { currencyCode, amount } = amountUsedV2;
            const foo = currencyCode === ShopifyBuy.CurrencyCode.BAM;
        }

        if (balanceV2) {
            const { currencyCode, amount } = balanceV2;
            const foo = currencyCode === ShopifyBuy.CurrencyCode.HKD;
        }

        if (presentmentAmountUsed) {
            const { currencyCode, amount } = presentmentAmountUsed;
            const foo = currencyCode === ShopifyBuy.CurrencyCode.VND;
        }
    });

    const x = currencyCode === ShopifyBuy.CurrencyCode.YER;

    customAttributes.forEach(attr => {
        const { key, value } = attr;
    });

    const { hasNextPage, hasPreviousPage } = discountApplications.pageInfo;

    discountApplications.edges.forEach(edge => {
        const { title, description, allocationMethod, applicable, code, targetSelection, targetType } = edge.node;

        if (title) {
            title.charAt(1);
        }

        if (description) {
            description.charAt(1);
        }

        if (code) {
            code.charAt(1);
        }

        const x = allocationMethod === ShopifyBuy.DiscountApplicationAllocationMethod.EACH;
        const y = targetSelection === ShopifyBuy.DiscountApplicationTargetSelection.ENTITLED;
        const z = targetType === ShopifyBuy.DiscountApplicationTargetType.SHIPPING_LINE;
    });

    lineItems.edges.forEach(edge => {
        const { cursor, node } = edge;

        const { id, customAttributes, discountAllocations, quantity, title, variant } = node;

        customAttributes.forEach(attr => {
            const { key, value } = attr;
        });

        discountAllocations.forEach(discountAllocation => {
            const { allocatedAmount, discountApplication } = discountAllocation;

            allocatedAmount.amount.toFixed(3);
            allocatedAmount.currencyCode === ShopifyBuy.CurrencyCode.CAD;

            const {
                title,
                allocationMethod,
                code,
                targetSelection,
                targetType,
                applicable,
                description,
            } = discountApplication;
        });
    });

    lineItemsSubtotalPrice.amount.toFixed(3);
    lineItemsSubtotalPrice.currencyCode === ShopifyBuy.CurrencyCode.CAD;

    if (order) {
        const {
            id,
            lineItems,
            shippingAddress,
            totalPrice,
            totalPriceV2,
            totalTax,
            totalTaxV2,
            currencyCode,
            customerUrl,
            orderNumber,
            processedAt,
            subtotalPrice,
            subtotalPriceV2,
            totalRefunded,
            totalRefundedV2,
            totalShippingPrice,
            totalShippingPriceV2,
        } = order;

        lineItems.edges.forEach(edge => {
            const { cursor, node } = edge;
            const { variant, title, quantity, discountAllocations, customAttributes } = node;
        });
    }

    paymentDueV2.amount.toFixed(3);
    paymentDueV2.currencyCode === ShopifyBuy.CurrencyCode.CRC;

    if (shippingAddress) {
        const {
            id,
            name,
            address1,
            address2,
            city,
            company,
            country,
            countryCode,
            firstName,
            formatted,
            lastName,
            latitude,
            longitude,
            phone,
            province,
            provinceCode,
            zip,
        } = shippingAddress;

        countryCode === ShopifyBuy.CountryCode.US;
    }

    if (shippingLine) {
        const { title, price, handle } = shippingLine;
    }
});

client.checkout.addGiftCards('123', ['10off', '20off']).then(checkout => {
    const {
        id,
        appliedGiftCards,
        orderStatusUrl,
        updatedAt,
        completedAt,
        createdAt,
        currencyCode,
        customAttributes,
        discountApplications,
        email,
        lineItems,
        lineItemsSubtotalPrice,
        note,
        order,
        paymentDue,
        paymentDueV2,
        ready,
        requiresShipping,
        shippingAddress,
        shippingLine,
        taxExempt,
        taxesIncluded,
        totalPrice,
        totalPriceV2,
        totalTax,
        totalTaxV2,
        webUrl,
    } = checkout;
});

// just pulling out the param type for the create options
type createOptionsType = Parameters<ShopifyBuy.Client['checkout']['create']>;
const createOptions: createOptionsType['0'] = {
    customAttributes: [],
    email: 'me@example.com',
    shippingAddress: {
        address1: '123 Cat Road',
        address2: null,
        city: 'Cat Land',
        company: 'Catmart',
        country: 'Canada',
        firstName: 'Meow',
        formatted: ['Catmart', '123 Cat Road', 'Cat Land ON M3O 0W1', 'Canada'],
        lastName: 'Meowington',
        latitude: null,
        longitude: null,
        phone: '4161234566',
        province: 'Ontario',
        zip: 'M3O 0W1',
        name: 'Meow Meowington',
        countryCode: ShopifyBuy.CountryCode.US,
        provinceCode: 'ON',
        id: 'Z2lkOi8vc2hvcGlmeSsiujh8aQJbnkl9Qcm9kdWN0VmaJKN8flqAnq8TEwNjA2NDU4NA==',
    },
    lineItems: [],
    note: 'hello',
};

client.checkout.create(createOptions).then(checkout => {
    const {
        id,
        appliedGiftCards,
        orderStatusUrl,
        updatedAt,
        completedAt,
        createdAt,
        currencyCode,
        customAttributes,
        discountApplications,
        email,
        lineItems,
        lineItemsSubtotalPrice,
        note,
        order,
        paymentDue,
        paymentDueV2,
        ready,
        requiresShipping,
        shippingAddress,
        shippingLine,
        taxExempt,
        taxesIncluded,
        totalPrice,
        totalPriceV2,
        totalTax,
        totalTaxV2,
        webUrl,
    } = checkout;
});

client.checkout.fetch('123').then(checkout => {
    const {
        id,
        appliedGiftCards,
        orderStatusUrl,
        updatedAt,
        completedAt,
        createdAt,
        currencyCode,
        customAttributes,
        discountApplications,
        email,
        lineItems,
        lineItemsSubtotalPrice,
        note,
        order,
        paymentDue,
        paymentDueV2,
        ready,
        requiresShipping,
        shippingAddress,
        shippingLine,
        taxExempt,
        taxesIncluded,
        totalPrice,
        totalPriceV2,
        totalTax,
        totalTaxV2,
        webUrl,
    } = checkout;
});

client.checkout.removeDiscount('123').then(checkout => {
    const {
        id,
        appliedGiftCards,
        orderStatusUrl,
        updatedAt,
        completedAt,
        createdAt,
        currencyCode,
        customAttributes,
        discountApplications,
        email,
        lineItems,
        lineItemsSubtotalPrice,
        note,
        order,
        paymentDue,
        paymentDueV2,
        ready,
        requiresShipping,
        shippingAddress,
        shippingLine,
        taxExempt,
        taxesIncluded,
        totalPrice,
        totalPriceV2,
        totalTax,
        totalTaxV2,
        webUrl,
    } = checkout;
});

client.checkout.removeGiftCard('123', 'XYZ').then(checkout => {
    const {
        id,
        appliedGiftCards,
        orderStatusUrl,
        updatedAt,
        completedAt,
        createdAt,
        currencyCode,
        customAttributes,
        discountApplications,
        email,
        lineItems,
        lineItemsSubtotalPrice,
        note,
        order,
        paymentDue,
        paymentDueV2,
        ready,
        requiresShipping,
        shippingAddress,
        shippingLine,
        taxExempt,
        taxesIncluded,
        totalPrice,
        totalPriceV2,
        totalTax,
        totalTaxV2,
        webUrl,
    } = checkout;
});

client.checkout.removeLineItems('123', ['A', 'B']).then(checkout => {
    const {
        id,
        appliedGiftCards,
        orderStatusUrl,
        updatedAt,
        completedAt,
        createdAt,
        currencyCode,
        customAttributes,
        discountApplications,
        email,
        lineItems,
        lineItemsSubtotalPrice,
        note,
        order,
        paymentDue,
        paymentDueV2,
        ready,
        requiresShipping,
        shippingAddress,
        shippingLine,
        taxExempt,
        taxesIncluded,
        totalPrice,
        totalPriceV2,
        totalTax,
        totalTaxV2,
        webUrl,
    } = checkout;
});

const lineItems: ShopifyBuy.CheckoutLineItemInput[] = [];
client.checkout.replaceLineItems('123', lineItems).then(checkout => {
    const {
        id,
        appliedGiftCards,
        orderStatusUrl,
        updatedAt,
        completedAt,
        createdAt,
        currencyCode,
        customAttributes,
        discountApplications,
        email,
        lineItems,
        lineItemsSubtotalPrice,
        note,
        order,
        paymentDue,
        paymentDueV2,
        ready,
        requiresShipping,
        shippingAddress,
        shippingLine,
        taxExempt,
        taxesIncluded,
        totalPrice,
        totalPriceV2,
        totalTax,
        totalTaxV2,
        webUrl,
    } = checkout;
});

client.checkout
    .updateAttributes('123', { allowPartialAddresses: true, note: 'hello', customAttributes: [] })
    .then(checkout => {
        const {
            id,
            appliedGiftCards,
            orderStatusUrl,
            updatedAt,
            completedAt,
            createdAt,
            currencyCode,
            customAttributes,
            discountApplications,
            email,
            lineItems,
            lineItemsSubtotalPrice,
            note,
            order,
            paymentDue,
            paymentDueV2,
            ready,
            requiresShipping,
            shippingAddress,
            shippingLine,
            taxExempt,
            taxesIncluded,
            totalPrice,
            totalPriceV2,
            totalTax,
            totalTaxV2,
            webUrl,
        } = checkout;
    });

client.checkout.updateEmail('123', 'me@example.com').then(checkout => {
    const {
        id,
        appliedGiftCards,
        orderStatusUrl,
        updatedAt,
        completedAt,
        createdAt,
        currencyCode,
        customAttributes,
        discountApplications,
        email,
        lineItems,
        lineItemsSubtotalPrice,
        note,
        order,
        paymentDue,
        paymentDueV2,
        ready,
        requiresShipping,
        shippingAddress,
        shippingLine,
        taxExempt,
        taxesIncluded,
        totalPrice,
        totalPriceV2,
        totalTax,
        totalTaxV2,
        webUrl,
    } = checkout;
});

client.checkout.updateLineItems('123', lineItems).then(checkout => {
    const {
        id,
        appliedGiftCards,
        orderStatusUrl,
        updatedAt,
        completedAt,
        createdAt,
        currencyCode,
        customAttributes,
        discountApplications,
        email,
        lineItems,
        lineItemsSubtotalPrice,
        note,
        order,
        paymentDue,
        paymentDueV2,
        ready,
        requiresShipping,
        shippingAddress,
        shippingLine,
        taxExempt,
        taxesIncluded,
        totalPrice,
        totalPriceV2,
        totalTax,
        totalTaxV2,
        webUrl,
    } = checkout;
});

const shippingAddress: ShopifyBuy.MailingAddress = {
    address1: '123 Cat Road',
    address2: null,
    city: 'Cat Land',
    company: 'Catmart',
    country: 'Canada',
    firstName: 'Meow',
    formatted: ['Catmart', '123 Cat Road', 'Cat Land ON M3O 0W1', 'Canada'],
    lastName: 'Meowington',
    latitude: null,
    longitude: null,
    phone: '4161234566',
    province: 'Ontario',
    zip: 'M3O 0W1',
    name: 'Meow Meowington',
    countryCode: ShopifyBuy.CountryCode.US,
    provinceCode: 'ON',
    id: 'Z2lkOi8vc2hvcGlmeSsiujh8aQJbnkl9Qcm9kdWN0VmaJKN8flqAnq8TEwNjA2NDU4NA==',
};
client.checkout.updateShippingAddress('123', shippingAddress).then(checkout => {
    const {
        id,
        appliedGiftCards,
        orderStatusUrl,
        updatedAt,
        completedAt,
        createdAt,
        currencyCode,
        customAttributes,
        discountApplications,
        email,
        lineItems,
        lineItemsSubtotalPrice,
        note,
        order,
        paymentDue,
        paymentDueV2,
        ready,
        requiresShipping,
        shippingAddress,
        shippingLine,
        taxExempt,
        taxesIncluded,
        totalPrice,
        totalPriceV2,
        totalTax,
        totalTaxV2,
        webUrl,
    } = checkout;
});
//#endregion Checkout Methods
